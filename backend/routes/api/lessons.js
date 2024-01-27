const express = require('express');
const { User, Teacher, Student, Class, Lesson, ClassEnrollment, Assignment, Grade, StudentLesson, ClassLesson, sequelize, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateLessonParams } = require('./validators');

const { Op } = require("sequelize");
const e = require('express');

const router = express.Router();

//get all lessons (teacher users only)
router.get('/', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    if (userId && role === "teacher") {
        const lessons = await Lesson.findAll({
            include: [
                {
                    model: ClassLesson,
                    attributes: ['classId', 'lessonId'],
                    include: [
                        {
                            model: Class,
                            attributes: ['id', 'name', 'teacherId'],
                            include: [
                                {
                                    model: Teacher,
                                    attributes: ['id', 'userId'],
                                    include: [
                                        {
                                            model: User,
                                            attributes: ['id', 'firstName', 'lastName']
                                        }
                                    ]
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
                // "classId",
                "createdAt",
                "updatedAt"
            ]
        })
        // console.log(lessons[0].ClassLessons[0].toJSON())
        // console.log(lessons[0].ClassLessons[1].toJSON())
        // console.log(lessons[0].ClassLessons[2].toJSON())
        const payload = []
        for (let i = 0; i < lessons.length; i++) {
            const lesson = lessons[i]
            const lessonData = lesson.toJSON()
            let lessonClasses = []
            for (let j = 0; j < lessonData.ClassLessons.length; j++) {
                const cls = lessonData.ClassLessons[j].Class
                // console.log(cls, "this is me")
                // lessonClasses.push(cls.Class)
                lessonClasses.push({
                    id: cls.id,
                    name: cls.name,
                    teacherId: cls.Teacher.id,
                    teacherUserId: cls.Teacher.userId,
                    teacherUserFirstName: cls.Teacher.User.firstName,
                    teacherUserLastName: cls.Teacher.User.lastName
                })
            }
            console.log(lessonClasses)
            // const lessonTeacher = {
            //     teacherId: lessonData.Class.teacherId,
            //     userId: lessonData.Class.Teacher.userId,
            //     firstName: lessonData.Class.Teacher.User.firstName,
            //     lastName: lessonData.Class.Teacher.User.lastName
            // }
            // console.log(lessonTeacher)

            lessonData.ClassesInfo = lessonClasses
            // lessonData.Teacher = lessonTeacher
            payload.push(lessonData)
            delete lessonData.ClassLessons
        }

        res.json({ "Lessons": payload })
    } else {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }

});

// get all lessons that belong to the current uer
router.get('/current-user', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    if (role === "teacher") {
        const userLessons = await Lesson.findAll({
            include: [
                {
                    model: ClassLesson,
                    include: [
                        {
                            model: Class,
                            attributes: ['teacherId'],
                            include: [
                                {
                                    model: Teacher,
                                    attributes: ['id', 'userId'],
                                    where: { userId: userId },
                                    include: [
                                        {
                                            model: User,
                                            attributes: ['firstName', 'lastName']
                                        }
                                    ]
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
                "createdAt",
                "updatedAt"
            ],
        })
        const payload = []
        for (let i = 0; i < userLessons.length; i++) {
            const lessons = userLessons[i]
            const lessonData = lessons.toJSON()

            payload.push(lessonData)
        }
        res.json({ "Lessons": payload })

    } else if (role === "student") {
        const userLessons = await Lessons.findAll({
            include: [
                {
                    model: StudentLesson,
                    where: { studentId: userId },
                    attributes: []
                }
            ],
            attributes: [
                "id",
                "title",
                "lessonImg",
                "description",
                "createdAt",
                "updatedAt",
            ],
        })
        const payload = []
        for (let i = 0; i < userLessons.length; i++) {
            const lessons = userLessons[i]
            const lessonData = lessons.toJSON()

            // classData.numLessons = classLessonInfo[0].dataValues.numLessons
            // classData.numAssignments = classAssignmentInfo[0].dataValues.numAssignments
            payload.push(lessonData)
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
        if (userId && role === "teacher") {
            const teacherLessonData = await Lesson.findOne({
                where: { id: lessonId },
                include: [
                    {
                        model: ClassLesson,
                        attributes: ['classId', 'lessonId'],
                        include: [
                            {
                                model: Class,
                                attributes: ['id', 'name', 'teacherId'],
                                include: [
                                    {
                                        model: Teacher,
                                        attributes: ['id', 'userId'],
                                        include: [
                                            {
                                                model: User,
                                                attributes: ['id', 'firstName', 'lastName']
                                            }
                                        ]
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
                    // "classId",
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

// create a new lesson for multiple classes that belong to the current user (teacher users only)
router.post('/', requireAuth, validateLessonParams, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { title, lessonImg, description, lessonContent, classIds } = req.body
    if (userId && role === 'teacher') {
        const teacher = await Teacher.findOne({
            where: { userId: userId },
            attributes: ['id', 'userId']
        })
        // console.log(teacher)
        const teacherId = teacher.dataValues.id
        if (teacherId === userId) {
            const teacherClasses = await Class.findAll({
                where: { teacherId: teacherId }
            })
            const validClassIds = teacherClasses.map(cls => cls.dataValues.id)
            console.log(validClassIds)
            const invalidClassIds = classIds.filter(id => !validClassIds.includes(id))
            if (invalidClassIds.length > 0) {
                res.status(403)
                return res.json({ "message": "Some classes provided do not belong to the current teacher user." })
            }
            const newLesson = new Lesson({
                title,
                lessonImg,
                description,
                lessonContent
            })
            await newLesson.save()
            console.log(newLesson)
            //associate lesson with specified array of classes in classIds
            for (const classId of classIds) {
                await ClassLesson.create({
                    lessonId: newLesson.id,
                    classId: classId
                })
            }

            res.status(201).json({ "message": "Lesson created successfully", newLesson })
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    } else if (userId && role !== 'teacher') {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }
})

// edit a lesson (teacher users only)
router.put('/:lessonId', requireAuth, validateLessonParams, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { lessonId } = req.params
    const { title, lessonImg, description, lessonContent, classIds } = req.body
    const existingLesson = await Lesson.findOne({
        where: { id: lessonId },
        include: [
            {
                model: ClassLesson,
                attributes: ['lessonId', 'classId'],
            }
        ]
    })
    if (userId && role === 'teacher') {
        if (existingLesson) {
            const teacher = await Teacher.findOne({
                where: { userId: userId },
                attributes: ['id', 'userId']
            })
            // console.log(teacher)
            const teacherId = teacher.dataValues.id
            if (teacherId === userId) {
                const teacherClasses = await Class.findAll({
                    where: { teacherId: teacherId }
                })
                const validClassIds = teacherClasses.map(cls => cls.dataValues.id)
                console.log(validClassIds)
                const invalidClassIds = classIds.filter(id => !validClassIds.includes(id))
                if (invalidClassIds.length > 0) {
                    res.status(403)
                    return res.json({ "message": "Some classes provided do not belong to the current teacher user." })
                }

                if (title !== undefined) existingLesson.title = title
                if (lessonImg !== undefined) existingLesson.lessonImg = lessonImg
                if (description !== undefined) existingLesson.description = description
                if (lessonContent !== undefined) existingLesson.lessonContent = lessonContent

                await existingLesson.save()

                await ClassLesson.destroy({ where: { lessonId: lessonId } })

                for (const classId of classIds) {
                    await ClassLesson.create({
                        lessonId: lessonId,
                        classId: classId
                    })
                }

                await res.status(201).json(existingLesson)
            } else {
                res.status(403)
                return res.json({
                    "message": "Forbidden"
                })
            }
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

// delete a lesson from the class it is associated with (teacher users only)
router.delete('/:lessonId/classes/:classId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { lessonId, classId } = req.params
    const existingLesson = await Lesson.findOne({
        where: { id: lessonId },
        include: [
            {
                model: ClassLesson,
                attributes: ['lessonId', 'classId'],
            }
        ]
    })
    if (userId && role === 'teacher') {
        if (existingLesson) {
            const teacher = await Teacher.findOne({
                where: { userId: userId },
                attributes: ['id', 'userId']
            })
            // console.log(teacher)
            const teacherId = teacher.dataValues.id
            if (teacherId === userId) {
                await ClassLesson.destroy({ where: { lessonId: lessonId, classId: classId } })

                res.json({
                    "message": "Successfully deleted"
                })
            } else {
                res.status(403)
                return res.json({
                    "message": "Forbidden"
                })
            }
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
