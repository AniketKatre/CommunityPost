import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchPost } from "../../APIServices/posts/postsAPI";

const PostDetails = () => {
  const postId = useParams();
  //   console.log("ididiid", postId.id);
  const { isError, isLoading, data, error, isSuccess } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => fetchPost(postId.id),
  });
  console.log("datattatat", data);

  return (
    <>
      <div>
        <h1>Post Details</h1>
        {isLoading && (
          <p style={{ color: "orange" }}>Loading a posts.........</p>
        )}
        {isError && <p style={{ color: "red" }}>{error.message}</p>}
        {isSuccess && (
          <p style={{ color: "green" }}>POST fetched succesfully</p>
        )}
        <div>
          <h2>{data?.postFound.title}</h2>
          <p>{data?.postFound.description}</p>
        </div>
      </div>
    </>
  );
};

export default PostDetails;
