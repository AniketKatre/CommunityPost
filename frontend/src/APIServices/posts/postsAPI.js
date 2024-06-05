import axios from "axios";

const BASE_URL = "http://localhost:5001/api/v1/posts/create";

//create that must return apromise

// CREATE POST API
export const createPostAPI = async (postData) => {
  console.log("FROM API: ", postData);
  const res = await axios.post(BASE_URL, {
    title: postData.title,
    description: postData.description,
  });

  return res.data;
};
