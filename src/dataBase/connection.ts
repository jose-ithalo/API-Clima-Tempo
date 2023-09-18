/* eslint-disable prettier/prettier */

import connection from 'knex';
export const knex = connection({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'postgres',
        database: 'clima_arbitralis'
    }
});