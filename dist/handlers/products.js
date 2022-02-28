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
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const product_1 = require("../models/product");
const productStore = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await productStore.index();
        res.status(200);
        res.json(products);
    }
    catch (error) {
        throw new Error(`Unable to get productsss.`);
    }
};
const show = async (req, res) => {
    const productId = parseInt(req.params.id);
    try {
        const product = await productStore.show(productId);
        res.status(200);
        res.json(product);
    }
    catch (error) {
        throw new Error(`Unable to get the requested product ${productId} does not exist.`);
    }
};
const create = async (req, res) => {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    try {
        const newProduct = await productStore.create(product);
        res.status(201);
        res.json(newProduct);
    }
    catch (error) {
        throw new Error(`Unable to create the product: ${product.name}`);
    }
};
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
const productRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', verifyAuthToken, create);
};
exports.default = productRoutes;
