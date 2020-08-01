const dal = require('./dal');

// Remove and replace uses with req.user.id after implementing auth logic
const CURR_USER_ID = 1;

module.exports.getUnwatchedInstruments = () => {
    return dal.getUnwatchedInstruments(CURR_USER_ID);
};