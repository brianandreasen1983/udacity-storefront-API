"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    /** Retreives the current order by the user's Id */
    async currentOrderByUser(userId) {
        console.log('CURRENT ORDER BY USER: ', userId);
        try {
            const sql = `SELECT id, product_id, user_id, quantity, order_status FROM orders WHERE user_id = ${userId};`;
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [userId]);
            const currentOrder = result.rows[0];
            conn.release();
            return currentOrder;
        }
        catch (error) {
            // TODO: We need to return an error back tot he client itself...
            throw new Error(`Could not get orders for the userId of: ${userId}.`);
        }
    }
    /** Retrieves all of the orders from the database. */
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT id, product_id, user_id, quantity, order_status FROM orders;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Unable to get orders: ${error}`);
        }
    }
    // TODO: Test the insert statement to create a new order
    async create() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT STATEMENT FOR AN ORDER GOES HERE';
            const result = await conn.query(sql);
            conn.release();
            const order = result.rows[0];
            return order;
        }
        catch (error) {
            throw new Error('Unable to create a new order.');
        }
    }
}
exports.OrderStore = OrderStore;
