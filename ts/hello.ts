module MyModule {
export class Animal {
    area(shape: string, width: number, height: number) {
        var area = width * height;
        return "I'm a " + shape + " with an area of " + area + " cm squared.";
    }
};
export class AnimalB {
    area(shape: string, width: number, height: number) {
        var area = width * height;
        return "I'm a " + shape + " with an area of " + area + " cm squared.";
    }
};
export const hello : string = "Hello World!";
export function  foo(e:string){
    alert(e)
};
export function  Addup(a:number,b:number){
     return a+b;
};  
}
 const hello : string = "Hello World!";


 let x: [string, number];
// Initialize it
x = ['hello', 10]; 
console.log(x[0].substr(1)); 
// console.log(x[1].substr(1));
// export class Animal {
//     area(shape: string, width: number, height: number) {
//         var area = width * height;
//         return "I'm a " + shape + " with an area of " + area + " cm squared.";
//     }
// }