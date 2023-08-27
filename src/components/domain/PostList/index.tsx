import { usePostContext } from "../../../contexts/PostProvider";
import PostItem from "../PostItem";

export interface PostProps {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
}

const PostList = () => {
  const { posts } = usePostContext();
  return (
    <ul>
      {posts?.map((post: PostProps) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
