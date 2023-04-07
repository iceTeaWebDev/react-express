import Joi from 'joi';
export const categorySchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    products: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
})