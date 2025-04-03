
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { username, displayName, email, password } = req.body;
    
    if(!username || !email || !password){
        return res.status(400).json({ message: "All fields are required!" });
    }
    
    // encrypt password
    const newHashedPassword = await bcrypt.hash(password, 10);

    // create new user for registration
    const user = await User.create({
        username,
        displayName,
        email,
        hashedPassword: newHashedPassword,
    });

    // create jwt token
    const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET);

    // set cookie inside response
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const { hashedPassword, ...detailsWithoutPassword } = user.toObject();
    res.status(201).json(detailsWithoutPassword);
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    if(!email || !password){
        return res.status(400).json({ message: "Email and Password both are required for login!" });
    }
    
    // get user'd details from DB
    const userData = await User.findOne({ email });
    if(!userData){
        return res.status(401).json({ message: "Invalid email or password!" });
    }

    // compare password
    const isPasswordCorrect = await bcrypt.compare(password, userData.hashedPassword);
    
    if(!isPasswordCorrect){
        return res.status(401).json({ message: "Invalid email or password!" });
    }
    // console.log(isPasswordCorrect);
    
    // create jwt token
    const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET);

    // set cookie inside response
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    const { hashedPassword, ...detailsWithoutPassword } = userData.toObject();
    res.status(200).json(detailsWithoutPassword);
}



export const logoutUser = async (req, res) => {
    // after logout clear cookie
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful!!" })
}

export const getUser = async (req, res) => {
    const { username } = req.params;
    const singleUser = await User.findOne({ username });
    const { hashedPassword, ...detailsWithoutPassword } = singleUser.toObject();
    res.status(200).json(detailsWithoutPassword);
}
