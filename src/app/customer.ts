import { TypeCustomer } from "./typeCustomer";

export class Customer {

    constructor(
        public id: number | undefined, 
        public firstName: string,
        public lastName: string,
        public email: string,
        public birthDate: string | undefined,
        public typeCustomer: TypeCustomer | undefined
    ){}
}
