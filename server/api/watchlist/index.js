const {AsyncRouter} = require('express-async-router');
const Joi = require('@hapi/joi');
const joiVerify = require('../../components/joi');
const controller = require('./controller');

const joiInstrumentId = Joi.object({
    instrumentId: Joi.number().min(1).required()
});

const router = new AsyncRouter();

router.get('/', controller.index);
router.post('/', joiVerify(joiInstrumentId, 'body'), controller.create);
router.delete('/:instrumentId', joiVerify(joiInstrumentId, 'params'), controller.remove);

module.exports = router;