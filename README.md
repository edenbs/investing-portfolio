Hey!\
This is my portfolio watchlist app! This app could, one day, help users track instruments. Right now it can help A user, named Eden track her instruments.
In order to get it going you need to:

* Have postgres running on your machine:
    * In case you have Docker running on your machine you can run \
    `docker-compose up` from within the project's directory
* Execute the following SQL
```sql
create table users(
	id serial primary key,
	name varchar(50)
);

insert into users (name) values
('EdenBens')

CREATE TABLE instrument(
 instrumentId INTEGER NOT NULL PRIMARY KEY
 ,name VARCHAR(41) NOT NULL
 ,symbol VARCHAR(7) NOT NULL
 ,instrumentType VARCHAR(9) NOT NULL
);

INSERT INTO instrument(instrumentId,name,symbol,instrumentType) VALUES
(1,'Euro US Dollar','EUR/USD','currency'),
(10,'Euro Swiss Franc','EUR/CHF','currency'),
(9,'Euro Japanese Yen','EUR/JPY','currency'),
(956731,'Investing.com Euro Index','inveur','indice'),
(2124,'US Dollar Euro','USD/EUR','currency'),
(976573,'Sygnia Itrix Euro Stoxx 50 ETF','SYGEUJ','etf'),
(997393,'NewWave EUR Currency Exchange Traded Note','NEWEURJ','etf'),
(998227,'Diesel European Gasoil Futures','DSEL1c1','commodity'),
(175,'Euro Stoxx 50','STOXX50','indice'),
(15978,'Euronet Worldwide Inc','EEFT','equities'),
(6,'Euro British Pound','EUR/GBP','currency'),
(15,'Euro Australian Dollar','EUR/AUD','currency'),
(16,'Euro Canadian Dollar','EUR/CAD','currency'),
(52,'Euro New Zealand Dollar','EUR/NZD','currency'),
(1487,'Australian Dollar Euro','AUD/EUR','currency'),
(1525,'Canadian Dollar Euro','CAD/EUR','currency');

create table user_instruments(
	id serial primary key ,
	user_id int not null references users(id),
	instrument_id int not null references instrument(instrumentid),
	constraint user_instrument_unique unique (user_id,instrument_id)
)

INSERT INTO user_instruments (user_id,instrument_id) VALUES
(1, 9),
(1, 10),
(1, 175) 

```
* Copy paste the `.env.sample` file in the project and rename the copy as `.env`. It contains the project's environment variables.
* Run `npm install`
* Run in two different terminals `npm run dev-server` and `npm run dev-client`
* Your browser should open automatically on port 8080