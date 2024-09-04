const { userSignUp, userLogIn } = require("../auth");
const { User } = require("../database");

const signUp = async function (req, res) {
    const { username, email, password } = req.body;

    try {
        // Check if a user with the same username or email already exists
        let existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            const message = existingUser.username === username
                ? "Username already exists"
                : "Email already exists";
            return res.status(400).json({ message });
        }

        // Create a new user
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Generate a token and set it in a cookie
        const token = userSignUp(newUser);
        res.cookie("auth", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        });

        return res.status(201).json({ message: "User signed up successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

const logIn = async function (req, res) {
    const { email, password } = req.body;

    try {
        // Check if the email is registered
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not registered" });
        }

        // Validate the user's password (Assuming userLogIn handles password validation)
        const token = userLogIn(user, password);

        if (token) {
            // Set token in a cookie
            res.cookie("auth", token, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict"
            });
            return res.status(200).json({ message: "User signed in successfully" });
        } else {
            // Invalid password
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { signUp, logIn };
