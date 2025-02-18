
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

//Adding property
export const addPost = async (data, header) => {
    return await commonApi("POST", `${base_url}/add-post`, data, header)
}

//getting all property
export const getPosts = async () => {
    return await commonApi("GET", `${base_url}/get-posts`, "", "")
}

// //getting property of other than login user
// export const getOtherProperty = async (header) => {
//     return await commonApi("GET", `${base_url}/other-property`, "", header)
// }

// // getting property of login user 
// export const getUserProperty = async (header) => {
//     return await commonApi("GET", `${base_url}/user-property`, "", header)
// }

// //Editing property
// export const editProperty = async (data, header, id) => {
//     return await commonApi("PUT", `${base_url}/edit-property/${id}`, data, header)
// }

// //Delete property
// export const removeProperty = async (header, id) => {
//     return await commonApi("DELETE", `${base_url}/remove-property/${id}`, {}, header)
// }

// //getting seller data
// export const sellerData = async (data, header) => {
//     return await commonApi("POST", `${base_url}/seller`, data, header)
// }

// //mail configuration
// export const mail = async (data, header) => {
//     return await commonApi("POST", `${base_url}/mail`, data, header)
// }

//Like count
export const like = async (data, header) => {
    return await commonApi("PUT", `${base_url}/like`, data, header)
}


export const addCommentApi = async (data, header) => {
    return await commonApi("POST", `${base_url}/comment`, data, header);
};

export const getCommentsApi = async (postId, header) => {
    return await commonApi("GET", `${base_url}/comments/${postId}`, null, header);
  };
  