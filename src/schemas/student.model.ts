import {Schema,model} from "mongoose";

//Schema là nơi ánh xạ các trường dữ liệu từ database,
// model là nơi làm việc trực tiếp với database (Các tác vụ thêm, sửa, xóa ...).

interface IStudent{
    fullname:string;
    class:string;
    practical:number;
    theory:number;
    review:string;
    description:string
}
const studentSchema = new Schema<IStudent>({
    fullname:String,
    class:String,
    practical:Number,
    theory:Number,
    review:String,
    description:String
});



const Student=model<IStudent>('Student',studentSchema);
export {Student};
