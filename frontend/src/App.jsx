// import HomePage from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import CreatePost from "./components/Posts/CreatePost";

import PostsList from "./components/Posts/PostsList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdatePost from "./components/Posts/UpdatePost";
import Home from "./components/Home/Home";
import PostDetails from "./components/Posts/PostDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <PublicNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts" element={<PostsList />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          {/* <Route path="/posts/:id" element={<UpdatePost />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
