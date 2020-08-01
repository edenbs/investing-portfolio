const createError = require('http-errors');
const instrumentsRoute = require('../../api/instruments');
const watchlistRoute = require('../../api/watchlist');

module.exports = app => {
    app.use('/api/instruments', instrumentsRoute);
    app.use('/api/watchlist', watchlistRoute);

    app.use((req, res, next) => {
        next(createError(404, 'API doesn\'t exists'));
    })
};