import {Request as Req, Response as Res} from 'express';
import Times, {TimeTypes} from '../models/Times';
import Users from '../models/Users';

export default class TimesControllers {
  async Store(req: Req, res: Res): Promise<Res> {
    const userId = req.headers.authorization;
    const {timeValue} = req.body;

    try {
      const user = await Users.findOne({ where: { id: userId, isDeleted: false } });
      if (!user) return res.status(404).json({err: 'user not found'});

      const time = await Times.create({
        userId,
        timeInExpedient: timeValue
      } as TimeTypes);
      
      return res.json({created: true});
    } catch (err) {
      return res.status(500).json({ops: err.message});
    };
  };

  async Update(req: Req, res: Res): Promise<Res> {
    const userId = req.headers.authorization;
    const {timeId, timeValue} = req.body;

    try {
      if (!(userId && timeId)) return res.status(204).json({err: 'missing datas'});
      const user = await Users.findOne({ where: { id: userId, isDeleted: false } });
      if (!user) return res.status(404).json({err: 'user not found'});

      const time = await Times.findOne({ where: { userId: userId, id: timeId } });
      if (!time) return res.status(404).json({err: 'time not found'})

      if(time.timeOutExpedient) return res.status(401).json({err: 'Time not modify'});


      if (!(time.timeInLunch)){
        await Times.update(
          { 
            timeInLunch: timeValue,
          },
          {
            where: {
              userId: userId,
              id: timeId
            }
          }
        );
        return res.json({updated: true});
      }
      if (!(time.timeOutLunch)){
        await Times.update(
          { 
            timeOutLunch: timeValue,
          },
          {
            where: {
              userId: userId,
              id: timeId
            }
          }
        );
        return res.json({updated: true});
      }
      await Times.update(
        {
          timeOutExpedient: timeValue
        },
        {
          where: {
            userId: userId,
            id: timeId
          }
        }
      );

      return res.json({updated: true});
    } catch (err) {      
      return res.status(500).json({oops: err.message});
    };
  };
}