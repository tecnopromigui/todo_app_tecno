const bcrypt = require("bcrypt");
const generarIdToken = require("../../helper/User/generarIdToken");
const { User } = require("../../../../db/models/relationShips");
const { emailRegistro } = require("../../helper/User/email");


const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        console.log("entro a la funcion", req.body);

        console.log("busca si el email ya existe")
        //Verificamos si ya existe el usuario con el mismo correo
        const emailVerify = await User.findOne({
            where: {
                email: email
            }
        })

        console.log("verifica si ya existe")
        // Si el usuario ya existe, retornamos un error
        if (emailVerify) {
            return res.status(406).json({ status: 406, error: "The email is already registered" });
        }

        console.log("Paso la validacion")
        //Hashear la contraseña
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        //Creamos el usuario en la base de datos
        console.log("crea el usuario")
        const user = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
        });

        console.log("genera el token")
        //Generamos el token
        user.token = generarIdToken();

        console.log("guarda el usuario")
        //Guardamos el usuario en la BDD con el token
        await user.save();
        //Enviamos el correo de verificacion
        console.log("envia el correo")
        await emailRegistro(user);

        //Informamos al usuario de revisar el correo
        res.status(201).json({ status: 201, message: "User successfully registered, check email" });

    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

module.exports = registerUser;
