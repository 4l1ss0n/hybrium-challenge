import {Request as Req, Response as Res} from 'express';
import CreateToken from '../auth/CreateToken';


export default class AdminControllers {
  async Login(req: Req, res: Res): Promise<Res> {
    const creadentials = req.headers.authorization;
    const {adminEmail, adminPassword, id} = {adminEmail: 'admin@admin.com', adminPassword: 'admin1234', id: '1565a23d3e454fa323c65f0df873f'};
    try {
      if (!creadentials) return res.status(406).json({err: 'Missing data'})
      const [basic, datas] = creadentials.split(' ');
      const [email, password] = Buffer.from(datas, 'base64').toString().split(':');
      if (email !== adminEmail) return res.status(404).json({err : 'user not found with this email'});
      if (password !== adminPassword) return res.status(401).json({err : 'invalid password'});
      return res.status(200).json({
        token: CreateToken({id}),
        id
      });
    } catch (err) {
      return res.status(500).json({oops: err.message})
    }

  }
}