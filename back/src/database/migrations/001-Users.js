
module.exports = {
  async up(queryRunner, sequelize) {
    queryRunner.createTable('Users', {
      id: {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: sequelize.STRING,
        allowNull: false
      },
      email: {
        type: sequelize.STRING,
        allowNull: false
      },
      passwordHash: {
        type: sequelize.STRING,
        allowNull: false
      },
      tellNumber: {
        type: sequelize.INTEGER,
        allowNull: false
      },
      cpf: {
        type: sequelize.INTEGER,
        allowNull: false
      },
      ocupation: {
        type: sequelize.STRING,
        allowNull: false
      },
    
      defaultTimeInExpedient: {
        type: sequelize.STRING,
        allowNull: false
      },
      defaultTimeInLunch:{
        type: sequelize.STRING,
        allowNull: false
      },
      defaultTimeOutExpedient: {
        type: sequelize.STRING,
        allowNull: false
      },
      defaultTimeOutLunch:{
        type: sequelize.STRING,
        allowNull: false
      },
      
      isDeleted: {
        type: sequelize.BOOLEAN,
        defaultValue: false
      },
      photo: {
        type: sequelize.STRING,
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
    return queryRunner.dropTable('Users');
  }
}