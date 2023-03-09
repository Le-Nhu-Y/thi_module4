"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    fullname: String,
    class: String,
    practical: Number,
    theory: Number,
    review: String,
    description: String
});
const Student = (0, mongoose_1.model)('Student', studentSchema);
exports.Student = Student;
//# sourceMappingURL=student.model.js.map