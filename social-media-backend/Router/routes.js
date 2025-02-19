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
router.post('/comment', postController.addComment);
router.get('/comments/:postId', postController.getComments);
router.put('/like',jwtmiddle,postController.like)
module.exports=router