const { User } = require("../../../../db/models/relationShips");

const confimarToken = async (req, res) => {
    
    const { token } = req.params;
    if (!token || token === "") return res.status(409).json({ status: 409, error: "There is no token" })
    const usuario = await User.findOne({ where: { token } });
    if (!usuario) return res.status(403).json({ status: 403, error: "Invalid token" });

    try {
        await usuario.update({
            accountConfirmed: true,
            token: "",
        })

        res.status(200).json({ status: 200, message: "User successfully confirmed" });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

module.exports = confimarToken;