const {pgClient} = require('../../config/postgres');

module.exports.getUnwatchedInstruments = async userId => {
    return (await pgClient.query(
        `select instrumentid as id, name, symbol, instrumenttype  as type 
        from instrument 
        where instrumentid not in (select instrument_id from user_instruments where user_id = $1)`,
        [userId])).rows;
};
