export class Appointments {
    id : string;
    clinic: string;
    name: string;
    date: string;
    status: string;

    constructor(id, clinic, name, date, status){
        this.id = id;
        this.clinic = clinic;
        this.name = name;
        this.date = date;
        this.status = status;
    }

}