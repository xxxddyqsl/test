var MyModule;
(function (MyModule) {
    var Animal = /** @class */ (function () {
        function Animal() {
        }
        Animal.prototype.area = function (shape, width, height) {
            var area = width * height;
            return "I'm a " + shape + " with an area of " + area + " cm squared.";
        };
        return Animal;
    }());
    MyModule.Animal = Animal;
    ;
    var AnimalB = /** @class */ (function () {
        function AnimalB() {
        }
        AnimalB.prototype.area = function (shape, width, height) {
            var area = width * height;
            return "I'm a " + shape + " with an area of " + area + " cm squared.";
        };
        return AnimalB;
    }());
    MyModule.AnimalB = AnimalB;
    ;
    MyModule.hello = "Hello World!";
    function foo(e) {
        alert(e);
    }
    MyModule.foo = foo;
    ;
})(MyModule || (MyModule = {}));
var hello = "Hello World!";
// export class Animal {
//     area(shape: string, width: number, height: number) {
//         var area = width * height;
//         return "I'm a " + shape + " with an area of " + area + " cm squared.";
//     }
// }
