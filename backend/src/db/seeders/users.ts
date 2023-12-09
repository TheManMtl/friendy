import { faker } from '@faker-js/faker';

const users: any = [];


for (let i = 0; i < 100; i++) {

    const user = {

        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'Password123!',
        bio: faker.person.bio(),
        location: faker.location.city() + ", " + faker.location.country(),
        birthday: faker.date.birthdate({ min: 13, max: 80, mode: 'age' }),
        workplace: faker.company.name(),
        position: faker.person.jobTitle(),
        school: 'John Abbott College'

    }
    users.push(user);
}

export default users;