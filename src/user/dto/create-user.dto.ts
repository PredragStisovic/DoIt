import { Task } from "src/task/entities/task.entity";

export class CreateUserDto {
    name : string;
    email : string;
    password : string;
    tasks : Task[]
}
