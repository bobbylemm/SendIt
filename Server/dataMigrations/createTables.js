import pg from 'pg';
import dotenv from 'dotenv';
import config from '../config/dbConfig';
// psql -U dozic -h127.0.0.1 senditdb

dotenv.config();
const pool = new pg.Pool(config.development);

const usersTable = `
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL NOT NULL PRIMARY KEY,
    username varchar(10) UNIQUE NOT NULL,
    email varchar(100) UNIQUE NOT NULL,
    password text NOT NULL,
    isadmin boolean NOT NULL,
    registeredat TIMESTAMP NOT NULL DEFAULT NOW()
);`;
const parcelsTable = `
DROP TABLE IF EXISTS parcels CASCADE;
CREATE TABLE IF NOT EXISTS parcels(
    parcel_id SERIAL NOT NULL PRIMARY KEY,
    packagename varchar(10) NOT NULL,
    pickuplocation varchar(25) NOT NULL,
    dropofflocation varchar(25) NOT NULL,
    presentlocation text NOT NULL,
    weight SMALLINT NOT NULL,
    price INTEGER NOT NULL,
    status varchar(10) NOT NULL,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    createdat TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedat TIMESTAMP NOT NULL DEFAULT NOW()
);`;

pool.query(usersTable)
    .then(res => console.log(res));
        pool.query(parcelsTable)
        .then(res => console.log(res))
    .catch(err => console.log(err))
.catch(err => console.log(err));



