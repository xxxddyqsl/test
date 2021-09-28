// 如果想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。
// import { lastName as surname } from './profile.js';
// import命令用于模块的导入。
import  add,{firstName, lastName, year,multiply } from './profile.js';
import   util  from './export-default.js'

// console.log(firstName, lastName, year,multiply(3,6));

// console.log(add(4,5)); // 'foo'

// console.log(util)
  // 通过对象来返回多个值
  export default {add,firstName, lastName, year,multiply ,util};