import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CreatePost = () => {
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
      console.log(values);
    },
  });

  return (
    <>
      <div>
        <h2>Create Post Page</h2>
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
