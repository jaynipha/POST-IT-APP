import Joi from 'joi';


export const signupSchema = {
  userId: Joi.string().trim().required(),
  text: Joi.string().trim().required().max(100),
};

