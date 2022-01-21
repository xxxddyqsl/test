//调用 export 导出的东西需要在 import 导入的时候加{}  import {Point} from './testA.js'; 
//调用  export default 导出的东西不需要在 import 导入的时候加{}  import Point from './testA.js'; 
import testA from './testA.js';
import {testB} from './testB.js';
// 通过 extends 关键字 ， Main类 继承了 Point 类的所有属性和方法。 Main 类 是 Point 类的 子类 
class Main extends testA{
    testB = new testB();
    constructor(name,age){
        // super() 关键字，它指代父类的实例（即父类的this对象）。子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。
        // ES6的继承机制，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。
        super();
        console.log(this.name);
    };
    setTestBAge(n){
        console.log('Main 类 调用testB类 内部函数 setAge() 要修改  变量age 传入的参数==>',n )
        this.testB.setAge(n);
    }
}
// 导出的方式 - 1:
// export 导出的东西需要在导入的时候加{}
export {Main};
// 导出的方式 - 2:
// export default   导出的东西不需要在导入的时候加{}
// export default  Main;