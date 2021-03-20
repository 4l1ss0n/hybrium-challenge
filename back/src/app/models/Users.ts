import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from "../../database/connection";
import Times from './Times';

export interface UserTypes {
  id?: string;

  name: string;
  email: string;
  passwordHash?: string;

  photo?: string;
  tellNumber: number;
  cpf: number;
  ocupation: string;

  defaultTimeInExpedient: string;
  defaultTimeInLunch:string;
  defaultTimeOutExpedient: string;
  defaultTimeOutLunch:string;

  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

interface UserAttibutes extends Optional<UserTypes, "id"> {};

export interface UsersDefine extends Model<UserTypes, UserAttibutes>, UserTypes {};

const Users = sequelize.define<UsersDefine>('Users',{
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  name: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: new DataTypes.STRING,
    allowNull: false
  },

  passwordHash: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  tellNumber: {
    type: new DataTypes.INTEGER,
    allowNull: false
  },
  cpf: {
    type: new DataTypes.INTEGER,
    allowNull: false
  },
  photo: {
    type: new DataTypes.STRING,
  },
  ocupation: {
    type: new DataTypes.STRING,
    allowNull: false
  },

  defaultTimeInExpedient: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  defaultTimeInLunch:{
    type: new DataTypes.STRING,
    allowNull: false
  },
  defaultTimeOutExpedient: {
    type: new DataTypes.STRING,
    allowNull: false
  },
  defaultTimeOutLunch:{
    type: new DataTypes.STRING,
    allowNull: false
  },

  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: new DataTypes.DATE
  },
  updatedAt: {
    type: new DataTypes.DATE
  }
});

Users.hasMany(Times, {
  sourceKey: 'id',
  foreignKey: 'userId',
  as: 'Times'
});

export default Users;