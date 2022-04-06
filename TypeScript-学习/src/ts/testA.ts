import * as Main from './main';
//implements关键字代表该类实现 main 主进程内的接口 IPerson ，该类必须定义接口中的方法
class testAPoint implements Main.IPerson {
    // static 关键字 声明静态方法，就表示该方法不会被实例继承，可以直接通过类来调用， 不需要new 获取 类的实例
    static getInstance() : Main.IPerson {
        if (testAPoint._instance == null) {
            alert('new获取类')
            testAPoint._instance = new testAPoint();
        }
        return testAPoint._instance;
    }
    // 必须按照 main 主进程 接口规则
    name: string;
    add (x:number,y:number){
        return console.log('输出add函数==>',x+y);
    }
    setName(n:string){
        alert(n);
        return this.name=n;
    }
    private static _instance : testAPoint = null; // 关键字 private 声明私有变量 只能类内部访问
}
// static 声明的方法不需要new 实例化类，即可直接通过该类来调用的方法，即称之为“静态方法”。将类中的方法设为静态方法也很简单，在方法前加上static关键字即可。这样该方法就不会被实例继承！
// export 导出的东西需要在导入的时候加 {}  使用NewRtcClient()函数 导出 上方的class类testAPoint,  class 类 testAPoint内部调用使用static声明的静态方法 getInstance() 
export function NewRtcClient() : Main.IPerson {
    // 调用 testAPoint 类 设置的静态方法 getInstance 判断静态变量_instance 是否已经绑定了 testAPoint 类的实例  没有则 获取testAPoint类的实例 并把testAPoint类的实例绑定在 static 设置的静态变量 _instance 上 来调用内部方法
    return testAPoint.getInstance();
}