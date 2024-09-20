const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }     
        res.status(200).json({ message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}
