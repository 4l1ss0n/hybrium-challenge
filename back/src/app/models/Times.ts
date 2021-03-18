import { Model, Optional, DataTypes } from 'sequelize';
import sequelize from "../../database/connection";

export interface TimeTypes {
  id: number;
  userId: string;
  day: Date;
  timeInExpedient: String;
  timeOutExpedient: String | null;
  timeInLunch: String | null;
  timeOutLunch: String | null;
  userIsDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TimesAttributes extends Optional<TimeTypes, "id"> {}

interface TimesDefine extends Model<TimesAttributes, TimeTypes>,TimeTypes {}

const Times = sequelize.define<TimesDefine>('Times',{
  id: {
    type:  DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  day: {
    type:  DataTypes.DATE,
    defaultValue: Date.now(),
    allowNull: false
  },
  timeInExpedient: {
    type:  DataTypes.STRING,
    allowNull: false
  },
  timeOutExpedient: {
    type:  DataTypes.STRING
  },
  timeInLunch: {
    type:  DataTypes.STRING,
  },
  timeOutLunch: {
    type:  DataTypes.STRING
  },
  userIsDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type:  DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  },
})


export default Times;