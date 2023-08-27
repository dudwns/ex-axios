import { useCallback, useState } from "react";
import { Header, Spinner, Text } from "../..";
import { usePostContext } from "../../../contexts/PostProvider";
import { PostProps } from "../PostList";

export interface PostItemProps {
  post: PostProps;
}

const PostItem = ({ post }: PostItemProps) => {
  const [loading, setLoading] = useState(false);
  const { onDeletePost } = usePostContext();

  const handleDeletePost = useCallback(
    async (id: number) => {
      setLoading(true);
      await onDeletePost(id);
      setLoading(false);
    },
    [onDeletePost]
  );

  return (
    <li>
      <Header strong level={3}>
        {post.title}
      </Header>
      <Text>{post.body}</Text>
      <div>
        {loading ? <Spinner /> : <button onClick={() => handleDeletePost(post.id!)}>Delete</button>}
      </div>
    </li>
  );
};

export default PostItem;
