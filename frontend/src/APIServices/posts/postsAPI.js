import axios from "axios";

const BASE_URL = "http://localhost:5001/api/v1/posts";

//create that must return apromise

// CREATE POST API
export const createPostAPI = async (postData) => {
  console.log("FROM API: ", postData);
  const res = await axios.post(`${BASE_URL}/create`, {
  
    description: postData.description,
  });

  return res.data;
};

// GET all POSTS
export const fetchAllPosts = async () => {
  const posts = await axios.get(BASE_URL);
  return posts.data;
};

// Fetch a single POSTS with ID
export const fetchPost = async (postId) => {
  const posts = await axios.get(`${BASE_URL}/${postId}`);
  //   console.log(posts);
  return posts?.data;
};

// UPDATE POST API
export const updatePostAPI = async (postData) => {
  console.log("FROM API: ", postData);
  const res = await axios.put(`${BASE_URL}/${postData?.postId.id}`, {
    title: postData.title,
    description: postData.description,
  });

  return res.data;
};

// Delete post with id
export const deletePost = async (postId) => {
  const posts = await axios.delete(`${BASE_URL}/${postId}`);
  //   console.log(posts);
  return posts?.data;
};
