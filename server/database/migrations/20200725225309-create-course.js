module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Courses', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    duration: {
      type: Sequelize.STRING
    },
    level: {
      type: Sequelize.STRING
    },
    extLink: {
      type: Sequelize.STRING
    },
    value: {
      type: Sequelize.STRING
    },
    cost: {
      type: Sequelize.BIGINT
    },
    learnMore: {
      type: Sequelize.STRING
    },
    thumbnail: {
      type: Sequelize.STRING
    },
    trainerId: {
      type: Sequelize.UUID
    },
    totalClasses: {
      type: Sequelize.INTEGER
    },
    totalStudents: {
      type: Sequelize.INTEGER
    },
    coupon: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Courses')
};
