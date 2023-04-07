import Joi from 'joi';
export const productSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required().min(0),
    images: Joi.array().items({
        url: Joi.string(),
        alt: Joi.string()
    }),
    description: Joi.string(),
    categories: Joi.array().items(Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/)),
    createdAt: Joi.date().default(() => new Date()),
    updatedAt: Joi.date().default(() => new Date()),
    deletedAt: Joi.date().default(null),
    deleted: Joi.boolean().default(false),
});

export const categoryProductSchema = Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().required(),
    products: Joi.array().items(
        Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/)
    )
});