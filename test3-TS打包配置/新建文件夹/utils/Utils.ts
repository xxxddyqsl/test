function _utf8_encode(str:string) {
	str = str.replace(/\r\n/g,"\n");
	var utftext = "";
	for (var n = 0; n < str.length; n++) {
		var c = str.charCodeAt(n);
		if (c < 128) {
			utftext += String.fromCharCode(c);
		} else if((c > 127) && (c < 2048)) {
			utftext += String.fromCharCode((c >> 6) | 192);
			utftext += String.fromCharCode((c & 63) | 128);
		} else {
			utftext += String.fromCharCode((c >> 12) | 224);
			utftext += String.fromCharCode(((c >> 6) & 63) | 128);
			utftext += String.fromCharCode((c & 63) | 128);
		}
	}
	return utftext;
}

function b64Encode(input:string) {
	var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;
	input = _utf8_encode(input);
	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}
		output = output +
		_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
		_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
	}
	return output;	
}

export default class Utils {

    static randomInt(min:number, max:number) : number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static checkPhone(phone:string): boolean {
        let reg = /^1[3|4|5|7|8][0-9]{9}/;
        if (reg.test(phone)){
            return true;//手机号码正确
        }

        return false;
    }

    static randomString(count :number) : string {
        if (count < 1) {
            return "";
        }

        let orgs:string[] = ['1','h','7','a',
        '0','b','8','e','t','z','v','y',
        'o','4','f','6','n','g','m',
        'p','5','c','3','i','j','k',
        'o','4','f','6','n','g','m',
        'p','5','c','3','i','j','k',
        '9','l','s','2','d','r','q',
        '1','h','7','a','w','x','u'];

        let ret : string = '';
        for (let i : number = 0; i < count; i++) {
            let idx : number = Math.ceil(Math.random() * (orgs.length - 12));
            ret += orgs[idx];
        }

        return ret;
    }

    static timestamp() : number {
        return Math.floor(Date.now() / 1000);
    }

    static timeString() : string {
        let t = new Date();
        let hour = t.getHours();
        let minute = t.getMinutes();
        let second = t.getSeconds();

        let str : string = "";
        str = hour.toString();

        if (minute < 10) {
            str = str + ":0" + minute.toString();
        } else {
            str = str + ":" + minute.toString();
        }

        if (second < 10) {
            str = str + ":0" + second.toString();
        } else {
            str = str + ":" + second.toString();
        }

        return str;
    }

    static base64Encode(buf : any) : string {
        return b64Encode(buf);
    }

    static uint8ToString(data:Uint8Array) : string {
        let ret :string = "";
        for (let idx = 0; idx< data.length; idx++) {
            ret += String.fromCharCode(data[idx]);
        }
        
        return ret;
    }

    static uint8ArrayToStrArray(params :Uint8Array[]) :string[] {
        let ret :string[] = [];
        for (let p of params) {
            ret.push(Utils.uint8ToString(p));
        }
        
        return ret;
    }
}
