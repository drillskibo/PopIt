const Joi = require('@hapi/joi');

const schema = Joi.object({
  message: Joi.string().max(300).required(),
});

module.exports = schema;
