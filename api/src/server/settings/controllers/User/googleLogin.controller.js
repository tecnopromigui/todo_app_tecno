const bcrypt = require("bcrypt");
require("dotenv").config();
const { User } = require("../../../../db/models/relationShips");
const { generarJWT } = require("../../helper/User/generarJWT");


const googleLogin = async (req, res) => {
    const { given_name, family_name, picture, email } = req.body;
    
    let newUser;
    try {
        
        if (email) {
            
            let user = await User.findOne({ where: { email } });
            
            if (!user) {
                
                const password = email + process.env.JWT_SECRET;
                const salt = await bcrypt.genSalt();
                const hashedPassword = await bcrypt.hash(password, salt);

                newUser = await User.create({
                    first_name: given_name,
                    last_name: family_name,
                    profile_picture: picture,
                    email: email,
                    password: hashedPassword,
                    token: "",
                    createGoogle: true,
                    accountConfirmed: true,
                });
                
                res.status(201).json({
                    status: 201, message: "User successfully created", data: {
                        id: newUser.id,
                        first_name: newUser.first_name,
                        last_name: newUser.last_name,
                        date_birth: newUser.date_birth,
                        email: newUser.email,
                        token: generarJWT(newUser.id),
                        profile_picture: newUser.profile_picture,
                    }
                })
            } else {
                res.status(201).json({
                    status: 201, message: "User is already created", data: {
                        id: user.id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        date_birth: user.date_birth,
                        email: user.email,
                        token: generarJWT(user.id),
                        profile_picture: user.profile_picture,
                    }
                })
            }


        } else {
            return res.status(400).json({ status: 400, error: "Invalid Email" })
        }

    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

module.exports = googleLogin;