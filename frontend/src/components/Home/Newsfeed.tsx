import { useState, useEffect } from "react";
import { IPost } from "../../pages/shared/interface/post.interface";
import PostCard from "../common/PostCard/PostCard";
import useAxiosToken from "../../hooks/useAxiosToken";
import { AxiosError } from "axios";
import { apiError } from "../../types/common";

const Newsfeed: React.FC = () => {

    const [posts, setPosts] = useState<IPost[]>([]);
    const axiosToken = useAxiosToken();
    const [errorMessage, setErrorMessage] = useState('');

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
                    //get user profile pic
                    try {
                      const response = await axiosToken.get(`/profile/thumbnail/${post.authorId}`);
                      console.log(response.data);
                      post.author.profileImg = (response.data);
                      console.log("post thumbnail url: " + post.author.profileImg)
                      return post;
        
                    } catch (error: any) {
                        const err = error as AxiosError<apiError>;
                        if (!err?.response) {
                          setErrorMessage("Failed to connect to server.");
                          console.log(errorMessage);
        
                        } else if (err.response?.data?.message) {
                          setErrorMessage(err.response.data.message);
                          console.log(errorMessage);
        
                        } else {
                          console.log(err);
                          setErrorMessage("Something went wrong.");
                        }
                        post.author.profileImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnGZWTF4dIu8uBZzgjwWRKJJ4DisphDHEwT2KhLNxBAA&s";
                        console.log("post thumbnail url: " + post.author.profileImg)
                        return post
                      }
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
                            authorId={post.authorId}
                            profileImageSrc={
                                post.author.profileImg as string
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
