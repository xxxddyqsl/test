import { ENetStatus,MsgEntity } from "../entity/MsgEntity";
import * as Packed from '../protocol/Packer'
import * as ProtoHelper from '../protocol/ProtoHelper'
import * as ProtoEntity from '../protocol/ProtoEntity'
import * as Protos from '../protocol/Protocol'

function logout(...data: any[]) {
    console.log(data);
}

class _dummyDump implements MsgEntity{
    OnNetStatus(iStatus: number, iReason: number): void {
        throw new Error("Method not implemented.");
    }

    OnMessage(pkt : any): number {
        throw new Error("Method not implemented.");
    }

}

function getUnixTick():number {
    return Math.round(new Date().getTime()/1000);
}

export default class WSHelper {
    private _url : string = '';
    private _netStatus:ENetStatus = ENetStatus.kNetStatus_Idle;
    private  _callFunc : MsgEntity | null = null;
    private _socket : WebSocket | null = null;
    private _lastMsgTick : number = getUnixTick();

    public sequence : number = 0;

    constructor() {
        
    }

    setCallback(cb : MsgEntity) {
        this._callFunc = cb;
    }

    open(url:string, cb ?:MsgEntity | null) : number {
        console.log("websocket open ", url);
        if (cb) {
            this._callFunc = cb;    
        }

        if (this._url == url && this._socket != null) {
            return 0;
        }

        this._socket = new WebSocket(url);
        this._url = url;
        this._socket.onopen = this._onOpen.bind(this);
        this._socket.onclose = this._onClose.bind(this);
        this._socket.onmessage = this._onMessage.bind(this);
        this._socket.onerror = this._onError.bind(this);

        return 0;
    }

    close() {
        console.log("websocket quit now ");
        this._netStatus = ENetStatus.kNetStatus_Idle;

        if (this._timeoutId > 0) {
            clearInterval(this._timeoutId);
            this._timeoutId = 0;
        }

        if (this._socket != null) {
            this._socket.close();
            this._socket = null;
        }
    }

    send(bts : Uint8Array | string) : number {
        if (this._socket == null) {
           return -1;
        }

        if (this._netStatus != ENetStatus.kNetStatus_Connected) {
            return -2;
        }

        this._socket.send(bts);
        
        return 0;
    }

    private _reportNetStatus(status :ENetStatus, reason:number = 0) {
        this._netStatus = status;
        if (this._callFunc) {
            this._callFunc.OnNetStatus(status, reason);
        }
    }

    protected _onOpen(evt : Event) : void {
        if (this._socket != null) {
            this._socket.binaryType = "arraybuffer";
        }

        if (this._timeoutId > 0) {
            clearInterval(this._timeoutId);
            this._timeoutId = 0;
        }

        this._timeoutId = setInterval(this._pingLoop.bind(this), 10000);
        this._reportNetStatus(ENetStatus.kNetStatus_Connected);
    }
    
    protected _onClose(err : CloseEvent) : void {
        console.log("socket onclose err:", err);
        if (this._timeoutId > 0) {
            clearInterval(this._timeoutId);
            this._timeoutId = 0;
        }

        this._reportNetStatus(ENetStatus.kNetStatus_DisConnect, 1);
    }
    
    protected _onError(err : Event): void {
        console.log("socket onerror err:", err);
        if (this._timeoutId > 0) {
            clearInterval(this._timeoutId);
            this._timeoutId = 0;
        }

        this._reportNetStatus(ENetStatus.kNetStatus_DisConnect, 2);
    }

    protected _onMessage(evt : MessageEvent) : void {
        if (!evt || !evt.data || typeof evt.data == 'undefined') {
            console.log("_onMessage msg evt is null or data is null evt.data=", evt.data);
            return;
        }
    
        console.log("evt.data type is ", typeof evt.data);

        this._lastMsgTick = getUnixTick();
        let pkt = Packed.Packeter.ParseRsp(evt.data);
        if (pkt) {
            console.log("parse packet cmd=", pkt.cmdid, ",errCode=",
            pkt.rspHeader.errCode,",pb=",pkt.pb);
            if (this._callFunc) {
                this._callFunc.OnMessage(pkt);
            }
        }
    }

    protected _pingLoop() {
        if (this._netStatus != ENetStatus.kNetStatus_Connected) {
            return;
        }

        let pbPing = ProtoHelper.NewProtoReq(proto.snail_video.media.eCmdC2S.CMD_PING);
        pbPing.setTimestamp(getUnixTick());

        let pbHead : ProtoEntity.TReqHeader = {
            sequence : this.sequence,
            session: '',
            token : ''
        };

        let btReq = Packed.Packeter.PackReq(Protos.Protocol.cmd_register, pbHead, pbPing);
        return this._socket.send(btReq);
    }

    private _timeoutId : number = 0;
}