import { faker } from '@faker-js/faker';
import db from "../models";
import models from "../models";
const User = models.User;
const Post = models.Post;

const posts: typeof Post = [];
const createPosts = async () => {

    const users = await db.User.findAll({ raw: true });
    console.log("-----------------BEGIN USER PROCESSION-----------------");
    console.log(users);
    console.log("-----------------END USER PROCESSTION-----------------");
    users.map((user: typeof User) => {

        const post = {

            authorId: user.id,
            content: faker.hacker.phrase()
        }
        posts.push(post);

    })

    return posts;
}

const savePosts = async () => {

    await createPosts().then((posts) => {

        posts.map((post: typeof Post) => {
            db.Post.create(post);
        })
    })
  }

export default savePosts;