import { Router } from 'express';
const studentRoutes = Router();
import { Student } from "../schemas/student.model";
import multer from 'multer';
const upload = multer();



studentRoutes.get('/detail/:id', async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.id });
        console.log(student, 'student')
        if (student) {
            res.render("detail", {student: student})
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});



studentRoutes.get('/create', (req, res) => {
    res.render("createStudent");
});

studentRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const studentNew = new Student(req.body);
        const student = await studentNew.save();
        if (student) {
            res.render("success", {student})
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});


studentRoutes.get('/update/:id', async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.params.id });
        console.log(student, 'student')
        if (student) {
            res.render("updateStudent", {student: student})
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});

studentRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const student = await Student.findOne({ _id: req.body.id });
        student.fullname = req.body.fullname;
        student.class = req.body.class;
        student.practical = req.body.practical;
        student.theory = req.body.theory;
        student.review = req.body.review;
        student.description = req.body.description

        await student.save();
        if (student) {
            res.render("update",{student})
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});


studentRoutes.get('/list', async (req, res) => {
    try {
        console.log(req.query)
        let limit: number;
        let offset: number;
        if(!req.query.offset || !req.query.limit) {
            limit = 3;
            offset = 0;
        } else {
            limit = Number(req.query.limit as string);
            offset = Number(req.query.offset as string);
        }
        const students = await Student.find().limit(limit).skip(offset);
        res.render("listStudent", { students: students });
    } catch {
        res.render("error");
    }
});

studentRoutes.get('/delete/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const student = await Student.findOneAndDelete({ _id: req.params.id });
        if (student) {
            res.redirect("/students/list?offset=0&limit=3")
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});


export default studentRoutes;
