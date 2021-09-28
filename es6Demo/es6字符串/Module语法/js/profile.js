
// export命令用于规定模块的对外接口。
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
// export命令除了输出变量，还可以输出函数或类（class）。
const multiply =  (a, b) =>  'multiply函数输出==》'+a + b;

export {firstName, lastName, year,multiply,};

// export default命令，为模块指定默认输出。
export default function add(x, y) {
    return x * y;
  }