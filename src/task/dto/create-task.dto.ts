export class CreateTaskDto {
    title : string;
    description : string;
    points : number;
    dueDate? : Date;
    userId : number;
}
