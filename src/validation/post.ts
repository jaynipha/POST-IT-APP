import Joi from 'joi';


export const createPostSchema = {
  userId: Joi.string().trim().required(),
  Text: Joi.string().trim().required(),
  //: Joi.number().required()
};

export const postSchema = {
    name: Joi.string().trim().required()
  };