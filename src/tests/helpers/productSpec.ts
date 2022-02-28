import productRoutes from '../../handlers/products';
import {Product, ProductStore} from '../../models/product'

const productStore = new ProductStore()
const productId = 1;

describe("Product Model", () => {
    it('should have an index method', () => {
        expect(productStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(productStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(productStore.create).toBeDefined();
    });

    // TODO: Issue is unable to create product becuase the relation products does not exist.
    // it('create method should create a single product', async () => {
    //     const product: Product = {
    //         name: "Banana",
    //         price: 1.00
    //     }
    
    //     const result = await productStore.create(product)
    //     expect(result).toEqual({
    //         id: productId,
    //         name: "Banana",
    //         price: 1.00
    //     })
    // });

    // TODO: Will not be solvable until create is solved.
    // it('show method should return a single product', async () => {
    //     const result = await productStore.show(productId)
    //     expect(result).toEqual({
    //         id: productId,
    //         name: "Banana",
    //         price: 1
    //     })
    // });
    
    // TODO: Will not be solvable until create is solved.
    // it('index method should return a list of products', async () => {
    //     const result = await productStore.index();
    //     expect(result).toEqual([{
    //         id: productId,
    //         name: "Banana",
    //         price: 1.00
    //     },])
    // });
});

