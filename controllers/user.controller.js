
import User from '../models/user.model.js';

export const getUser = async (req, res) => {
    const { username } = req.params;
    const singleUser = await User.findOne({ username });
    const { hashedPassword, ...detailsWithoutPassword } = singleUser.toObject();
    res.status(200).json(detailsWithoutPassword);
}