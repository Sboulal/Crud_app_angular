export class EmplyeeModel
{
    empId: number;
    name: string;
    city: string;
    state: string;
    emailId: string;
    contactNo: string;
    adress: string;
    pinCode: string;

    constructor() {
        this.empId = 1;
        this.name = '';
        this.city = '';
        this.state = '';
        this.emailId = '';
        this.contactNo = '';
        this.adress = '';
        this.pinCode = '';
        
    }
}