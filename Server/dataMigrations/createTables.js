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
    username varchar(25) UNIQUE NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    password text NOT NULL,
    isadmin boolean NOT NULL,
    registeredat TIMESTAMP NOT NULL DEFAULT NOW()
);`;
const parcelsTable = `
DROP TABLE IF EXISTS parcels CASCADE;
CREATE TABLE IF NOT EXISTS parcels(
    parcel_id SERIAL NOT NULL PRIMARY KEY,
    packagename varchar(25) NOT NULL,
    pickuplocation varchar(25) NOT NULL,
    dropofflocation varchar(25) NOT NULL,
    presentlocation text NOT NULL,
    weight SMALLINT NOT NULL,
    price INTEGER NOT NULL,
    status varchar(25) NOT NULL,
    cancelled boolean NOT NULL,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    createdat TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat TIMESTAMP NOT NULL DEFAULT NOW()
);`;

pool.query(usersTable)
    .then(res => res);
        pool.query(parcelsTable)
        .then(res => res)
    .catch(err => err)
.catch(err => err);



