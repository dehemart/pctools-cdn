import z from 'zod';
import i18next from 'i18next';
import { zodI18nMap } from 'zod-i18n-map';
import translation from 'zod-i18n-map/locales/pt/zod.json';

import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '@logger/logger';
import { Console } from 'console';

type TFieldValidation = 'body' | 'header' | 'params' | 'query';
type TSchemas = Record<TFieldValidation, z.AnyZodObject>;
type TValidation = (schemas: Partial<TSchemas>) => RequestHandler;

export class Validator {

  constructor() {
    i18next.init({
      lng: 'pt',
      resources: {
        pt: { zod: translation },
      },
    });
    z.setErrorMap(zodI18nMap);
  }

  validation: TValidation = (schemas) => async (req, res, next) => {
    let error = false;

    const errorsResult: Record<Partial<TFieldValidation>, z.ZodIssue[]> = {
      body: [],
      header: [],
      params: [],
      query: []
    };
    Object.entries(schemas).forEach(([key, schema]) => {
      try {
        schema.parse(req[key as TFieldValidation]);
      } catch (err) {
        if (err instanceof z.ZodError) {
          errorsResult[key as TFieldValidation] = err.issues;
          error = true;
        }
      }
    });

    if (error) {
      logger.error({ error: error });
      return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
    } else {
      return next();
    }
  };
}