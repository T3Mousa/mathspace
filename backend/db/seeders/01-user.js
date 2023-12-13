'use strict';

const { User, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');


let options = {};
options.tableName = 'Users';

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {


  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'Teacher',
        userRole: 'Teacher',
        email: 'demo_teacher@user.io',
        username: 'Demo-teacher',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: ''
      },
      {
        firstName: 'First',
        lastName: 'Teacher',
        userRole: 'Teacher',
        email: 'teacher1@user.io',
        username: 'TeacherUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        profileImg: ''
      },
      {
        firstName: 'Third',
        lastName: 'Teacher',
        userRole: 'Teacher',
        email: 'teacher2@user.io',
        username: 'TeacherUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        profileImg: ''
      },
      {
        firstName: 'Demo',
        lastName: 'Student',
        userRole: 'Student',
        email: 'demo_student@user.io',
        username: 'Demo-student',
        hashedPassword: bcrypt.hashSync('password4'),
        profileImg: ''
      },
      {
        firstName: 'First',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student1@user.io',
        username: 'StudentUser1',
        hashedPassword: bcrypt.hashSync('password5'),
        profileImg: ''
      },
      {
        firstName: 'Second',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student2@user.io',
        username: 'StudentUser2',
        hashedPassword: bcrypt.hashSync('password6'),
        profileImg: ''
      },
      {
        firstName: 'Third',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student3@user.io',
        username: 'StudentUser3',
        hashedPassword: bcrypt.hashSync('password7'),
        profileImg: ''
      },
      {
        firstName: 'Fourth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student4@user.io',
        username: 'StudentUser4',
        hashedPassword: bcrypt.hashSync('password8'),
        profileImg: ''
      },
      {
        firstName: 'Fifth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student5@user.io',
        username: 'StudentUser5',
        hashedPassword: bcrypt.hashSync('password9'),
        profileImg: ''
      },
      {
        firstName: 'Sixth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student6@user.io',
        username: 'StudentUser6',
        hashedPassword: bcrypt.hashSync('password10'),
        profileImg: ''
      },
      {
        firstName: 'Seventh',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student7@user.io',
        username: 'StudentUser7',
        hashedPassword: bcrypt.hashSync('password11'),
        profileImg: ''
      },
      {
        firstName: 'Eighth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student8@user.io',
        username: 'StudentUser8',
        hashedPassword: bcrypt.hashSync('password12'),
        profileImg: ''
      },
      {
        firstName: 'Ninth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student9@user.io',
        username: 'StudentUser9',
        hashedPassword: bcrypt.hashSync('password13'),
        profileImg: ''
      },
      {
        firstName: 'Tenth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student10@user.io',
        username: 'StudentUser10',
        hashedPassword: bcrypt.hashSync('password14'),
        profileImg: ''
      },
      {
        firstName: 'Eleventh',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student11@user.io',
        username: 'StudentUser11',
        hashedPassword: bcrypt.hashSync('password15'),
        profileImg: ''
      },
      {
        firstName: 'Twelfth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student12@user.io',
        username: 'StudentUser12',
        hashedPassword: bcrypt.hashSync('password16'),
        profileImg: ''
      },
      {
        firstName: 'Thirteenth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student13@user.io',
        username: 'StudentUser13',
        hashedPassword: bcrypt.hashSync('password17'),
        profileImg: ''
      },
      {
        firstName: 'Fourteenth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student14@user.io',
        username: 'StudentUser14',
        hashedPassword: bcrypt.hashSync('password18'),
        profileImg: ''
      },
      {
        firstName: 'Fifteenth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student15@user.io',
        username: 'StudentUser15',
        hashedPassword: bcrypt.hashSync('password19'),
        profileImg: ''
      },
      {
        firstName: 'Sixteenth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student16@user.io',
        username: 'StudentUser16',
        hashedPassword: bcrypt.hashSync('password20'),
        profileImg: ''
      },
      {
        firstName: 'Seventeenth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student17@user.io',
        username: 'StudentUser17',
        hashedPassword: bcrypt.hashSync('password21'),
        profileImg: ''
      },
      {
        firstName: 'Eighteenth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student18@user.io',
        username: 'StudentUser18',
        hashedPassword: bcrypt.hashSync('password22'),
        profileImg: ''
      },
      {
        firstName: 'Ninteenth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student19@user.io',
        username: 'StudentUser19',
        hashedPassword: bcrypt.hashSync('password23'),
        profileImg: ''
      },
      {
        firstName: 'Twentieth',
        lastName: 'Student',
        userRole: 'Student',
        email: 'student20@user.io',
        username: 'StudentUser20',
        hashedPassword: bcrypt.hashSync('password24'),
        profileImg: ''
      },
    ], {})
  },



  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [] }
    })
  }
}
