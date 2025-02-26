import jwt from "jsonwebtoken";       // 1h 48 min 40 seg fala sobre token 

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // "token" é porque coloquei o nome dele assim 

    /// se não tiver cookie, ele retorna um erro
    if (!token) {
        return res.status(401).json({ success: false, message: "You do not have authorization access" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: "You do not have authorization access" });

        }
        // userId  que passei no token
        /* console.log("Token decodificado:", decoded)
        console.log("req.userId:", req.userId); */

        req.userId = decoded.userId; // vou manter o ID do usuário no req
       
        next();
    } catch (error) {
        console.log("Error in verifyToken", error);
        res.status(401).json({ success: false, message: "You do not have authorization access" });
    }
}