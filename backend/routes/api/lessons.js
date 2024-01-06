const express = require('express');
const { User, Teacher, Student, Class, Lesson, ClassEnrollment, Assignment, Grade, StudentLesson, sequelize, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateLessonParams } = require('./validators');

const { Op } = require("sequelize");
const e = require('express');

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
            // console.log(lessonData)
            const lessonClass = {
                id: lessonData.Class.id,
                name: lessonData.Class.name
            }
            // console.log(lessonClass)
            const lessonTeacher = {
                teacherId: lessonData.Class.teacherId,
                userId: lessonData.Class.Teacher.userId,
                firstName: lessonData.Class.Teacher.User.firstName,
                lastName: lessonData.Class.Teacher.User.lastName
            }
            // console.log(lessonTeacher)

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

});

//get details of a lesson from an id
router.get('/:lessonId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { lessonId } = req.params
    const existingLesson = await Lesson.findByPk(lessonId)
    if (existingLesson) {
        if (role === "teacher") {
            const teacherLessonData = await Lesson.findOne({
                where: { id: lessonId },
                include: [
                    {
                        model: Class,
                        attributes: ["teacherId"],
                        include: [
                            {
                                model: Teacher,
                                attributes: ["id", "userId"]
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
                    "updatedAt",
                ]
            })

            res.json({ "Lesson": teacherLessonData })
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    }
    if (!existingLesson) {
        res.status(404);
        return res.json({
            "message": "Lesson couldn't be found",
        })
    }

});

// edit a lesson (teacher users only)
router.put('/:lessonId', requireAuth, validateLessonParams, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { lessonId } = req.params
    const { title, lessonImg, description, lessonContent } = req.body
    const existingLesson = await Lesson.findOne({
        where: { id: lessonId },
        include: [
            {
                model: Class,
                attributes: ['id'],
                include: [
                    {
                        model: Teacher,
                        attributes: ["userId"]
                    }
                ]
            }
        ]
    })

    if (userId && role === 'teacher') {
        if (existingLesson && existingLesson.Class.Teacher.userId === userId) {
            if (title !== undefined) existingLesson.title = title
            if (lessonImg !== undefined) existingLesson.lessonImg = lessonImg
            if (description !== undefined) existingLesson.description = description
            if (lessonContent !== undefined) existingLesson.lessonContent = lessonContent

            await existingLesson.save()
            res.json(existingLesson)
        } else if (existingLesson && existingLesson.Class.Teacher.userId !== userId) {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        } else if (!existingLesson) {
            res.status(404);
            return res.json({
                "message": "Lesson couldn't be found",
            })
        }
    } else if (userId && role !== 'teacher') {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }
});

// delete a lesson (teacher users only)
router.delete('/:lessonId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { lessonId } = req.params
    const existingLesson = await Lesson.findOne({
        where: { id: lessonId },
        include: [
            {
                model: Class,
                attributes: ['id'],
                include: [
                    {
                        model: Teacher,
                        attributes: ["userId"]
                    }
                ]
            }
        ]
    })
    if (userId && role === 'teacher') {
        if (existingLesson && existingLesson.Class.Teacher.userId === userId) {
            await existingLesson.destroy()
            res.json({
                "message": "Successfully deleted"
            })
        } else if (existingLesson && existingLesson.Class.Teacher.userId !== userId) {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        } else if (!existingLesson) {
            res.status(404);
            return res.json({
                "message": "Lesson couldn't be found",
            })
        }
    } else if (userId && role !== 'teacher') {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }
})


module.exports = router;
