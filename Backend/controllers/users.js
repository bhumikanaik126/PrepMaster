const { userSignUp, userLogIn } = require("../auth");
const { User } = require("../database");

const signUp = async function (req, res) {
    const { username, email, password } = req.body;

    try {
        // Check if a user with the same username already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if a user with the same email already exists
        user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Create a new user
        user = new User({
            username: username,
            email: email,
            password: password
        });

        await user.save();

        // Generate a token and set it in a cookie
        const token = userSignUp(user);
        res.cookie("auth", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        });

        return res.status(201).json({ message: "User signed up successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}


const logIn = async function (req, res) {
    const token = req.cookies.auth; // Retrieve token from cookies

    try {
        const valid = userLogIn(token);

        if (valid) {
            // Token is valid
            return res.status(200).json({ message: "User signed in successfully" });
        } else {
            // Token is invalid
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signUp, logIn };
