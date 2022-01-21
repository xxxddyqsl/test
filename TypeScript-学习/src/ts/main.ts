
import {NewRtcClient as Impl }  from './testA';
// main 设置  接口
export interface IPerson {
    name: string;
    // 设置相+ 接口
     add(x:number,y:number):void
    //  设置 name 接口
     setName(n:string):void
}
// 默认 export 导出 MakeRtcClient 函数 调用 Impl() 函数 testA文件内部 实现该接口 的  类 
export function MakeRtcClient():IPerson {
    return Impl();
}

