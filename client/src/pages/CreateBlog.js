import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const [image, setImage] = useState(null); // Change to null
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  const handleChangeImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the file object
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
      formData.append("image", image); // Append the image file
      formData.append("user" , id);
      const result = await axios.post("/api/v1/blog/create-blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(result.data);
      if (result.data.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create blog");
    }
  };

  return (
    <>
      <h1 className="offset-2 mt-5">Create A New Blog</h1>
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
              Add
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateBlog;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { InputLabel, TextField } from "@mui/material";
// import {
//   Box,
//   Button,
//   InputLabel,
//   TextField,
//   Typography,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import toast from "react-hot-toast";

// const CreateBlog = () => {
//   const id = localStorage.getItem("userId");
//   const theme = useTheme();
//   const matches = useMediaQuery(theme.breakpoints.up("md"));
//   const [image, setImage] = useState("");

//   const navigate = useNavigate();
//   const [inputs, setInputs] = useState({
//     title: "",
//     description: "",
//     image: "",
//   });
//   const handleChangeImg = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // input change
//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post("/api/v1/blog/create-blog", {
//         title: inputs.title,
//         description: inputs.description,
//         image: inputs.image,
//         user: id,
//       });
//       if (data?.success) {
//         toast.success("Blog Created");
//         navigate("/my-blogs");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Box
//         sx={{
//           width: matches ? "45%" : "70%",
//           display: "flex",
//           margin: matches ? "auto" : "1px 30px",
//           flexWrap: "wrap",
//           border: 3, // corrected
//           borderRadius: 10, // corrected
//           padding: 3,
//           margin: "auto", // corrected
//           boxShadow: "10px 10px 20px #ccc", // corrected
//           flexDirection: "column", // corrected
//           marginTop: "30px", // corrected
//           marginBottom: "100px", // corrected
//         }}
//       >
//         <Typography
//           variant="h2"
//           textAlign="center" // corrected
//           fontWeight="bold"
//           padding={3}
//           color="gray"
//         >
//           Create A Post {/* corrected typo */}
//         </Typography>
//         <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
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
//         <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
//           Description
//         </InputLabel>
//         <TextField
//           name="description"
//           value={inputs.description}
//           onChange={handleChange}
//           margin="normal"
//           variant="outlined"
//           required
//           multiline // Add multiline to allow multiple lines
//           rows={4} // Specify number of rows
//         />
//         <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
//           Image Upload
//         </InputLabel>
//         <input
//           type="file"
//           accept="image/jpeg, image/png, image/jpg"
//           onChange={handleChangeImg}
//           style={{ display: "none" }}
//           id="image-upload"
//         />
//         <label htmlFor="image-upload">
//           <TextField
//             value={image}
//             margin="normal"
//             variant="outlined"
//             disabled
//           />
//           <button>Select Image</button>
//         </label>

//         <Button type="submit" color="primary" variant="contained">
//           SUBMIT
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default CreateBlog;
