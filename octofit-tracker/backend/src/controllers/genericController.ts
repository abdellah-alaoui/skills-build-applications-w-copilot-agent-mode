import { Request, Response } from 'express';
import * as models from '../models';

export const list = (modelName: keyof typeof models) => async (_req: Request, res: Response) => {
  try {
    // @ts-ignore
    const docs = await models[modelName].find().exec();
    res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
