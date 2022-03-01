import { Order, OrderStore} from '../../models/order'

const orderStore = new OrderStore();

describe("Order Model", () => {
    it('should have a get current user order method', () => {
        expect(orderStore.currentOrderByUser).toBeDefined();
    });

    it('should have a index method to get a list of orders', () => {
        expect(orderStore.index).toBeDefined();
    });

    it('should have a create method to create an order', () => {
        expect(orderStore.create).toBeDefined();
    });


    it('creates an order', async () => {
        const order: Order = {
            product_id: 1,
            user_id: 1,
            quantity: 1,
            order_status: 'active'
        }

        const result = await orderStore.create(order.product_id, order.user_id, order.quantity, order.order_status)
        expect(result).toEqual({
            id: 1,
            product_id: 1,
            user_id: 1,
            quantity: 1,
            order_status: 'active'
        });
    })

    it('list all of the orders in the database.', async () => {
        const result = await orderStore.index()
        expect(result).toEqual([{
            id: 1, 
            product_id: 1,
            user_id: 1,
            quantity: 1,
            order_status: 'active'
        }])
    })

    it('gets the current order by the user id', async () => {
        const result = await orderStore.currentOrderByUser(1)
        expect(result).toEqual({
            id: 1,
            quantity: 1,
            product_id: 1,
            user_id: 1,
            order_status: 'active'
        });
    });
});

