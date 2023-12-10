import { faker } from '@faker-js/faker';
import db from "../models";
//import User from "../models";

const posts: any = [];
const createPosts = async () => {

    const users = await db.User.findAll();
    console.log("-----------------BEGIN USER PROCESSION-----------------");
    console.log(users);
    console.log("-----------------END USER PROCESSTION-----------------");
    users.map((user: typeof db.User) => {

        user = user.dataValues;

        //console.log(user);

        const post = {

            authorId: user.id,
            content: faker.hacker.phrase()
        }
        posts.push(post);

    })

   return posts;
}

export default createPosts;