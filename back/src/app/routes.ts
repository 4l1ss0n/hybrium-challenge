import {Router} from 'express';
import AdminControllers from './controllers/AdminControllers';
import TimesControllers from './controllers/TimesControllers';
import UserControllers from './controllers/UsersControllers';
import TokenAuth from './middlewares/TokenAuth';

const routes = Router();

const User = new UserControllers;
const Times = new TimesControllers;
const Admin = new AdminControllers;

routes.get('/user', User.Index);
routes.post('/user', User.Store);
routes.get('/user/details', User.Show);
routes.put('/user/update/:id', User.Update);
routes.delete('/user/:id', User.Delete);
routes.get('/login', User.Login);

routes.get('/admin/login', Admin.Login);

routes.post('/times/create', TokenAuth, Times.Store);
routes.post('/times/update', TokenAuth, Times.Update);


export default routes;