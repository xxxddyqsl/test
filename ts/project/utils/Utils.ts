import MD5 from './md5'
import CRC32 from './crc32'

import utiljs = require("./utilsjs/utiljs.js");

export default class Utils {
	   
    static md5Hash(str:any) : string
    {
        let f : MD5 = new MD5();
        
        return f.hex_md5(str);
    }

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
        return utiljs.Base64Encode(buf);
    }

    static base64Decode(buf : any) : any {
        return utiljs.Base64Decode(buf);
    }

    static crc32Sum(buf : any) : number {
        return CRC32.crcSum(buf);
    }

    static uint8ToString(data:Uint8Array) : string {
        let ret :string = "";
        for (let idx = 0; idx< data.length; idx++) {
            ret += String.fromCharCode(data[idx]);
        }
        
        return ret;
    }
}
