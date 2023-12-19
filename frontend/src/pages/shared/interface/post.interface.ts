import { IImage } from './image.interface';

export interface IPost {
    id: number;
    authorId: number;
    type: string;
    content: string;
    postId?: number;
    profileId?: number;
    commentCount: number;
    likeCount: number;
    createdAt: string;
    albumId?: number;
    Image: IImage;
    imageUrls?: string;
    thumbnailUrl?: string;
    author: IPostAuthor;
}

interface IPostAuthor {

    id: number;
    name: string;
    profileImg?: IPost;

}