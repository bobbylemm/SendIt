import pg from 'pg';
import dotenv from 'dotenv';
import config from '../config/dbConfig';

dotenv.config();
let configString = '';
if(process.env.NODE_ENV.trim() === 'production') {
    configString = config.production;
} else if (process.env.NODE_ENV.trim() === 'development') {
    configString = config.development;
}else {
    configString = config.test;
}
const pool = new pg.Pool(configString);

const usersTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL NOT NULL PRIMARY KEY,
    user_name varchar(25) UNIQUE NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    password text NOT NULL,
    is_admin boolean NOT NULL,
    registered_at TIMESTAMP NOT NULL DEFAULT NOW()
);`;
const parcelsTable = `
DROP TABLE IF EXISTS parcels CASCADE;
CREATE TABLE IF NOT EXISTS parcels(
    parcel_id SERIAL NOT NULL PRIMARY KEY,
    package_name varchar(25) NOT NULL,
    pickup_location varchar(25) NOT NULL,
    dropoff_location varchar(25) NOT NULL,
    present_location text NOT NULL,
    quantity SMALLINT NOT NULL,
    weight SMALLINT NOT NULL,
    price INTEGER NOT NULL,
    status varchar(25) NOT NULL,
    cancelled boolean NOT NULL,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);`;

pool.query(usersTable)
    .then(res => res);
        pool.query(parcelsTable)
        .then(res => res)
    .catch(err => err)
.catch(err => err);



