import Joi from '@hapi/joi';

export const idSchema = Joi.object().keys({
  id: Joi.string().uuid().trim(),
});

export const nid = Joi.object().keys({
  id: Joi.string().trim().required(),
});
