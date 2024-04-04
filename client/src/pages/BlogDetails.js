import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";

const BlogDetails = () => {
  const [image, setImage] = useState(null);
  const [blog, setBlog] = useState({});
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const getBlogDetail = async () => {
    try {
      const response = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (response.data.success) {
        setBlog(response.data.blog);
        setInputs({
          title: response.data.blog.title,
          description: response.data.blog.description,
          image: response.data.blog.image.url || "", // Check if image.url exists
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("image", image);
      formData.append("user", userId);
      const result = await axios.put(
        `/api/v1/blog/update-blog/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (result.data.success) {
        toast.success("Blog Updated");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update blog");
    }
  };

  useEffect(() => {
    getBlogDetail();
    // eslint-disable-next-line 
  }, [id]);

  return (
    <>
      <h1 className="offset-2 mt-5">Update Blog</h1>
      <div className="row ">
        <div className="col-8 offset-2">
          <form className="needs-validation" noValidate onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Add a catchy title"
                required
                value={inputs.title}
                onChange={handleChange}
              />
              <div className="valid-feedback">Title looks good</div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                rows="4"
                className="form-control"
                id="description"
                name="description"
                required
                value={inputs.description}
                onChange={handleChange}
              ></textarea>
              <div className="invalid-feedback">
                Description should be valid
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Upload Listing Image
              </label>
              <input
                type="file"
                className="form-control"
                name="image"
                required
                onChange={handleChangeImg}
              />
            </div>
            <button type="submit" className="btn btn-primary add-btn">
              Update
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;

// const [blog, setBlog] = useState({});
// const id = useParams().id;
// const navigate = useNavigate();
// const [inputs, setInputs] = useState({});
// // get blog details
// const getBlogDetail = async () => {
//   try {
//     const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
//     if (data?.success) {
//       setBlog(data?.blog);
//       setInputs({
//         title: data?.blog.title,
//         description: data?.blog.description,
//         image: data?.blog.image,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// useEffect(() => {
//   getBlogDetail();
//   // eslint-disable-next-line
// }, [id]);

// // input change
// const handleChange = (e) => {
//   setInputs((prevState) => ({
//     ...prevState,
//     [e.target.name]: e.target.value,
//   }));
// };
// //form
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
//       title: inputs.title,
//       description: inputs.description,
//       image: inputs.image,
//       user: id,
//     });
//     if (data?.success) {
//       toast.success("Blog Updated");
//       navigate("/my-blogs");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// console.log(blog);
// return (
//   <>
//     <form onSubmit={handleSubmit}>
//       <Box
//         width={"50%"}
//         border={3}
//         borderRadius={10}
//         padding={3}
//         margin="auto"
//         boxShadow={"10px 10px 20px #ccc"}
//         display="flex"
//         flexDirection={"column"}
//         marginTop="30px"
//       >
//         <Typography
//           variant="h2"
//           textAlign={"center"}
//           fontWeight="bold"
//           padding={3}
//           color="gray"
//         >
//           Update A Pots
//         </Typography>
//         <InputLabel
//           sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
//         >
//           Title
//         </InputLabel>
//         <TextField
//           name="title"
//           value={inputs.title}
//           onChange={handleChange}
//           margin="normal"
//           variant="outlined"
//           required
//         />
//         <InputLabel
//           sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
//         >
//           Description
//         </InputLabel>
//         <TextField
//           name="description"
//           value={inputs.description}
//           onChange={handleChange}
//           margin="normal"
//           variant="outlined"
//           required
//         />
//         <InputLabel
//           sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
//         >
//           Image URL
//         </InputLabel>
//         <TextField
//           name="image"
//           value={inputs.image}
//           onChange={handleChange}
//           margin="normal"
//           variant="outlined"
//           required
//         />
//         <Button type="submit" color="warning" variant="contained">
//           UPDATE
//         </Button>
//       </Box>
//     </form>

//     <Footer />
//   </>
// );
