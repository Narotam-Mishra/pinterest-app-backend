
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

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

    const { hashedPassword, ...detailsWithoutPassword } = userData.toObject();
    res.status(200).json(detailsWithoutPassword);
}

export const logoutUser = async (req, res) => {
    
}

export const getUser = async (req, res) => {
    const { username } = req.params;
    const singleUser = await User.findOne({ username });
    const { hashedPassword, ...detailsWithoutPassword } = singleUser.toObject();
    res.status(200).json(detailsWithoutPassword);
}
