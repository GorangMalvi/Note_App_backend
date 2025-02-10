const User =  require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



// Define the signup function
const signup = async (req, res) => {
    const {name, password, email} = req.body
    try {
        bcrypt.hash(password, Number(process.env.SALT_ROUNDS), async (err, hash) => {
            if(err) {
                res.status(400).json({err})
            } else {
                const newUser = new User({name, email, password:hash})
                await newUser.save()
                res.status(200).json({msg:"You have been successfully regitered!"})
            }
        }); 
    }catch(error){
        res.status(500).json({error})
    }
   
};


// Define the login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

module.exports = {signup, login};