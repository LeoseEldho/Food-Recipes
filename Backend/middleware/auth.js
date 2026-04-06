import  jwt  from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    try {
        let token = req.headers["authorization"]
        if (!token) {
            return res.status(400).json({success:false,message:"Login again"})
        }
        token = token.split(" ")[1];
       const decoded= jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decoded;
        next()
    } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Login or expired token",
    });
  }
};

export default verifyToken