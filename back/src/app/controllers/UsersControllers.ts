import {Request as Req, Response as Res} from 'express';
import crypto from 'crypto';
import Users, { UserTypes } from '../models/Users';
import Times from '../models/Times';
import sendEmail from '../../email/config';
import CreateToken from '../auth/CreateToken';
import { viewSingleUsersDetails } from '../view/UsersDetails';
import { viewManyUserList } from '../view/UsersList';
import sequelize from '../../database/connection';
import {v2 as cloudinary} from 'cloudinary';


export default class UserControllers {
  async Index(req: Req, res: Res): Promise<Res> {
    const data: any = await Users.findAll({
      where: {
        isDeleted: false
      },
    });
    if (!data) return res.json([]);
    return res.json(viewManyUserList(data));
  };

  async Store(req: Req, res: Res): Promise<Res> {
    const {
      name,
      cpf,
      email,
      photo,
      number,
      ocupation,
      defaultTimeInExpedient,
      defaultTimeInLunch,
      defaultTimeOutExpedient,
      defaultTimeOutLunch
    } = req.body;
    try {
      if (!(name && email && cpf && number
        && defaultTimeInExpedient && defaultTimeInLunch
        && defaultTimeOutExpedient && defaultTimeOutLunch
      )) return res.status(406).json({err: 'Missing datas'});

      const alrealyExist = await Users.findOne({ where: { email }});
      if (alrealyExist) return res.status(405).json({err: 'email alrealy registered'});
      
      const password ='#' + crypto.randomBytes(5).toString('hex');
      const passwordHash = crypto.createHash('md5').update(`${name}${password}`).digest('base64');

      var photoUrl = '';
      if (photo) {
        await cloudinary.uploader.upload(photo, {
          folder: 'hybrium'
        }, function(err, result) {
          if (!result) return;
          
          photoUrl = result.url
          return;
        });
      }

      const user = await Users.create({
        name,
        cpf,
        email,
        photo: photoUrl,
        tellNumber: number,
        passwordHash,
        ocupation,
        defaultTimeInExpedient,
        defaultTimeInLunch,
        defaultTimeOutExpedient,
        defaultTimeOutLunch
      } as UserTypes);

      await sendEmail({name, password, email});
      return res.status(201).json({
        created: true,
        token: CreateToken({id:user.id}),
        id:user.id
      });
    } catch (err) {
      return res.status(500).json({oops: err.message});
    }
    
  };

  async Show(req: Req, res: Res): Promise<Res> {
    const {id} = req.query;

    try {
      const user = await Users.findOne({ where: { id, isDeleted: false }});
      if (!user) return res.status(404).json({err: 'user not found'});
      
      const times = await Times.findAll({ where: { userId: id, userIsDeleted: false }});

      return res.json(viewSingleUsersDetails({user, times}));
    } catch (err) {
      return res.status(500).json({oops: err.message});
    };
  };

  async Delete(req: Req, res: Res): Promise<Res> {
    const {id} = req.params;
    try {
      const trx = await sequelize.transaction();
      if (!id) return res.status(401).json({err: 'id not passed on'});

      const user = await Users.findOne({ where: { id } });
      if (!user) return res.status(404).json({ err: 'user not found' });

      await Users.update({
        isDeleted: true,
      }, {
        where: {
          id
        },
        transaction: trx
      });
      await Times.update({
        userIsDeleted: true
      }, {
        where: {
          userId: id,
        },
        transaction: trx
      });

      await trx.commit();
      return res.status(200).json({ deleted: true });
    } catch (err) {
      return res.status(500).json({oops: err.message});      
    };
  };

  async Update(req: Req, res: Res): Promise<Res> {
    const {
      ocupation,
      defaultTimeInExpedient,
      defaultTimeInLunch,
      defaultTimeOutExpedient,
      defaultTimeOutLunch,
      tellNumber
    } = req.body;
    const {id} = req.params;

    try {
      if (!(
        ocupation
        || defaultTimeInExpedient
        || defaultTimeInLunch
        || defaultTimeOutExpedient
        || defaultTimeOutLunch
        || tellNumber
      )) return res.status(406).json({err: 'missing datas'});

      const user = await Users.findOne({
        where: {
          id,
          isDeleted: false
        }
      });
      if (!user) return res.status(404).json({err: 'user not found'});

      await Users.update({
        ocupation: ocupation? ocupation: user.ocupation,
        defaultTimeInExpedient: defaultTimeInExpedient? defaultTimeInExpedient: user.defaultTimeInExpedient,
        defaultTimeInLunch: defaultTimeInLunch? defaultTimeInLunch: user.defaultTimeInLunch,
        defaultTimeOutExpedient: defaultTimeOutExpedient? defaultTimeOutExpedient: user.defaultTimeOutExpedient,
        defaultTimeOutLunch: defaultTimeOutLunch? defaultTimeOutLunch: user.defaultTimeOutLunch,
        tellNumber: tellNumber? tellNumber: user.tellNumber
      },{
        where: {
          id
        }
      })
      return res.json({updated: true});
    } catch (err) {
      return res.status(500).json({oops: err.message});
    }
  };

  async Login(req: Req, res: Res): Promise<Res> {
    const creadentials = req.headers.authorization;

    try {
      if (!creadentials) return res.status(406).json({err: 'Missing data'});
      const [basic, datas] = creadentials.split(' ');
      const [email, password] = Buffer.from(datas, 'base64').toString().split(':');

      const user = await Users.findOne({ where: { email } });

      if (!user) return res.status(404).json({err : 'user not found with this email'});

      const passwordHash = crypto.createHash('md5').update(`${user.name}${password}`).digest('base64');

      if (passwordHash !== user.passwordHash) return res.status(401).json({err : 'invalid password'});

      return res.status(200).json({
        token: CreateToken({id:user.id}),
        id: user.id
      });
    } catch (err) {
      return res.status(500).json({oops: err.message});
    };
  };
}