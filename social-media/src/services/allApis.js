import { commonApi } from "./commonApi";
import base_url from "./server_url";

//User registration
export const userRegister = async (data) => {
    return await commonApi("POST", `${base_url}/register`, data, "")
}

//User Login
export const userLogin = async (data) => {
    return await commonApi("POST", `${base_url}/login`, data, "")
}

//Adding post
export const addPost = async (data, header) => {
    return await commonApi("POST", `${base_url}/add-post`, data, header)
}

//getting all posts
export const getPosts = async () => {
    return await commonApi("GET", `${base_url}/get-posts`, "", "")
}


//Like 
export const like = async (data, header) => {
    return await commonApi("PUT", `${base_url}/like`, data, header)
}

//comment adding
export const addCommentApi = async (data, header) => {
    return await commonApi("POST", `${base_url}/comment`, data, header);
};

//for fetching comment by PostId
export const getCommentsApi = async (postId, header) => {
    return await commonApi("GET", `${base_url}/comments/${postId}`, null, header);
  };
  