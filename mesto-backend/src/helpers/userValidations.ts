import { celebrate, Joi } from 'celebrate';

export const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri().pattern(/^https?:\/\//),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

export const getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});

export const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(200),
  }),
});

export const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri().pattern(/^https?:\/\//),
  }),
});
