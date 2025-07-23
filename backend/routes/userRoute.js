import express from "express";
//controllers 

import { createUser , loginUser , logCurrentUser , getAllUsers , 
    getCurrentUserProfile , updateTheCurrentUserProfile } from "../controllers/userController.js";
 
//middlewares
import { authenticated , authorizeAdmin } from "../middlewares/authMiddleware.js";


const router= express.Router();

router.route("/").post(createUser).get(authenticated,authorizeAdmin,getAllUsers);

router.post('/auth',loginUser);

router.post('/logout',logCurrentUser);

router.route('/profile').get(authenticated, getCurrentUserProfile).put(authenticated,updateTheCurrentUserProfile);

export default router;