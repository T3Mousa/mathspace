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
                "teacherId",
                "createdAt",
                "updatedAt"
            ]
        })
        // console.log(lessons[0].ClassLessons[0].toJSON())
        const payload = []
        for (let i = 0; i < lessons.length; i++) {
            const lesson = lessons[i]
            const lessonData = lesson.toJSON()
            const teacherUserOwnsLesson = lessonData.ClassLessons.find(clsLesson => clsLesson.Class.Teacher.userId === userId)
            if (teacherUserOwnsLesson !== undefined) {
                let lessonClasses = []
                for (let j = 0; j < lessonData.ClassLessons.length; j++) {
                    const cls = lessonData.ClassLessons[j].Class
                    lessonClasses.push({
                        classId: cls.id,
                        className: cls.name,
                        teacherId: cls.Teacher.id,
                    })
                }
                // console.log(lessonClasses)

                lessonData.LessonClasses = lessonClasses
            }

            lessonData.LessonTeacherFirstName = lessonData.ClassLessons.map(clsLesson => clsLesson.Class.Teacher.User.firstName)[0]
            lessonData.LessonTeacherLastName = lessonData.ClassLessons.map(clsLesson => clsLesson.Class.Teacher.User.lastName)[0]
            payload.push(lessonData)
            delete lessonData.ClassLessons
            if (!lessonData.LessonClasses) {
                const teacher = await Teacher.findOne({
                    where: { id: lessonData.teacherId },
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                })
                const teacherData = teacher.toJSON()
                // console.log(teacherData)
                lessonData.LessonTeacherFirstName = teacherData.User.firstName
                lessonData.LessonTeacherLastName = teacherData.User.lastName
            }
        }

        res.json({ "Lessons": payload })
    } else {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }

});

// get all lessons that belong to the current user
router.get('/current-user', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const teach = await Teacher.findOne({
        where: { userId: userId }
    })
    const teachId = teach.dataValues.id
    if (userId && role === "teacher") {
        const userLessons = await Lesson.findAll({
            where: { teacherId: teachId },
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
                                    where: { userId: userId },
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
                "teacherId",
                "createdAt",
                "updatedAt"
            ],
        })
        const payload = []
        for (let i = 0; i < userLessons.length; i++) {
            const lessons = userLessons[i]
            const lessonData = lessons.toJSON()
            let lessonClasses = []
            for (let j = 0; j < lessonData.ClassLessons.length; j++) {
                const cls = lessonData.ClassLessons[j].Class
                lessonClasses.push({
                    classId: cls.id,
                    className: cls.name,
                    teacherId: cls.Teacher.id
                })
            }
            lessonData.LessonClasses = lessonClasses
            lessonData.LessonTeacherFirstName = lessonData.ClassLessons.map(clsLesson => clsLesson.Class.Teacher.User.firstName)[0]
            lessonData.LessonTeacherLastName = lessonData.ClassLessons.map(clsLesson => clsLesson.Class.Teacher.User.lastName)[0]
            lessonData.LessonTeacherUserId = lessonData.ClassLessons.map(clsLesson => clsLesson.Class.Teacher.User.id)[0]
            payload.push(lessonData)
            delete lessonData.ClassLessons
            if (!lessonData.LessonClasses) {
                const teacher = await Teacher.findOne({
                    where: { id: lessonData.teacherId },
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                })
                const teacherData = teacher.toJSON()
                // console.log(teacherData)
                lessonData.LessonTeacherUserId = teacherData.User.id
                lessonData.LessonTeacherFirstName = teacherData.User.firstName
                lessonData.LessonTeacherLastName = teacherData.User.lastName
            }
        }
        res.json({ "Lessons": payload })

    }
    // else if (role === "student") {
    //     const userLessons = await Lessons.findAll({
    //         include: [
    //             {
    //                 model: StudentLesson,
    //                 where: { studentId: userId },
    //                 attributes: []
    //             }
    //         ],
    //         attributes: [
    //             "id",
    //             "title",
    //             "lessonImg",
    //             "description",
    // "teacherId",
    //             "createdAt",
    //             "updatedAt",
    //         ],
    //     })
    //     const payload = []
    //     for (let i = 0; i < userLessons.length; i++) {
    //         const lessons = userLessons[i]
    //         const lessonData = lessons.toJSON()

    //         // classData.numLessons = classLessonInfo[0].dataValues.numLessons
    //         // classData.numAssignments = classAssignmentInfo[0].dataValues.numAssignments
    //         payload.push(lessonData)
    //     }
    //     res.json({ "Lessons": payload })

    // } else {
    //     res.status(403)
    //     return res.json({
    //         "message": "Forbidden"
    //     })
    // }
});

//get details of a lesson from an id
router.get('/:lessonId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { lessonId } = req.params
    const existingLesson = await Lesson.findByPk(lessonId)
    // console.log(existingLesson)
    if (existingLesson) {
        if (userId && role === "teacher") {
            const lessonDetails = await Lesson.findOne({
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
                    "teacherId",
                    "createdAt",
                    "updatedAt",
                ]
            })
            // console.log(lessonDetails)
            const lessonDetailsData = lessonDetails.toJSON()
            const teacherUserOwnsLesson = lessonDetailsData.ClassLessons.find(clsLesson => clsLesson.Class.Teacher.userId === userId)
            if (teacherUserOwnsLesson !== undefined) {
                let lessonClasses = []
                for (let i = 0; i < lessonDetailsData.ClassLessons.length; i++) {
                    const cls = lessonDetailsData.ClassLessons[i].Class
                    lessonClasses.push({
                        classId: cls.id,
                        className: cls.name,
                        teacherId: cls.Teacher.id,
                        teacherUserId: cls.Teacher.userId
                    })
                }

                lessonDetailsData.LessonClasses = lessonClasses
            }
            lessonDetailsData.LessonTeacherFirstName = lessonDetailsData.ClassLessons.map(clsLesson => clsLesson.Class.Teacher.User.firstName)[0]
            lessonDetailsData.LessonTeacherLastName = lessonDetailsData.ClassLessons.map(clsLesson => clsLesson.Class.Teacher.User.lastName)[0]
            lessonDetailsData.LessonTeacherUserId = lessonDetailsData.ClassLessons.map(clsLesson => clsLesson.Class.Teacher.User.id)[0]
            delete lessonDetailsData.ClassLessons
            if (!lessonDetailsData.LessonClasses) {
                const teacher = await Teacher.findOne({
                    where: { id: lessonDetailsData.teacherId },
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                })
                const teacherData = teacher.toJSON()
                // console.log(teacherData)
                lessonDetailsData.LessonTeacherFirstName = teacherData.User.firstName
                lessonDetailsData.LessonTeacherLastName = teacherData.User.lastName
                lessonDetailsData.LessonTeacherUserId = teacherData.User.id
            }
            res.json({ "Lesson": lessonDetailsData })
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
    const { title, lessonImg, description, lessonContent, selectedClasses } = req.body
    if (userId && role === 'teacher') {
        const teacher = await Teacher.findOne({
            where: { userId: userId },
            attributes: ['id', 'userId']
        })
        const teacherId = teacher.dataValues.id
        if (teacherId === userId) {
            const teacherClasses = await Class.findAll({
                where: { teacherId: teacherId }
            })
            const validClassIds = teacherClasses.map(cls => cls.dataValues.id)
            // console.log(validClassIds)
            const invalidClassIds = selectedClasses.filter(cls => !validClassIds.includes(cls.value))
            // console.log(invalidClassIds)
            if (invalidClassIds.length > 0) {
                res.status(403)
                return res.json({ "message": "Some classes provided do not belong to the current teacher user." })
            }
            const newLesson = new Lesson({
                title,
                lessonImg,
                description,
                lessonContent,
                teacherId: teacherId
            })
            await newLesson.save()
            //associate lesson with specified array of classes in classIds
            for (const selectedClass of selectedClasses) {
                await ClassLesson.create({
                    lessonId: newLesson.id,
                    classId: selectedClass.value
                })
            }

            res.status(201).json(newLesson)
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
    const { title, lessonImg, description, lessonContent, selectedClasses } = req.body
    const existingLesson = await Lesson.findOne({
        where: { id: lessonId },
        include: [
            {
                model: ClassLesson,
                attributes: ['lessonId', 'classId'],
            }
        ]
    })
    const existingLessonJSON = existingLesson.toJSON()
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
                // console.log(validClassIds)
                const invalidClassIds = selectedClasses.filter(cls => !validClassIds.includes(cls.value))
                // console.log(invalidClassIds)
                if (invalidClassIds.length > 0) {
                    res.status(403)
                    return res.json({ "message": "Some classes provided do not belong to the current teacher user." })
                }

                if (title !== undefined) existingLesson.title = title
                if (lessonImg !== undefined) existingLesson.lessonImg = lessonImg
                if (description !== undefined) existingLesson.description = description
                if (lessonContent !== undefined) existingLesson.lessonContent = lessonContent
                // if (selectedClasses !== undefined) existingLesson.ClassLessons = selectedClasses
                const updatedLesson = await existingLesson.save()
                // await existingLesson.save()

                await ClassLesson.destroy({ where: { lessonId: lessonId } })
                // const newClassAssociations = LessonClasses.map(classId => ({
                //     lessonId: lessonId,
                //     classId: classId
                // }))
                // await ClassLesson.bulkCreate(newClassAssociations)
                for (const selectedClass of selectedClasses) {
                    await ClassLesson.create({
                        lessonId: lessonId,
                        classId: selectedClass.value
                    })
                }
                res.status(201).json(updatedLesson)
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
router.delete('/:lessonId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { lessonId } = req.params
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
                await existingLesson.destroy({ where: { id: lessonId } })

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
