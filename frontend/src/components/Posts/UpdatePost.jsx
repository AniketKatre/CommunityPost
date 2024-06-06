import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";
import { useParams } from "react-router-dom";
import { fetchPost, updatePostAPI } from "../../APIServices/posts/postsAPI";

const UpdatePost = () => {
  const postId = useParams();
  const { data } = useQuery({
    queryKey: ["post-details"],
    queryFn: () => fetchPost(postId.id),
  });
  console.log("datattatat", data);

  const formik = useFormik({
    initialValues: {
      title: data?.postFound?.title || "",
      description: data?.postFound?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),

    //submit handler
    onSubmit: (values) => {
      //   console.log(values);
      const postData = {
        title: values.title,
        description: values.description,
        postId,
      };
      postMutation.mutate(postData);
    },
  });

  const postMutation = useMutation({
    mutationKey: ["updatePost"],
    mutationFn: updatePostAPI,
  });
  //get loading state
  const isLoading = postMutation.isPending;
  //IsErr
  const isError = postMutation.isError;
  //success
  const isSuccess = postMutation.isSuccess;
  //Error
  const error = postMutation.error;

  return (
    <>
      <div>
        <div>
          <h2>You are editing.... - {data?.postFound.title}</h2>
        </div>
        <div>
          {isLoading && <p style={{ color: "orange" }}>Loading.........</p>}

          {isError && <p style={{ color: "red" }}>{error.message}</p>}

          {isSuccess && (
            <p style={{ color: "green" }}>POST updated succesfully</p>
          )}
        </div>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            {...formik.getFieldProps("title")}
          />
          {/* display error message */}
          {formik.touched.title && formik.errors.title && (
            <span style={{ color: "red" }}>{formik.errors.title}</span>
          )}

          <input
            type="text"
            name="description"
            placeholder="Enter description"
            {...formik.getFieldProps("description")}
          />
          {/* display error message */}
          {formik.touched.description && formik.errors.description && (
            <span style={{ color: "red" }}>{formik.errors.description}</span>
          )}

          <button type="submit">Update Post</button>
        </form>
      </div>
    </>
  );
};

export default UpdatePost;
