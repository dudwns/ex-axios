import axios from "axios";
import PostList, { PostProps } from "@components/domain/PostList";
import PostProvider from "@contexts/PostProvider";
import { useCallback } from "react";
import PostAddForm from "@components/domain/PostList/PostAddForm";
import useAsync from "@hooks/useAsync";
import { Header, Spinner } from "@components/index";

function PostPage() {
  const initialPosts = useAsync(async () => {
    return await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.data);
  }, []);

  const handleAddPost = useCallback(async (post: PostProps) => {
    return await axios
      .post(`https://jsonplaceholder.typicode.com/posts`, post)
      .then((response) => response.data);
  }, []);

  const handleDeletePost = useCallback(async (id: number) => {
    return await axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => ({ id }));
  }, []);

  return (
    <PostProvider
      initialPosts={initialPosts.value}
      handleAddPost={handleAddPost}
      handleDeletePost={handleDeletePost}
    >
      <div>
        <Header>Posts</Header>
        <PostAddForm />
        {initialPosts.isLoading ? <Spinner /> : <PostList />}
      </div>
    </PostProvider>
  );
}

export default PostPage;
