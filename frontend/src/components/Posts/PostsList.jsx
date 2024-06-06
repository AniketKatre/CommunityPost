import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { deletePost, fetchAllPosts } from "../../APIServices/posts/postsAPI";
import { Link } from "react-router-dom";

const PostsList = () => {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["list-posts"],
    queryFn: fetchAllPosts,
  });

  console.log(data);
  //   fetched();
  const postMutation = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: deletePost,
  });
  //delete hand;er
  const deleteHandler = async (postId) => {
    postMutation
      .mutateAsync(postId)
      .then(() => {
        //refetch
        refetch();
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div>Get All Posts</div>

      {isLoading && (
        <p style={{ color: "orange" }}>Loading all posts.........</p>
      )}

      {isError && <p style={{ color: "red" }}>{error.message}</p>}

      {isSuccess && <p style={{ color: "green" }}>POST fetched succesfully</p>}

      {data?.listPost.map((data) => {
        return (
          <div key={data?._id}>
            <h2>{data.title}</h2>

            <p>{data.description}</p>
            <Link to={`/posts/${data?._id}`}>
              <button> Edit </button>
            </Link>

            <button onClick={() => deleteHandler(data?._id)}> DELETE </button>
          </div>
        );
      })}
    </>
  );
};

export default PostsList;
