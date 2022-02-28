"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const orderStore = new order_1.OrderStore();
// The reason this throws an error is because there are no records to query so it will drop to the catch block in the orderStore.
const currentOrderByUserId = async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const ordersByUserId = orderStore.currentOrderByUser(userId);
        res.status(200);
        res.json(ordersByUserId);
    }
    catch (error) {
        throw new Error(`Unable to get the order for the user id: ${userId}`);
    }
};
const index = async (req, res) => {
    try {
        const orders = await orderStore.index();
        res.status(200);
        res.json(orders);
    }
    catch (error) {
        throw new Error('An error occurred getting the orders');
    }
};
const create = async (req, res) => {
    try {
        // TODO: Code to be able to create an order as needed.
    }
    catch (error) {
        throw new Error('An error occurred while trying to create a new order.');
    }
};
// TODO: Make the schema change to include the product id and the quantity
// TODO: Troubleshoot db-migrate in order to make the schema changes.
// - id of each product in the order (product_id)
// - quantity of each product in the order (quantity)
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const tokenSecret = process.env.TOKEN_SECRET;
        if (authorizationHeader !== undefined && tokenSecret !== undefined) {
            const token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, tokenSecret);
            next();
        }
    }
    catch (error) {
        res.status(401);
        throw new jsonwebtoken_1.JsonWebTokenError(`Invalid token or token has expired.`);
    }
};
const orderRoutes = (app) => {
    // TODO: Needs to have the verify auth token in the route.
    app.get('/orders/:userId', currentOrderByUserId);
    app.get('/orders', index);
    app.post('/orders', create);
};
exports.default = orderRoutes;
