"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserStore {
    /** Displays all of the users in the database from the users table. */
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT id, firstname, lastname FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Unable to get users: ${error}`);
        }
    }
    /** Displays the user record by a given userId */
    async show(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = `SELECT id, firstname, lastname FROM users WHERE id=(${userId});`;
            const result = await conn.query(sql);
            const user = result.rows[0];
            console.log(user);
            conn.release();
            return user;
        }
        catch (error) {
            throw new Error(`Unable to find a user with the id: ${userId}. Error: ${error}`);
        }
    }
    /** Creates a new user into the users table of the database. */
    async create(firstName, lastName, password) {
        try {
            const saltRounds = process.env.SALT_ROUNDS;
            const pepper = process.env.BCRYPT_PASSWORD;
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES ($1, $2, $3) RETURNING *';
            const hash = bcrypt_1.default.hashSync(password + pepper, parseInt(saltRounds));
            const result = await conn.query(sql, [firstName, lastName, hash]);
            const user = result.rows[0];
            const newUser = {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname
            };
            conn.release();
            return newUser;
        }
        catch (error) {
            throw new Error(`Unable to create the user: ${firstName} ${lastName}. Error: ${error}`);
        }
    }
    /** authenticates a user based on username and password provided. */
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT password FROM users WHERE username=($1)';
        const pepper = process.env.BCRYPT_PASSWORD;
        const result = await conn.query(sql, [username]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                return user;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
