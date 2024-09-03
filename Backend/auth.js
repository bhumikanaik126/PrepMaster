const secret="bhumikanaik126"
const jwt=require("jsonwebtoken");

const userSignUp=(user)=>{
    const payload = { id: user._id, username: user.username };
    return jwt.sign(payload, secret, { expiresIn: '30d' });
}

const userLogIn=(token)=>{
    if (!token) return { success: false, message: "No token provided" };
    
    try {
        const decoded = jwt.verify(token, secret);
        return { success: true, user: decoded };
    } catch (err) {
        return { success: false, message: "Invalid or expired token" };
    }
}

module.exports={
    userSignUp,
    userLogIn
}