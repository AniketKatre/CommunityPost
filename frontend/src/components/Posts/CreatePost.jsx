import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import { createPostAPI } from "../../APIServices/posts/postsAPI";
import { FaTimesCircle } from "react-icons/fa";
import AlertMessage from "../Alerts/AlertMessage";

const CreatePost = () => {
  // state for wysiwg
  const [description, setDescription] = useState("");
  //file upload state
  const [imageError, setImageErr] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const postMutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPostAPI,
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      image: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      image: Yup.string().required("Image is required"),
    }),

    //submit handler
    onSubmit: (values) => {
      //   console.log(values);
      // const postData = {
      //   description: values.description,
      // };

      //form data
      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("image", values.image);
      postMutation.mutate(formData);
    },
  });

  //file upload logic
  // handle fileChnage
  //remove imagel
  const handleFileChange = (event) => {
    // console.log(event)
    // get bthe file selected
    const file = event.currentTarget.files[0];
    // console.log(file);

    //limit size
    if (file.size > 1048576) {
      //more than 1 mb
      setImageErr("File sized exceed 1mb");
      return;
    }

    //limit file types
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImageErr("Invalid File Type...");
    }

    // set the image preview
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  //REMOVE IMAGE|
  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  //get loading state
  const isLoading = postMutation.isPending;
  //IsErr
  const isError = postMutation.isError;
  //success
  const isSuccess = postMutation.isSuccess;
  //Error
  const error = postMutation.error;
  const errorMSG = postMutation?.error?.response.data.message;

  //is error
  if (isError) return <AlertMessage type="error" message={errorMSG} />;

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Add New Post
          </h2>
          {/* show alert */}
          {isLoading && (
            <AlertMessage type="loading" message="Loading please wait" />
          )}

          {/* is success */}
          {isSuccess && (
            <AlertMessage type="success" message="Post Created successfully" />
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Description Input - Using ReactQuill for rich text editing */}
            <div className="mb-20">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              {/* ReactQuill here */}
              <ReactQuill
                value={formik.values.description}
                onChange={(value) => {
                  setDescription(value);
                  formik.setFieldValue("description", value);
                }}
                className="h-40"
              />
              {/* description error */}
            </div>

            {/* Category Input - Dropdown for selecting post category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              {/* display error */}
              {/* {formik.touched.category && formik.errors.category && (
              <p className="text-sm text-red-600">{formik.errors.category}</p>
            )} */}
            </div>

            {/* Image Upload Input - File input for uploading images */}
            <div className="flex flex-col items-center justify-center bg-gray-50 p-4 shadow rounded-lg">
              <label
                htmlFor="images"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Image
              </label>
              <div className="flex justify-center items-center w-full">
                <input
                  id="images"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="images"
                  className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                >
                  Choose a file
                </label>
              </div>
              {/* Display error message */}
              {formik.touched.image && formik.errors.image && (
                <p className="text-sm text-red-600">{formik.errors.image}</p>
              )}

              {/* error message */}
              {imageError && (
                <p className="text-sm text-red-600">{imageError}</p>
              )}

              {/* Preview image */}

              {imagePreview && (
                <div className="mt-2 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-24 w-24 object-cover rounded-full"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                  >
                    <FaTimesCircle className="text-red-500" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button - Button to submit the form */}
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
