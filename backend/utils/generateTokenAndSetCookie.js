import jwt from "jsonwebtoken";
 // depois estudar mais sobre cookies
export const generateTokenAndSetCookie = ( res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET,{
        expiresIn: "7d"
    });
    res.cookie("token", token,{
        httOldOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,

    } )
    return token;
}