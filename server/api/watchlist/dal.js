const {pgClient} = require('../../config/postgres');
const createError = require('http-errors');

module.exports.getUserInstruments = async userId => {
    return (await pgClient.query(
        `select instrument.instrumentid as id, instrument.name, instrument.symbol, instrument.instrumenttype  as type  
        from user_instruments 
        inner join instrument on user_instruments.instrument_id = instrument.instrumentid 
        where user_id = $1`,
        [userId])).rows;
};

module.exports.addUserInstrument = async (userId, instrumentId) => {
    try {
        await pgClient.query(
            `insert into user_instruments (user_id,instrument_id) values ($1, $2)`,
            [userId, instrumentId]
        )
    } catch (err) {
        if (err.constraint === 'user_instrument_unique') {
            throw createError(400, 'Instrument already on watchlist for this user');
        }

        throw err;
    }
};

module.exports.removeUserInstrument = (userId, instrumentId) => {
    return pgClient.query(
        `delete from user_instruments where user_id = $1 and instrument_id = $2`,
        [userId, instrumentId]
    )
};