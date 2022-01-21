class Point {
    constructor(){
        this.name = 'Point父类变量'
    };
    add (x,y){
        return console.log('输出add函数==>',x+y);
    }
}
// 导出的方式 - 1:
// export 导出的东西需要在导入的时候加{}
// export {Point};
// 导出的方式 - 2:
// export default   导出的东西不需要在导入的时候加{}
export default  Point;