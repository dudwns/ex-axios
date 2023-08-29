import { Route, Routes } from "react-router-dom";
import { NotFoundPage, PostPage, PostsPage } from "./pages";
import DefaultTemplate from "@components/template/DefaultTemplate";

function App() {
  return (
    <DefaultTemplate>
      <Routes>
        <Route path="/" element={<h1>Home</h1>}></Route>
      </Routes>
      <Routes>
        <Route path="/posts" element={<PostsPage />}></Route>
      </Routes>
      <Routes>
        <Route path="/posts/:postId" element={<PostPage />}></Route>
      </Routes>
      <Routes>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </DefaultTemplate>
  );
}

export default App;
