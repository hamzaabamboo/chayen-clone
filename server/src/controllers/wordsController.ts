import { NextFunction, Request, Response, Router } from 'express';
import config from '../config/config';
import { words } from '../game/words';
import * as HttpStatus from 'http-status-codes';

const { errors } = config;
const wordsRouter: Router = Router();

wordsRouter.route('/').get((req, res) => res.send('Hi there !'));

wordsRouter.get('/banks', (req, res) => {
  res.status(HttpStatus.OK).json(Object.keys(words));
  return;
});

export default wordsRouter;
