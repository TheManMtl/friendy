import { useState, useEffect } from "react";
import { IPost } from "../../pages/shared/interface/post.interface";
import PostCard from "../common/PostCard/PostCard";
import useAxiosToken from "../../hooks/useAxiosToken";

const Newsfeed: React.FC = () => {

    const [posts, setPosts] = useState<IPost[]>([]);
    const axiosToken = useAxiosToken();

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const response = await axiosToken.get('/posts/newsfeed');
            console.log("should have fetched newsfeed posts");
            const list = response.data as IPost[];

            if (list[0]) {
                const updatedList = await Promise.all(
                    list.map(async (post) => {
                        if (post.author.profileImg) {
                            const url = await getImgUrl(
                                post.author.profileImg?.Image.thumbnail ?? "default.jpg"
                            );
                            console.log("profile img url: " + url);

                            if (url) {
                                post.author.profileImg!.Image.thumbnail = url;
                            }
                        } else {
                            post.author.defaultAvatarUrl = await getDefaultAvatar() as unknown as string;
                            console.log("default url: " + post.author.defaultAvatarUrl);
                        }
                        if (post.Image) {
                            const url = await getImgUrl(post.Image.fileName);
                            console.log("post img url: " + url);

                            if (url) {
                                post.thumbnailUrl = url;
                            }
                        }
                        return post;
                    })
                );
                setPosts(updatedList);
            }
        } catch (error) {
            //TODO
            console.log(error);
        }
    };

    const getImgUrl = async (fileName: string) => {
        try {
            const response = await axiosToken.get(`/images/${fileName}`);
            console.log(response.data);

            return response.data;
        } catch (error) {
            //TODO handle
            console.log("Error fetching image URL:", error);
        }
    };

    const getDefaultAvatar = async () => {
        console.log("fetching default image URL");

        return getImgUrl("default.jpg");
    }

    return (
        <div className="contentSection row mt-1 px-5 py-3 d-flex justify-content-center">
            {posts[0] ? (
                posts.map((post) => (
                    <div key={`post-${post.id}`} className="mt-2">
                        <PostCard
                            id={post.id}
                            profileImageSrc={
                                post.author.profileImg?.Image?.thumbnail as string ?? post.author.defaultAvatarUrl
                            }
                            time={post.createdAt}
                            username={post.author.name}
                            content={post.content}
                            thumbnailUrl={post.thumbnailUrl}
                            likeCount={post.likeCount}
                            commentCount={post.commentCount}
                            comments={post.comments}
                            type={post.type}
                        />
                    </div>
                ))
            ) : (
                <></>
            )}
        </div>
    );
};

export default Newsfeed;
