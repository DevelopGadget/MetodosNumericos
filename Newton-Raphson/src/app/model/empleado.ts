export class Empleado {
    constructor(_id='', name='', posittion= '', office='', salary = 0){
        this._id=_id;
        this.name=name;
        this.posittion=posittion;
        this.office=office;
        this.salary=salary;

    }
    _id: string;
    name: string;
    posittion: string;
    office: string;
    salary: number;
}
