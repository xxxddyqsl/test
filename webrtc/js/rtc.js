(function (global, factory) {
	if (typeof define === 'function' && (define.amd || define.cmd)) {
		// AMD规范. 注册一个匿名模块，兼容AMD与CMD
		define([], factory);
	} else if (typeof module === 'object' && module.exports) {
		//CommonJS规范，NodeJS运行环境
		module.exports = factory();
	} else {
		//浏览器全局对象注册
		global.Rtc = factory();
	}
})(this, function () {
	'use strict';
	var webRtc = {
		a: 0,
		appendId: null,
		localVideo: null,
		// 约束对象（Constraints）  // 本地设备-配置
		mediaStreamConstraints: {
			// 约束对象可以被设置在getUserMedia()和RTCPeerConnection的addStream方法中，这个约束对象是WebRTC用来指定接受什么样的流的，其中可以定义如下属性：
			video: true, // * video: 是否接受视频流
			audio: true, // * audio：是否接受音频流
		},
		localStream: null, //本地流
		peerConnection: null,
		// 配置打洞服务器
		iceServer: {
			iceServers: [
				{
					urls: ['stun:stun.l.google.com:19302'],
				},
				{
					urls: ['turn:numb.viagenie.ca'],
					username: 'webrtc@live.com',
					credential: 'muazkh',
				},
			],
		},
		offerOptions: {
			offerToReceiveAudio: 1,
			offerToReceiveVideo: 1,
		},
		createMedia(id, localVideo) {
			var that = this;
			that.appendId = id;
			that.localVideo = localVideo;
			// 获取本地流权限验证
			navigator.mediaDevices
				.getUserMedia(that.mediaStreamConstraints)
				.then(that.gotLocalMediaStream)
				.catch(that.handleLocalMediaStreamError);
		},
		// 权限验证通过, 返回 stream 对象
		gotLocalMediaStream(stream) {
			console.log(stream);
			// 保存本地流到全局
			webRtc.localStream = stream;
			// 获取到视频流stream
			// 绑定本地媒体流到video标签用于输出
			localVideo.srcObject = stream;
			webRtc.initPeer(); // 获取到媒体流后，调用函数初始化 RTCPeerConnection
		},
		// 获取本地视频流失败 权限验证未通过, 返回 错误信息
		handleLocalMediaStreamError(error) {
			console.log('navigator.getUserMedia error: ', error);
		},
		//
		async initPeer() {
			// 创建PeerConnection的对象： 创建时需要传入打洞服务器的配置信息(iceServer)，如果不穿入打洞服务器的配置信息，则只可以在内网中使用实时音频通讯
			window.RTCPeerConnection =
				window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
			webRtc.peerConnection = new RTCPeerConnection(webRtc.iceServer);
			if (RTCPeerConnection) {
				// 这里面可以做其他操作
				console.log('浏览器支持实时音频通讯');
				// 向PeerConnection中加入需要发送的流
				webRtc.peerConnection.addStream(webRtc.localStream); // 添加本地流

				// 发送ICE候选到其他客户端
				webRtc.peerConnection.addEventListener('icecandidate', (e) =>
					webRtc.onIceCandidate(webRtc.peerConnection, e)
				);

				// 返回连接的远端媒体流数组。这个数组可能是空数组。 数据流存入video
				webRtc.peerConnection.addEventListener(
					'track',
					webRtc.gotRemoteStream
				);

				console.log(webRtc.peerConnection);
				// createOffer：创建一个offer，需要传入两个参数，第一个参数是创建offer成功的回调方法，会返回创建好的offer，可以在这里将这个offer发送出去。第二个参数是创建失败的回调方法，会返回错误信息。
				const offer = await webRtc.peerConnection.createOffer(
					webRtc.offerOptions
				);
				console.log(offer);
				await webRtc.onCreateOffer(offer);
				// try {
				// 	console.log('createOffer start');
				// 	//RTCPeerConnection接口的createOffer（）方法启动创建一个SDP offer，目的是启动一个新的WebRTC去连接远程端点。SDP offer包含有关已附加到WebRTC会话，浏览器支持的编解码器和选项的所有MediaStreamTracks信息，以及ICE 代理，目的是通过信令信道发送给潜在远程端点，以请求连接或更新现有连接的配置。
				// 	// 返回值是一个Promise，创建 offer 后，将使用包含新创建的要约的RTCSessionDescription对象来解析该返回值。
				// 	// pc1 调用createOffer方法准备创建SDP
				// 	const offer = await webRtc.peerConnection.createOffer(
				// 		webRtc.offerOptions
				// 	);
				// 	console.log(offer);
				// 	await webRtc.onCreateOffer(offer);
				// } catch (e) {}
				// webRtc.peerConnection.createOffer = webRtc.createOffer;
			} else {
				console.log('您使用的浏览器暂不支持实时音频通讯。');
			}
		},
		async onIceCandidate(peerConnection, event) {
			console.log(peerConnection);
			try {
				console.log(event.candidate);
				// 当本机当前页面的 RTCPeerConnection 接收到一个从远端页面通过信号通道发来的新的 ICE 候选地址信息，本机可以通过调用RTCPeerConnection.addIceCandidate() 来添加一个 ICE 代理。
				await peerConnection.addIceCandidate(event.candidate);
				console.log(peerConnection);
			} catch (e) {}
		},
		// 生成提议
		async onCreateOffer(desc) {
			console.log(`Offer from pc\n${desc.sdp}`);
			//offer先调用offerForConstraints得到自己的offerSdp，setLocalDescription(offerSdp)，把offerSdp发给远程answer
			await webRtc.peerConnection.setLocalDescription(desc);
			// 设置远端的answer，将对方的描述信息加入到PeerConnection中，参数类型：RTCSessionDescription
			// await webRtc.peerConnection.setRemoteDescription(desc);

			const answer = await webRtc.peerConnection.createAnswer();
			await webRtc.onCreateAnswer(answer);

			// try {
			// 	// 设置本地offer，将自己的描述信息加入到PeerConnection中
			// 	await webRtc.peerConnection.setLocalDescription(desc);
			// } catch (e) {}

			// // try {
			// // 	// 设置远端的answer，将对方的描述信息加入到PeerConnection中，参数类型：RTCSessionDescription
			// // 	await webRtc.peerConnection.setRemoteDescription(desc);
			// // } catch (e) {}
			// try {
			// 	// 接收端创建 answer
			// 	const answer = await webRtc.peerConnection.createAnswer();
			// 	await onCreateAnswer(answer);
			// } catch (e) {}
		},
		// 生成应答
		async onCreateAnswer(desc) {
			// // a) 收到offerSdp后，setRemoteDescription(desc) answerForConstraints得到自己的answerSdp
			// await webRtc.peerConnection.setRemoteDescription(desc);
			// // b) 把answerSdp发送给offer，同时设置自己发送视频的最大码率
			await webRtc.peerConnection.setLocalDescription(desc);

			// 设置本地offer，将自己的描述信息加入到PeerConnection中，参数类型：RTCSessionDescription
			// await webRtc.peerConnection.setRemoteDescription(desc);
			// try {
			// 	await webRtc.peerConnection.setLocalDescription(desc); // 接收端设置本地 answer 描述
			// } catch (e) {
			// 	console.log('answer-setLocalDescription: ', e);
			// }
			// try {
			// 	await webRtc.peerConnection.setRemoteDescription(desc); // 呼叫端端设置远程 answer 描述
			// } catch (e) {
			// 	console.log('answer-setRemoteDescription: ', e);
			// }
		},
		// 返回连接的远端媒体流数组。这个数组可能是空数组。 数据流存入video
		gotRemoteStream(e) {
			console.log(e);
			for (let i in e.streams) {
				// var s = document.getElementById(e.streams[i].id);
				// if (!s) {
				console.log(e.streams[i].id);
				let video = document.createElement('video'); //创建一个video标签
				video.playsinline = true;
				video.autoplay = true;
				video.srcObject = e.streams[0];
				video.id = e.streams[i].id;
				document.getElementById(webRtc.appendId).append(video);
				// } else {
				// 	console.log(2222);
				// }
			}
		},
	};
	return webRtc;
});
