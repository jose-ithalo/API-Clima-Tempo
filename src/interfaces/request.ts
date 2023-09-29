/* eslint-disable prettier/prettier */
import { Request } from 'express';
import IUser from './user';

export default interface RequestWithUserRole extends Request {
    user?: Omit<IUser, 'password'>
}