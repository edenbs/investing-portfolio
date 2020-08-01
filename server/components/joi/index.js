const createError = require('http-errors');

module.exports = (schema, type) => async req => {
  if (!schema) {
    throw new Error('Didn\'t provide Joi-middleware with a schema to verify');
  }

  type = type ? type.toLowerCase() : type;

  if (!type || !['body', 'query', 'params'].includes(type)) {
    throw new Error('Didn\'t provide Joi-middleware with the type to verify in the request. Type must be \'body\', \'query\' or \'params\'');
  }

  try {
    req[type] = await schema.validateAsync(req[type]);
  } catch (err) {
    throw createError(400, err);
  }
};
