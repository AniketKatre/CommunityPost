import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createPostAPI } from "../../APIServices/posts/postsAPI";

const CreatePost = () => {
  const postMutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPostAPI,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
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
      };
      postMutation.mutate(postData);
    },
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
        <h2>Create Post Page</h2>
        {isLoading && <p style={{ color: "orange" }}>Loading.........</p>}

        {isError && <p style={{ color: "red" }}>{error.message}</p>}

        {isSuccess && (
          <p style={{ color: "green" }}>POST created succesfully</p>
        )}

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

          <button type="submit">Create Post</button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
