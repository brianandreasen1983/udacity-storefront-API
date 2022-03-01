import express, { NextFunction, request, Request, Response } from 'express'
import { Order, OrderStore} from '../models/order'
import jwt, {JsonWebTokenError} from 'jsonwebtoken'

const orderStore = new OrderStore()

const currentOrderByUserId = async(req: Request, res: Response) => {
    const userId: number = parseInt(req.params.userId)

    try {
        const ordersByUserId = orderStore.currentOrderByUser(userId)
        res.status(200)
        res.json(ordersByUserId)
    } catch (error) {
        throw new Error(`Unable to get the order for the user id: ${userId}`)
    }
}

const index = async(req: Request, res: Response) => {
    try {
        const orders = await orderStore.index()
        res.status(200)
        res.json(orders)
    } catch (error) {
        throw new Error('An error occurred getting the orders')
    }
}

const create = async(req: Request, res: Response) => {
    try {
        const productId: number = req.body.productId;
        const userId: number = req.body.userId;
        const quantity = req.body.quantity;
        const orderStatus = req.body.orderStatus;

        const order = await orderStore.create(productId, userId, quantity, orderStatus);
        res.status(200)
        res.json(order)
    } catch (error) {
        throw new Error('An error occurred while trying to create a new order.')
    }
}

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization
        const tokenSecret = process.env.TOKEN_SECRET;

        if(authorizationHeader !== undefined && tokenSecret !== undefined) {
            const token = authorizationHeader.split(' ')[1]
            jwt.verify(token, tokenSecret);
            next()
        }
    } catch (error) {
        res.status(401)
        throw new JsonWebTokenError(`Invalid token or token has expired.`)
    }
}

const orderRoutes = (app: express.Application) => {
    app.get('/orders/:userId', currentOrderByUserId, verifyAuthToken)
    app.get('/orders', index)
    app.post('/orders', create)
}

export default orderRoutes
