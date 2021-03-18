
module.exports = {
  async up(queryRunner, sequelize) {
    queryRunner.createTable('Times', {
      id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: sequelize.STRING,
        allowNull: false,
      },
      userIsDeleted: {
        type: sequelize.BOOLEAN,
        defaultValue: false,
      },
      timeInExpedient: {
        type: sequelize.STRING,
        allowNull: false,
      },
      timeOutExpedient: {
        type: sequelize.STRING,
      },
      timeInLunch: {
        type: sequelize.STRING,
      },
      timeOutLunch: {
        type: sequelize.STRING,
      },
      day: {
        type: sequelize.DATE,
        defaultValue: Date.now()
      },
      createdAt: {
        type: sequelize.DATE
      },
      updatedAt: {
        type: sequelize.DATE
      }
    })
  },
  async down(queryRunner, sequelize) {
    return queryRunner.dropTable('Times');
  }
}