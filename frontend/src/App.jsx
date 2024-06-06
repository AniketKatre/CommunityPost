import HomePage from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import CreatePost from "./components/Posts/CreatePost";

import PostsList from "./components/Posts/PostsList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdatePost from "./components/Posts/UpdatePost";

function App() {
  return (
    <>
      <BrowserRouter>
        <PublicNavbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/lists" element={<PostsList />} />

          <Route path="/posts/:id" element={<UpdatePost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
