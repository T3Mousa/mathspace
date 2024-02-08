const express = require('express');
const { User, Teacher, Student, Class, Lesson, ClassEnrollment, Assignment, Grade, ClassLesson, ClassAssignment, sequelize, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateClassParams, validateLessonParams } = require('./validators')
const { Op } = require("sequelize");

const router = express.Router();

//get all classes that belong to the current user
router.get('/current-user', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    if (role === "teacher") {
        const classes = await Class.findAll({
            include: [
                {
                    model: Teacher,
                    where: { userId: userId },
                    attributes: []
                }
            ],
            attributes: [
                "id",
                "name",
                "classImg",
                "description",
                "teacherId",
                "createdAt",
                "updatedAt"
            ],
        })
        const payload = []
        for (let i = 0; i < classes.length; i++) {
            const cls = classes[i]
            const classData = cls.toJSON()
            const studentEnrollment = await cls.getClassEnrollments({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('id')), 'studentCount']
                ],
                required: false
            })
            classData.studentCount = studentEnrollment[0].dataValues.studentCount
            payload.push(classData)
        }
        res.json({ "Classes": payload })

    } else if (role === "student") {
        const classes = await Class.findAll({
            include: [
                {
                    model: ClassEnrollment,
                    where: { studentId: userId },
                    attributes: []
                }
            ],
            attributes: [
                "id",
                "name",
                "classImg",
                "description",
                "teacherId",
                "createdAt",
                "updatedAt",
            ],
        })
        const payload = []
        for (let i = 0; i < classes.length; i++) {
            const cls = classes[i]
            const classData = cls.toJSON()
            const classLessonInfo = await cls.getLessons({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('id')), 'numLessons']
                ],
                required: false
            })
            const classAssignmentInfo = await cls.getAssignments({
                attributes: [
                    [sequelize.fn('COUNT', sequelize.col('id')), 'numAssignments']
                ]
            })

            classData.numLessons = classLessonInfo[0].dataValues.numLessons
            classData.numAssignments = classAssignmentInfo[0].dataValues.numAssignments
            payload.push(classData)
        }
        res.json({ "Classes": payload })

    } else {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }
});

// get details of a class from an id
router.get('/:classId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { classId } = req.params
    // const existingClass = await Class.findByPk(classId)
    const existingClass = await Class.findOne({
        where: { id: classId },
        include: [
            {
                model: Teacher,
                attributes: ["userId"]
            }
        ]
    })
    if (existingClass) {
        if (role === 'teacher' && existingClass.Teacher.userId === userId) {
            const teacherClass = await Class.findOne({
                where: { id: classId },
                include: [
                    {
                        model: ClassEnrollment,
                        attributes: ['studentId'],
                        include: [
                            {
                                model: Student,
                                attributes: ['userId'],
                                include: [
                                    {
                                        model: User,
                                        attributes: ['id', 'firstName', 'lastName', 'email']
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        model: ClassLesson,
                        attributes: ['classId', 'lessonId'],
                        include: [
                            {
                                model: Lesson,
                                attributes: ['id', 'title', 'lessonImg', 'description', 'lessonContent']
                            }
                        ]
                    },
                    {
                        model: ClassAssignment,
                        attributes: ['classId', 'assignmentId'],
                        include: [
                            {
                                model: Assignment,
                                attributes: ['id', 'title', 'description', 'assignmentContent', 'dueDate'],
                                include: {
                                    model: Grade,
                                    attributes: ['id', 'assignmentId', 'studentId', 'isCompleted', 'grade']
                                }
                            }
                        ]
                    }
                ],
                attributes: [
                    "id",
                    "name",
                    "classImg",
                    "description",
                    "teacherId",
                    "createdAt",
                    "updatedAt",
                ]
            })
            const Students = []
            const classData = teacherClass.toJSON()
            const classEnrollmentArray = classData.ClassEnrollments
            for (let i = 0; i < classEnrollmentArray.length; i++) {
                let student = classEnrollmentArray[i]
                student = {
                    studentId: student.studentId,
                    userId: student.Student.User.id,
                    firstName: student.Student.User.firstName,
                    lastName: student.Student.User.lastName,
                    email: student.Student.User.email
                }
                Students.push(student)
            }
            classData.Students = Students
            delete classData.ClassEnrollments
            // console.log({ "Class": classData })
            res.json({ "Class": classData })

        } else if (role === 'teacher' && existingClass.Teacher.userId !== userId) {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        } else if (role === "student") {
            const stud = await Student.findOne({
                where: { userId: userId }
            })
            const studId = stud.dataValues.id
            const studentClass = await Class.findOne({
                where: { id: classId },
                include: [
                    {
                        model: Teacher,
                        attributes: ['userId'],
                        include: [
                            {
                                model: User,
                                attributes: ['id', 'firstName', 'lastName', 'email']
                            }
                        ]
                    },
                    {
                        model: ClassLesson,
                        attributes: ['classId', 'lessonId'],
                        include: [
                            {
                                model: Lesson,
                                attributes: ['id', 'title', 'lessonImg', 'description', 'lessonContent']
                            }
                        ]
                    },
                    {
                        model: ClassAssignment,
                        attributes: ['classId', 'assignmentId'],
                        include: [
                            {
                                model: Assignment,
                                attributes: ['id', 'title', 'description', 'assignmentContent', 'dueDate'],
                                include: {
                                    model: Grade,
                                    where: { studentId: studId },
                                    attributes: ['id', 'assignmentId', 'studentId', 'isCompleted', 'grade']
                                }
                            }
                        ]
                    }
                ]
            })
            const Instructor = {}
            const studentClassData = studentClass.toJSON()
            const teacherInfo = studentClassData.Teacher
            console.log(teacherInfo)
            Instructor.teacherId = teacherInfo.userId
            Instructor.userId = teacherInfo.User.id
            Instructor.firstName = teacherInfo.User.firstName
            Instructor.lastName = teacherInfo.User.lastName
            Instructor.email = teacherInfo.User.email
            delete studentClassData.Teacher
            studentClassData.Teacher = Instructor

            res.json({ "Class": studentClassData })
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    }
    if (!existingClass) {
        res.status(404);
        return res.json({
            "message": "Class couldn't be found",
        })
    }
});

// create a new class (teacher users only)
router.post('/', requireAuth, validateClassParams, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const teach = await Teacher.findOne({
        where: { userId: userId }
    })
    const teachId = teach.dataValues.id
    console.log(teachId)
    if (userId && role === 'teacher') {
        const { name, classImg, description } = req.body
        const newClass = Class.build({
            teacherId: teachId,
            name,
            classImg,
            description
        })
        await newClass.save()
        console.log(newClass)
        res.status(201).json(newClass)
    } else if (userId && role !== 'teacher') {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }
});


// edit a class (teacher users only)
router.put('/:classId', requireAuth, validateClassParams, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { classId } = req.params
    console.log(classId)
    const { name, classImg, description } = req.body
    const existingClass = await Class.findOne({
        where: { id: classId },
        attributes: [
            "id",
            "name",
            "classImg",
            "description",
            "teacherId"
        ],
        include: [
            {
                model: Teacher,
                attributes: ["userId"]
            }
        ]
    })
    if (existingClass) {
        if (userId && role === "teacher") {
            if (userId === existingClass.Teacher.userId) {
                if (name !== undefined) existingClass.name = name
                if (classImg !== undefined) existingClass.classImg = classImg
                if (description !== undefined) existingClass.description = description

                await existingClass.save()
                console.log(existingClass)
                res.json(existingClass)
            } else {
                res.status(403)
                return res.json({
                    "message": "Forbidden"
                })
            }
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    } else {
        res.status(404);
        return res.json({
            "message": "Class couldn't be found",
        })
    }
})

// delete a class
router.delete('/:classId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const { classId } = req.params
    const role = req.user.userRole
    const existingClass = await Class.findOne({
        where: { id: classId },
        include: [
            {
                model: Teacher,
                attributes: ["userId"]
            }
        ]
    })
    console.log(existingClass)
    if (existingClass) {
        if (userId && role === "teacher") {
            if (userId === existingClass.Teacher.userId) {
                await existingClass.destroy()
                res.json({
                    "message": "Successfully deleted"
                })
            } else {
                res.status(403)
                return res.json({
                    "message": "Forbidden"
                })
            }
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    } else {
        res.status(404);
        return res.json({
            "message": "Class couldn't be found",
        })
    }
});

// get all lessons for a class by the class id
router.get('/:classId/lessons', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { classId } = req.params
    const existingClass = await Class.findOne({
        where: { id: classId }
    })
    const teach = await Teacher.findOne({
        where: { userId: userId }
    })
    const teachId = teach.dataValues.id
    if (userId && role === "teacher") {
        if (existingClass && existingClass.teacherId === teachId) {
            const classLessons = await Lesson.findAll({
                where: { teacherId: teachId },
                include: [
                    {
                        model: ClassLesson,
                        attributes: ['classId', 'lessonId'],
                        where: { classId: classId }
                    }
                ]

            })
            res.json({ "Lessons": classLessons })
        } else if (existingClass && existingClass.teacherId !== teachId) {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        } else if (!existingClass) {
            res.status(404);
            return res.json({
                "message": "Class couldn't be found",
            })
        }
    } else if (userId && role !== 'teacher') {
        res.status(403)
        return res.json({
            "message": "Forbidden -- feature coming soon for student users"
        })
    }
})

// // create a new lesson for a class that belongs to the current user (teacher users only)
// router.post('/:classId/lessons', requireAuth, validateLessonParams, async (req, res) => {
//     const userId = req.user.id
//     const role = req.user.userRole
//     const { classId } = req.params
//     const { title, lessonImg, description, lessonContent } = req.body
//     const existingClass = await Class.findByPk(classId)
//     console.log(existingClass)
//     const teach = await Teacher.findOne({
//         where: { userId: userId }
//     })
//     const teachId = teach.dataValues.id
//     console.log(teachId)
//     if (userId && role === 'teacher') {
//         if (existingClass && existingClass.teacherId === teachId) {
//             const newLesson = Lesson.build({
//                 classId: classId,
//                 title,
//                 lessonImg,
//                 description,
//                 lessonContent
//             })
//             await newLesson.save()
//             // console.log(newLesson)
//             res.status(201).json(newLesson)
//         } else if (existingClass && existingClass.teacherId !== teachId) {
//             res.status(403)
//             return res.json({
//                 "message": "Forbidden"
//             })
//         } else if (!existingClass) {
//             res.status(404);
//             return res.json({
//                 "message": "Class couldn't be found",
//             })
//         }
//     } else if (userId && role !== 'teacher') {
//         res.status(403)
//         return res.json({
//             "message": "Forbidden"
//         })
//     }
// })



module.exports = router;
