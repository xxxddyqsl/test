class testB{
    constructor(){
        this.age=20;
        console.log('testB类 变量age 默认值==>',this.age )
    }
    setAge(number){
        this.age=number;
        console.log('修改了 testB类 变量age 值==>',this.age )
    }
}
export {testB};