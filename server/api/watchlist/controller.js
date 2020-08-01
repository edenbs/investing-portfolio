const dal = require('./dal');

const CURR_USER_ID = 1;

module.exports.index = () => {
    return dal.getUserInstruments(CURR_USER_ID);
};

module.exports.create = async req => {
    await dal.addUserInstrument(CURR_USER_ID, req.body.instrumentId);
};

module.exports.remove = async req => {
    await dal.removeUserInstrument(CURR_USER_ID, req.params.instrumentId);
};
