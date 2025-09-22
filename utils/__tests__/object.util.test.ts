import { removeKey } from "../object.utils";

describe('Object utility functions', () => {
    test('"RemoveKey" should return all the fields except the fields you provide',
        () => {
            const objToRemove = {
                name: "Moamen",
                email: "m@email.com",
                password: "123456",
            }
            const result = removeKey(objToRemove, ['password']);
            expect(!Object.keys(result).includes('password')).toBeTruthy();
        }
    )
});