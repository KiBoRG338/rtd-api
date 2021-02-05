import { Request, Response } from 'express';
import { IPagination } from './pagination.middleware';
import { IUserPayload } from '../auth/interfaces/auth.interface';
import { responseEntity, responseList, responseException } from './responses.middleware';

export interface CustomRequest extends Request {
    pagination: IPagination;
    user: IUserPayload;
}

export interface CustomResponse extends Response {
    responseEntity: typeof responseEntity;
    responseList: typeof responseList;
    responseException: typeof responseException;
}