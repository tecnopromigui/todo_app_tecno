const bcrypt = require("bcrypt");
const { User } = require("../../../../db/models/relationShips");
const { generarJWT } = require("../../helper/User/generarJWT");


const login = async (req, res) => {

    try {
        //Tomamos los datos del body
        const { email, password } = req.body;
        //Buscamos al usuario por el email
        const user = await User.findOne({
            where: { email: email }
        });

        if (!user) return res.status(404).json({ status: 404, error: "The user does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(404).json({ status: 404, error: "Incorrect password" });

        console.log("user: ", user)
        if (!user.accountConfirmed) return res.status(403).json({ status: 403, error: "Account not confirmed" });

        res.status(200).json({
            status: 200,
            message: "User allowed",
            data: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                token: generarJWT(user.id),
                profile_picture: user.profile_picture,
            }
        });

    } catch (error) {
        res.status(500).json({ status: 500, error: error.message })
    }
}

module.exports = login;