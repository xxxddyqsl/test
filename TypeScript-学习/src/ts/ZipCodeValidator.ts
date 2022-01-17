import {StringValidator }  from './Validation';

// 导出声明
// 任何声明（比如变量，函数，类，类型别名或接口）都能够通过添加export关键字来导出。
export const numberRegexp = /^[0-9]+$/;
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}
export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };



