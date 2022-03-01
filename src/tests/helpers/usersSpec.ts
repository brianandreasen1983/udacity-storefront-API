import { User, UserStore} from '../../models/user'

const userStore = new UserStore()

describe("User Model", () => {
    it('should have an index method', () => {
        expect(userStore.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(userStore.show).toBeDefined();
    });

    it('should have a create method', () => {
        expect(userStore.create).toBeDefined();
    });

    it('create method should create a brand new user', async () => {
        const user: User = {
            firstname: "Brian",
            lastname: "Andreasen",
            password: "12345678"
        };
    
        const result = await userStore.create(user.firstname, user.lastname, user.password!)
        expect(result).toEqual({
            id: 1,
            firstname: "Brian",
            lastname: "Andreasen",
        });
    });
    
    it('index method should return a list of users', async () => {
        const result = await userStore.index()
        expect(result).toEqual([{
            id: 1,
            firstname: "Brian",
            lastname: "Andreasen",
        },]) 
    });
    
    it('show method should return a single user by user id', async () => {
        const result = await userStore.show(1)
        expect(result).toEqual({
            id: 1,
            firstname: "Brian",
            lastname: "Andreasen",
        })
    });
});