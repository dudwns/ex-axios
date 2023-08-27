import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import { PostItemProps } from "../components/domain/PostItem";
import { PostProps } from "../components/domain/PostList";

interface PostProviderProps {
  children: React.ReactNode;
  initialPosts: PostProps[] | undefined;
  handleDeletePost: (id: number) => Promise<{ id: number }>;
  handleAddPost: (post: PostProps) => Promise<PostProps[]>;
}

const PostContext = createContext<{
  posts?: PostItemProps[];
  onDeletePost: (id: number) => Promise<void>;
  onAddPost: (post: PostProps) => Promise<void>;
}>({});
export const usePostContext = () => useContext(PostContext);

// reducer 내부에는 async/await를 통한 네트워크 작업을 호출할 수 없다. -> 최대한 순수해야 하기 때문이다.
// 상태 관리 로직만 작성
const reducer = (state: PostProps[], action) => {
  switch (action.type) {
    case "INIT_POSTS": {
      return action.payload;
    }
    case "ADD_POST": {
      return [...state, action.payload];
    }
    case "DELETE_POST": {
      const payload = action.payload;
      return state.filter((item) => item.id !== payload.id);
    }
    default: {
      console.error("Wrong type");
      break;
    }
  }
};

const PostProvider = ({
  children,
  initialPosts,
  handleAddPost,
  handleDeletePost,
}: PostProviderProps) => {
  const [posts, dispatch] = useReducer(reducer, initialPosts || []); // 로직을 정의할 수 있음 (리듀서, 초깃값)

  useEffect(() => {
    dispatch({ type: "INIT_POSTS", payload: initialPosts || [] });
  }, [initialPosts]);

  const onAddPost = useCallback(
    async (post: PostProps) => {
      const payload = await handleAddPost(post);
      dispatch({ type: "ADD_POST", payload });
    },
    [handleAddPost]
  );

  const onDeletePost = useCallback(
    async (id: number) => {
      const payload = await handleDeletePost(id);
      dispatch({ type: "DELETE_POST", payload });
    },
    [handleDeletePost]
  );

  return (
    <PostContext.Provider value={{ posts, onAddPost, onDeletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
