import Client from '../database';

export type Order = {
    id?: number
    product_id: number
    user_id: number
    quantity: number
    order_status: string
}

export class OrderStore {
    /** Retreives the current order by the user's Id */
    async currentOrderByUser(userId: number): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT id, product_id, user_id, quantity, order_status FROM orders WHERE user_id=(${userId});`
            const result = await conn.query(sql)
            const currentOrder = result.rows[0]
            conn.release()
            return currentOrder
        } catch (error) {
            throw new Error(`Could not get orders for the userId of: ${userId}. Error: ${error}`)
        }
    }

    /** Retrieves all of the orders from the database. */
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT id, product_id, user_id, quantity, order_status FROM orders;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (error) {
            throw new Error(`Unable to get orders: ${error}`)
        }
    }

    // TODO: Test the insert statement to create a new order
    async create(product_id: number, user_id: number, quantity: number, order_status: string): Promise<Order> {
        try { 
            console.log(product_id);
            console.log(user_id);
            console.log(quantity);
            console.log(order_status);

            const conn = await Client.connect()
            const sql = 'INSERT INTO orders (product_id, user_id, quantity, order_status) VALUES ($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [product_id, user_id, quantity, order_status])
            const order = result.rows[0]

            console.log(order)
            
            const newOrder = {
                id: order.id,
                product_id: order.product_id,
                user_id: order.user_id,
                quantity: order.quantity,
                order_status: order.order_status
            }

            conn.release()
            console.log(newOrder)
            return newOrder
        } catch(error) {
            throw new Error(`Unable to create a new order. ${error}`)
        }
    }
}

