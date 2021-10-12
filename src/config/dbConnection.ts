import { ConnectionOptions } from "typeorm";

const dbConnection : ConnectionOptions ={
         
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "",
    "database": "ehinga",
    "synchronize": true,
    "logging": false,
    "entities": ["src/entity/**/*.ts" ],
    "migrations": [ "src/migration/**/*.ts"],
    "subscribers": [ "src/subscriber/**/*.ts"],
    "cli": {
       "entitiesDir": "src/entity",
       "migrationsDir": "src/migration",
       "subscribersDir": "src/subscriber"
    }
}

export default dbConnection;