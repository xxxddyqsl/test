//调用  export default 导出的东西不需要在 import 导入的时候加{}  import testA from './testA.js'; 
import testA from './testA.js';
//调用 export 导出的东西需要在 import 导入的时候加{}  import {testB} from './testB.js'; 
import {testB} from './testB.js';
// class -1： 类说明 ES6 的class可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已，ES6 的类，完全可以看作构造函数的另一种写法。
// 2：声明的 Main类的 构造函数的 prototype 属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。
// 下方的 等同于 声明的 class Main类
// Main.prototype = {
//     constructor(){},
//     setTestBAge(){}
// }
// 下面代码中，constructor()、setTestBAge() 这两个方法，其实都是定义在Main.prototype上面。 因此，在类的实例上面调用方法，其实就是调用原型上的方法。
// 通过 extends 关键字 ， Main类 继承了testA 类的所有属性和方法。 Main 类 是 testA 类的 子类 
class Main extends testA{
    testB = new testB();
    // constructor()方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor()方法，如果没有显式定义，一个空的constructor()方法会被默认添加。
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