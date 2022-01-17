import { ZipCodeValidator } from "./ZipCodeValidator";
export interface StringValidator {
    isAcceptable(s: string): boolean;
}
 
