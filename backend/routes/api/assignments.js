const express = require('express');
const { User, Teacher, Student, Class, Lesson, ClassEnrollment, Assignment, Grade, StudentLesson, ClassLesson, ClassAssignment, sequelize, Sequelize } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateAssignmentParams } = require('./validators');

const { Op } = require("sequelize");
const e = require('express');

const router = express.Router();

//get all assignments (teacher users only)
router.get('/', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    if (userId && role === "teacher") {
        const assignments = await Assignment.findAll({
            include: [
                {
                    model: ClassAssignment,
                    attributes: ['classId', 'assignmentId'],
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
                "description",
                "assignmentContent",
                "dueDate",
                "teacherId",
                "createdAt",
                "updatedAt"
            ]
        })
        // console.log(assignments[0].ClassAssignments[0].toJSON())
        const payload = []
        for (let i = 0; i < assignments.length; i++) {
            const assignment = assignments[i]
            const assignmentData = assignment.toJSON()
            // console.log(assignmentData)
            const teacherUserOwnsAssignment = assignmentData.ClassAssignments.find(clsAssignment => clsAssignment.Class.Teacher.userId === userId)
            if (teacherUserOwnsAssignment !== undefined) {
                let assignmentClasses = []
                for (let j = 0; j < assignmentData.ClassAssignments.length; j++) {
                    const cls = assignmentData.ClassAssignments[j].Class
                    assignmentClasses.push({
                        classId: cls.id,
                        className: cls.name,
                        teacherId: cls.Teacher.id,
                    })
                }
                // console.log(assignmentClasses)

                assignmentData.AssignmentClasses = assignmentClasses
            }

            assignmentData.AssignmentTeacherFirstName = assignmentData.ClassAssignments.map(clsAssignment => clsAssignment.Class.Teacher.User.firstName)[0]
            assignmentData.AssignmentTeacherLastName = assignmentData.ClassAssignments.map(clsAssignment => clsAssignment.Class.Teacher.User.lastName)[0]
            payload.push(assignmentData)
            delete assignmentData.ClassAssignments
            if (!assignmentData.AssignmentClasses) {
                const teacher = await Teacher.findOne({
                    where: { id: assignmentData.teacherId },
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                })
                const teacherData = teacher.toJSON()
                // console.log(teacherData)
                assignmentData.AssignmentTeacherFirstName = teacherData.User.firstName
                assignmentData.AssignmentTeacherLastName = teacherData.User.lastName
            }
        }

        res.json({ "Assignments": payload })
    } else {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }

});

// get all assignments that belong to the current user
router.get('/current-user', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const teach = await Teacher.findOne({
        where: { userId: userId }
    })
    const teachId = teach.dataValues.id
    if (userId && role === "teacher") {
        const userAssignments = await Assignment.findAll({
            where: { teacherId: teachId },
            include: [
                {
                    model: ClassAssignment,
                    attributes: ['classId', 'assignmentId'],
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
                "description",
                "assignmentContent",
                "dueDate",
                "teacherId",
                "createdAt",
                "updatedAt"
            ],
        })
        const payload = []
        for (let i = 0; i < userAssignments.length; i++) {
            const assignments = userAssignments[i]
            const assignmentData = assignments.toJSON()
            let assignmentClasses = []
            for (let j = 0; j < assignmentData.ClassAssignments.length; j++) {
                const cls = assignmentData.ClassAssignments[j].Class
                assignmentClasses.push({
                    classId: cls.id,
                    className: cls.name,
                    teacherId: cls.Teacher.id
                })
            }
            assignmentData.AssignmentClasses = assignmentClasses
            assignmentData.AssignmentTeacherFirstName = assignmentData.ClassAssignments.map(clsAssignment => clsAssignment.Class.Teacher.User.firstName)[0]
            assignmentData.AssignmentTeacherLastName = assignmentData.ClassAssignments.map(clsAssignment => clsAssignment.Class.Teacher.User.lastName)[0]
            assignmentData.AssignmentTeacherUserId = assignmentData.ClassAssignments.map(clsAssignment => clsAssignment.Class.Teacher.User.id)[0]
            payload.push(assignmentData)
            delete assignmentData.ClassAssignments
            if (!assignmentData.AssignmentClasses) {
                const teacher = await Teacher.findOne({
                    where: { id: assignmentData.teacherId },
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                })
                const teacherData = teacher.toJSON()
                // console.log(teacherData)
                assignmentData.AssignmentTeacherUserId = teacherData.User.id
                assignmentData.AssignmentTeacherFirstName = teacherData.User.firstName
                assignmentData.AssignmentTeacherLastName = teacherData.User.lastName
            }
        }
        res.json({ "Assignments": payload })

    }
    else {
        res.status(403)
        return res.json({
            "message": "Forbidden"
        })
    }

});

//get details of an assignment from an id
router.get('/:assignmentId', requireAuth, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { assignmentId } = req.params
    const existingAssignment = await Assignment.findByPk(assignmentId)
    // console.log(existingLesson)
    if (existingAssignment) {
        if (userId && role === "teacher") {
            const assignmentDetails = await Assignment.findOne({
                where: { id: assignmentId },
                include: [
                    {
                        model: ClassAssignment,
                        attributes: ['classId', 'assignmentId'],
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
                    "description",
                    "assignmentContent",
                    "dueDate",
                    "teacherId",
                    "createdAt",
                    "updatedAt",
                ]
            })
            // console.log(assignmentDetails)
            const assignmentDetailsData = assignmentDetails.toJSON()
            const teacherUserOwnsAssignment = assignmentDetailsData.ClassAssignments.find(clsAssignment => clsAssignment.Class.Teacher.userId === userId)
            if (teacherUserOwnsAssignment !== undefined) {
                let assignmentClasses = []
                for (let i = 0; i < assignmentDetailsData.ClassAssignments.length; i++) {
                    const cls = assignmentDetailsData.ClassAssignments[i].Class
                    assignmentClasses.push({
                        classId: cls.id,
                        className: cls.name,
                        teacherId: cls.Teacher.id,
                        teacherUserId: cls.Teacher.userId
                    })
                }

                assignmentDetailsData.AssignmentClasses = assignmentClasses
            }
            assignmentDetailsData.AssignmentTeacherFirstName = assignmentDetailsData.ClassAssignments.map(clsAssignment => clsAssignment.Class.Teacher.User.firstName)[0]
            assignmentDetailsData.AssignmentTeacherLastName = assignmentDetailsData.ClassAssignments.map(clsAssignment => clsAssignment.Class.Teacher.User.lastName)[0]
            assignmentDetailsData.AssignmentTeacherUserId = assignmentDetailsData.ClassAssignments.map(clsAssignment => clsAssignment.Class.Teacher.User.id)[0]
            delete assignmentDetailsData.ClassAssignments
            if (!assignmentDetailsData.AssignmentClasses) {
                const teacher = await Teacher.findOne({
                    where: { id: assignmentDetailsData.teacherId },
                    include: [
                        {
                            model: User,
                            attributes: ['id', 'firstName', 'lastName']
                        }
                    ]
                })
                const teacherData = teacher.toJSON()
                // console.log(teacherData)
                assignmentDetailsData.AssignmentTeacherFirstName = teacherData.User.firstName
                assignmentDetailsData.AssignmentTeacherLastName = teacherData.User.lastName
                assignmentDetailsData.AssignmentTeacherUserId = teacherData.User.id
            }
            // console.log(assignmentDetailsData)
            res.json({ "Assignment": assignmentDetailsData })
        } else {
            res.status(403)
            return res.json({
                "message": "Forbidden"
            })
        }
    }
    if (!existingAssignment) {
        res.status(404);
        return res.json({
            "message": "Assignment couldn't be found",
        })
    }

});

// create a new assignment for multiple classes that belong to the current user (teacher users only)
router.post('/', requireAuth, validateAssignmentParams, async (req, res) => {
    const userId = req.user.id
    const role = req.user.userRole
    const { title, description, assignmentContent, dueDate, selectedClasses } = req.body
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
            const newAssignment = new Assignment({
                title,
                description,
                assignmentContent,
                dueDate,
                teacherId: teacherId
            })
            await newAssignment.save()
            //associate assignment with specified array of classes in classIds
            for (const selectedClass of selectedClasses) {
                await ClassAssignment.create({
                    assignmentId: newAssignment.id,
                    classId: selectedClass.value
                })
            }

            res.status(201).json(newAssignment)
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

// // edit a lesson (teacher users only)
// router.put('/:lessonId', requireAuth, validateLessonParams, async (req, res) => {
//     const userId = req.user.id
//     const role = req.user.userRole
//     const { lessonId } = req.params
//     const { title, lessonImg, description, lessonContent, selectedClasses } = req.body
//     const existingLesson = await Lesson.findOne({
//         where: { id: lessonId },
//         include: [
//             {
//                 model: ClassLesson,
//                 attributes: ['lessonId', 'classId'],
//             }
//         ]
//     })
//     const existingLessonJSON = existingLesson.toJSON()
//     if (userId && role === 'teacher') {
//         if (existingLesson) {
//             const teacher = await Teacher.findOne({
//                 where: { userId: userId },
//                 attributes: ['id', 'userId']
//             })
//             // console.log(teacher)
//             const teacherId = teacher.dataValues.id
//             if (teacherId === userId) {
//                 const teacherClasses = await Class.findAll({
//                     where: { teacherId: teacherId }
//                 })
//                 const validClassIds = teacherClasses.map(cls => cls.dataValues.id)
//                 // console.log(validClassIds)
//                 const invalidClassIds = selectedClasses.filter(cls => !validClassIds.includes(cls.value))
//                 // console.log(invalidClassIds)
//                 if (invalidClassIds.length > 0) {
//                     res.status(403)
//                     return res.json({ "message": "Some classes provided do not belong to the current teacher user." })
//                 }

//                 if (title !== undefined) existingLesson.title = title
//                 if (lessonImg !== undefined) existingLesson.lessonImg = lessonImg
//                 if (description !== undefined) existingLesson.description = description
//                 if (lessonContent !== undefined) existingLesson.lessonContent = lessonContent
//                 // if (selectedClasses !== undefined) existingLesson.ClassLessons = selectedClasses
//                 const updatedLesson = await existingLesson.save()
//                 // await existingLesson.save()

//                 await ClassLesson.destroy({ where: { lessonId: lessonId } })
//                 // const newClassAssociations = LessonClasses.map(classId => ({
//                 //     lessonId: lessonId,
//                 //     classId: classId
//                 // }))
//                 // await ClassLesson.bulkCreate(newClassAssociations)
//                 for (const selectedClass of selectedClasses) {
//                     await ClassLesson.create({
//                         lessonId: lessonId,
//                         classId: selectedClass.value
//                     })
//                 }
//                 res.status(201).json(updatedLesson)
//             } else {
//                 res.status(403)
//                 return res.json({
//                     "message": "Forbidden"
//                 })
//             }
//         } else if (!existingLesson) {
//             res.status(404);
//             return res.json({
//                 "message": "Lesson couldn't be found",
//             })
//         }
//     } else if (userId && role !== 'teacher') {
//         res.status(403)
//         return res.json({
//             "message": "Forbidden"
//         })
//     }
// });

// // delete a lesson from the class it is associated with (teacher users only)
// router.delete('/:lessonId', requireAuth, async (req, res) => {
//     const userId = req.user.id
//     const role = req.user.userRole
//     const { lessonId } = req.params
//     const existingLesson = await Lesson.findOne({
//         where: { id: lessonId },
//         include: [
//             {
//                 model: ClassLesson,
//                 attributes: ['lessonId', 'classId'],
//             }
//         ]
//     })
//     if (userId && role === 'teacher') {
//         if (existingLesson) {
//             const teacher = await Teacher.findOne({
//                 where: { userId: userId },
//                 attributes: ['id', 'userId']
//             })
//             // console.log(teacher)
//             const teacherId = teacher.dataValues.id
//             if (teacherId === userId) {
//                 await existingLesson.destroy({ where: { id: lessonId } })

//                 res.json({
//                     "message": "Successfully deleted"
//                 })
//             } else {
//                 res.status(403)
//                 return res.json({
//                     "message": "Forbidden"
//                 })
//             }
//         } else if (!existingLesson) {
//             res.status(404);
//             return res.json({
//                 "message": "Lesson couldn't be found",
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
