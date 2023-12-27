const express = require('express');
const { User, Teacher, Student, Class, Lesson, ClassEnrollment, Assignment, Grade, sequelize, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const { Op } = require("sequelize");

const router = express.Router();

//get all lessons (teacher users only)
router.get('/', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    if (role === "teacher") {
        const lessons = await Lesson.findAll({
            include: [
                {
                    model: Class,
                    attributes: ['id', 'name', 'teacherId'],
                    include: [
                        {
                            model: Teacher,
                            attributes: ['userId'],
                            include: [
                                {
                                    model: User,
                                    attributes: ['id', 'firstName', 'lastName']
                                }
                            ]
                        }
                    ]
                }
            ],
            attributes: [
                "id",
                "title",
                "lessonImg",
                "description",
                "lessonContent",
                "classId",
                "createdAt",
                "updatedAt"
            ]
        })
        const payload = []
        for (let i = 0; i < lessons.length; i++) {
            const lesson = lessons[i]
            const lessonData = lesson.toJSON()
            console.log(lessonData)
            const lessonClass = {
                id: lessonData.Class.id,
                name: lessonData.Class.name
            }
            console.log(lessonClass)
            const lessonTeacher = {
                teacherId: lessonData.Class.teacherId,
                userId: lessonData.Class.Teacher.userId,
                firstName: lessonData.Class.Teacher.User.firstName,
                lastName: lessonData.Class.Teacher.User.lastName
            }
            console.log(lessonTeacher)

            lessonData.ClassInfo = lessonClass
            lessonData.Teacher = lessonTeacher
            payload.push(lessonData)
            delete lessonData.Class
        }

        res.json({ "Lessons": payload })
    } else {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }

})


module.exports = router;
