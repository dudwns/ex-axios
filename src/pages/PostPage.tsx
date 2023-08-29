import { Header, Spinner, Text } from "@components/index";
import useAsync from "@hooks/useAsync";
import axios from "axios";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

const PostPage = () => {
  const { postId } = useParams();

  const post = useAsync(async () => {
    return await axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.data);
  }, [postId!]);
  return (
    <div>
      {post.isLoading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Header>{post.value?.title}</Header>
          <Text>{post.value?.body}</Text>
        </Fragment>
      )}
    </div>
  );
};

export default PostPage;
