/*
DON'T USE ME YET
I'M NOT DONE AND MIGHT NOT WORK
*/

import Post from '../db/models';
import Repo from './IRepo';
import db from "../db/models";

export interface IPostRepo extends Repo<typeof Post> {


    getPostbyId(postId: number): Promise<typeof Post>;

}

export class PostRepo implements IPostRepo {

    public async exists(p: typeof Post): Promise<boolean> {

        const result = await db.Post.findByPk(p.id);
        return !!result === true;  
    }

    public async delete(p: typeof Post): Promise<unknown> {

        const result = await Post.update(
            {
                isDeleted: true
            },
            {
                where: {
                    id: p.id
                }
            });
        return result;
    }

    public async save(p: typeof Post): Promise<unknown> {

        throw new Error('Method not implemented.');
    }

    public async getPostbyId(id: number): Promise<any> {

        const result = await db.Post.findByPk(id);
        return result; 
    }
}