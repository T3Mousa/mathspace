
'use strict';

const { User, Sequelize } = require('../models');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker')

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
        userRole: 'teacher',
        email: 'demo_teacher@user.io',
        username: 'Demo-teacher',
        hashedPassword: bcrypt.hashSync('password'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'First',
        lastName: 'Teacher',
        userRole: 'teacher',
        email: 'teacher1@user.io',
        username: 'TeacherUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Third',
        lastName: 'Teacher',
        userRole: 'teacher',
        email: 'teacher2@user.io',
        username: 'TeacherUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Demo',
        lastName: 'Student',
        userRole: 'student',
        email: 'demo_student@user.io',
        username: 'Demo-student',
        hashedPassword: bcrypt.hashSync('password4'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'First',
        lastName: 'Student',
        userRole: 'student',
        email: 'student1@user.io',
        username: 'StudentUser1',
        hashedPassword: bcrypt.hashSync('password5'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Second',
        lastName: 'Student',
        userRole: 'student',
        email: 'student2@user.io',
        username: 'StudentUser2',
        hashedPassword: bcrypt.hashSync('password6'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Third',
        lastName: 'Student',
        userRole: 'student',
        email: 'student3@user.io',
        username: 'StudentUser3',
        hashedPassword: bcrypt.hashSync('password7'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Fourth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student4@user.io',
        username: 'StudentUser4',
        hashedPassword: bcrypt.hashSync('password8'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Fifth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student5@user.io',
        username: 'StudentUser5',
        hashedPassword: bcrypt.hashSync('password9'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Sixth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student6@user.io',
        username: 'StudentUser6',
        hashedPassword: bcrypt.hashSync('password10'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Seventh',
        lastName: 'Student',
        userRole: 'student',
        email: 'student7@user.io',
        username: 'StudentUser7',
        hashedPassword: bcrypt.hashSync('password11'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Eighth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student8@user.io',
        username: 'StudentUser8',
        hashedPassword: bcrypt.hashSync('password12'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Ninth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student9@user.io',
        username: 'StudentUser9',
        hashedPassword: bcrypt.hashSync('password13'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Tenth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student10@user.io',
        username: 'StudentUser10',
        hashedPassword: bcrypt.hashSync('password14'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Eleventh',
        lastName: 'Student',
        userRole: 'student',
        email: 'student11@user.io',
        username: 'StudentUser11',
        hashedPassword: bcrypt.hashSync('password15'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Twelfth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student12@user.io',
        username: 'StudentUser12',
        hashedPassword: bcrypt.hashSync('password16'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Thirteenth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student13@user.io',
        username: 'StudentUser13',
        hashedPassword: bcrypt.hashSync('password17'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Fourteenth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student14@user.io',
        username: 'StudentUser14',
        hashedPassword: bcrypt.hashSync('password18'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Fifteenth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student15@user.io',
        username: 'StudentUser15',
        hashedPassword: bcrypt.hashSync('password19'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Sixteenth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student16@user.io',
        username: 'StudentUser16',
        hashedPassword: bcrypt.hashSync('password20'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Seventeenth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student17@user.io',
        username: 'StudentUser17',
        hashedPassword: bcrypt.hashSync('password21'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Eighteenth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student18@user.io',
        username: 'StudentUser18',
        hashedPassword: bcrypt.hashSync('password22'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Ninteenth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student19@user.io',
        username: 'StudentUser19',
        hashedPassword: bcrypt.hashSync('password23'),
        profileImg: faker.image.avatar()
      },
      {
        firstName: 'Twentieth',
        lastName: 'Student',
        userRole: 'student',
        email: 'student20@user.io',
        username: 'StudentUser20',
        hashedPassword: bcrypt.hashSync('password24'),
        profileImg: faker.image.avatar()
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
