"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const userStore = new user_1.UserStore();
// Iterate userId on every run.
const userId = 1;
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
    // TODO: Issue is unable to create the user the relation users does not exist.
    // it('create method should create a brand new user', async () => {
    //     const user: User = {
    //         firstname: "Brian",
    //         lastname: "Andreasen",
    //         password: "12345678"
    //     };
    //     const result = await userStore.create(user.firstname, user.lastname, user.password!)
    //     expect(result).toEqual({
    //         id: userId,
    //         firstname: "Brian",
    //         lastname: "Andreasen",
    //     });
    // });
    // Truncate users table every time in postgres otherwise a new object wil need to be added every time in the array.
    // TODO: Will not be solvable until create is solved.
    // it('index method should return a list of users', async () => {
    //     const result = await userStore.index()
    //     expect(result).toEqual([{
    //         id: userId,
    //         firstname: "Brian",
    //         lastname: "Andreasen",
    //     },]) 
    // });
    // TODO: Will not be solvable until create is solved.
    // it('show method should return a single user by user id', async () => {
    //     const result = await userStore.show(userId)
    //     expect(result).toEqual({
    //         id: userId,
    //         firstname: "Brian",
    //         lastname: "Andreasen",
    //     })
    // });
});
