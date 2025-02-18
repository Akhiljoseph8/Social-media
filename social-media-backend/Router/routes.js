const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const postController=require('../controllers/postController')
const jwtmiddle=require('../Middleware/jwtMiddleware')
const multerMiddle=require('../Middleware/multerMiddleware')

router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.post('/add-post',jwtmiddle,multerMiddle.single('image'), postController.addPost)
router.get('/get-posts',postController.getPost)
// router.get('/other-property',jwtmiddle,propertyController.getOtherProperty)
// router.get('/user-property',jwtmiddle,propertyController.userProperty)
// router.put('/edit-property/:pid',jwtmiddle,propertyController.editProperty)
// router.delete('/remove-property/:pid',jwtmiddle,propertyController.removeProperty)
// router.post('/seller',jwtmiddle,userController.sellerData)
// router.post('/mail',jwtmiddle,userController.mail)
router.post('/comment', postController.addComment);

// Route to get all comments for a specific post
router.get('/comments/:postId', postController.getComments);
router.put('/like',jwtmiddle,postController.like)
module.exports=router