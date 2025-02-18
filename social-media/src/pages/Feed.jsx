
import React, { useEffect, useState } from "react";
import {
  Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography,
  TextField, Button, CardMedia, Box, Container, Paper, Modal, Fade, Backdrop, Stack
} from "@mui/material";
import { Favorite, FavoriteBorder, Comment, AccountCircle, Add, Close } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getPosts, addPost, like, addCommentApi,getCommentsApi } from "../services/allApis";
import base_url from "../services/server_url";
import { toast } from "react-toastify";
import Header from "../components/Header";


const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [comments, setComments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newPost, setNewPost] = useState({ image: "", caption: "" });
  const [logStatus, setLogStatus] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
const [loggedInUser, setloggedInUser]= useState("")
const [userId, setUserId]= useState("")
  const usenavigate = useNavigate();

  useEffect(() => {
    setloggedInUser(sessionStorage.getItem("username"))
   setUserId(sessionStorage.getItem("userId"))
    if (sessionStorage.getItem("token")) {
        setLogStatus(true);
      } else {
        setLogStatus(false);
      }
      // setPosts(posts);
      getData();
  }, [])
  
  const isLargeScreen = useMediaQuery("(min-width:900px)");
  const navigate = useNavigate();


  const getData = async () => {
    if (logStatus) {
      const header = {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
      const userId = sessionStorage.getItem("userId");
    }

    const result = await getPosts();
  if ((result.status = 200)) {
    setPosts(result.data);
   
  } else {
    console.log(result.response.data);
  }
}

  const toggleLike = (postId) => {

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
      )
    );
  };

  const toggleComments = async(postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => post._id === postId ? { ...post, showComments: !post.showComments } : post)
    );
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const result = await getCommentsApi(postId, header);
        if (result.status === 200) {
          setComments(result.data); 
  };
  }
  

  const handleImageUpload = (event) => {
  const file = event.target.files[0];
  setImagePreview(URL.createObjectURL(file));
  if (file) {
    setNewPost({ ...newPost, image: file }); // Store file instead of URL
  }
};


  const handleCreatePost = async() => {
    if (!newPost.image || !newPost.caption) {
      alert("Please add an image and caption!");
      return;
    }
    const newPostData = {
      userId: userId,
      username: loggedInUser,
      image: newPost.image,
      caption: newPost.caption,
      likes: 0,
    };

    console.log(newPostData.image)

 
    const formData = new FormData();
    formData.append("username", newPostData.username);
    formData.append("userId", newPostData.userId);
    formData.append("caption", newPostData.caption);
    formData.append("likes", 0);
    formData.append("image", newPost.image);

    const header = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const result = await addPost(formData, header);
    if (result.status == 200) {
      toast.success("Post Uploaded");

    setNewPost({ image: "", caption: "" });
    setOpenModal(false);
    getData();
    }
  };


  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userId");
    
    usenavigate("/");
  };


  const handleLike = async (postId) => {
    try {
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      };
  
      const res = await like({ postId }, header);
  
      if (res.status === 200) {
        // Update state to reflect the new like/unlike state
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId
              ? {
                  ...post,
                  likes: res.data.likes,
                  likedBy: res.data.likedBy,
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };



  const addComment = async (postId) => {
    if (!commentInputs[postId]) return;

    // Sending comment to backend
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    };
    const commentData = {
      postId: postId,
      userId: userId,
      username: loggedInUser,
      comment: commentInputs[postId],
    };
    const result = await addCommentApi(commentData, header); // Assuming addCommentApi handles the backend interaction
    if (result.status === 200) {
      console.log(result.data)
      getData(); 

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, comments: [...post.comments, result.data.comments] } : post
        )
      );
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));    } else {
      console.log("Failed to add comment:", result);
    }
  };
  

  return (
    
   <>
   <Header/>
    <Container maxWidth="lg">
      <Box display="flex" justifyContent="space-between" mt={4}>
        {/* Profile Section */}
        {isLargeScreen && (
  <Paper 
    sx={{ 
      position: "fixed", 
      top: "100px", 
      left: "50px", 
      width: 250, 
      padding: 3, 
      textAlign: "center", 
      borderRadius: 3, 
      boxShadow: 3, 
      bgcolor: "background.paper"
    }}
  >
    {/* User Avatar */}
    <Avatar sx={{ width: 90, height: 90, margin: "auto", bgcolor: "primary.main", fontSize: 32 }}>
      {loggedInUser ? loggedInUser.charAt(0).toUpperCase() : "?"}
    </Avatar>

    {/* Username */}
    <Typography variant="h6" mt={2} fontWeight="bold">
      {loggedInUser || "Guest"}
    </Typography>

    {/* Action Buttons */}
    <Stack spacing={1} mt={2}>
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={() => navigate("/profile")}
      >
        My Profile
      </Button>
      <Button 
        variant="outlined" 
        color="error" 
        fullWidth 
        onClick={logout}
      >
        Logout
      </Button>
    </Stack>
  </Paper>
)}


        {/* Feed Section */}
        <Box sx={{ flexGrow: 1, marginLeft: isLargeScreen ? "350px" : 0 }}>
          
        <Box
  sx={{
    position: "fixed",
    top: 60, // Align at the top
    // left: isLargeScreen ? "30%" : "0", 
    width: isLargeScreen ? "calc(100% - 350px)" : "100%", // Match card width
    zIndex: 100,
    backgroundColor: "white", // White background
    boxShadow: 2, // Adds shadow for visibility
    padding: 2, // Adds padding inside
    marginBottom:"200px",
    display: "flex",
    flexDirection: "column", // Stack buttons vertically
    alignItems: "center", // Center align buttons
  }}
>
  {!isLargeScreen && (
    <Button
      variant="contained"
      startIcon={<AccountCircle />}
      onClick={() => navigate("/profile")}
      sx={{ width: "40%", marginBottom: 2 }} // Button width matches the container
    >
      View Profile
    </Button>
  )}

  <Button
    variant="contained"
    startIcon={<Add />}
    onClick={() => setOpenModal(true)}
    sx={{ width: "40%" }} // Button width matches the container
  >
    Create Your Post
  </Button>
</Box>

          {posts.map((post) => (
            <Card key={post.id} sx={{ marginBottom: 4,marginTop:5, padding: 2 }}>
              <CardHeader avatar={<Avatar>{post.username.charAt(0)}</Avatar>} title={post.username} />
              <CardMedia component="img" height="300" image={`${base_url}/uploads/${post.image}`} alt="post image" />
              <CardContent>
                <Typography variant="body1">{post.caption}</Typography>
              </CardContent>
              <CardActions>
              <IconButton onClick={() => handleLike(post._id)} sx={{ color: post.likedBy.includes(userId) ? "red" : "defult" }}>
  {post.likedBy.includes(userId) ? <Favorite /> : <FavoriteBorder />}
</IconButton>
<Typography>{post.likes}</Typography>

<IconButton onClick={() => toggleComments(post._id)}>
                  <Comment />
                </IconButton>
              </CardActions>

              {post.showComments && (
                <CardContent>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Add a comment..."
                    value={commentInputs[post._id] || ""}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post._id]: e.target.value })}
                  />
                  <Button onClick={() => addComment(post._id)} sx={{ marginTop: 1 }} variant="contained" size="small">
                    Comment
                  </Button>

                  {post.comments.map((comment, index) => (
                    <Typography key={index} variant="body2" sx={{ marginTop: 1, paddingLeft: 2 }}>
                      {comment.username}: {comment.comment}
                    </Typography>
                  ))}
                </CardContent>
              )}
            </Card>
          ))}
        </Box>
      </Box>

      {/* Create Post Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{ timeout: 500 }}>
        <Fade in={openModal}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Create Post</Typography>
              <IconButton onClick={() => setOpenModal(false)}><Close /></IconButton>
            </Box>
            <TextField fullWidth label="Caption" variant="outlined" margin="normal" value={newPost.caption} onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })} />
            <input type="file" accept="image/*" onChange={(e) =>handleImageUpload(e)} style={{ marginTop: 10 }} />
            {imagePreview && <CardMedia component="img" height="200" image={imagePreview} alt="Uploaded preview" sx={{ marginTop: 2, borderRadius: 1 }} />}
            <Button fullWidth sx={{ marginTop: 2 }} variant="contained" onClick={handleCreatePost}>Post</Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
    </>
  );

};

export default Feed;
