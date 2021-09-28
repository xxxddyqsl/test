// export命令用于规定模块的对外接口。
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
// export命令除了输出变量，还可以输出函数或类（class）。
const multiply =  (a, b) =>  'multiply函数输出==》'+a + b;

 function addA(x, y) {
    return x * y;
  }
  function reduce(a, b) {
    return a - b;
 }
  // 通过对象来返回多个值
  export default {firstName, lastName, year,multiply,addA,reduce};