import { faker } from '@faker-js/faker';
export function createFakeCourse (){
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
    }
}