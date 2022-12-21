// @ts-ignore
const jwt = require("jsonwebtoken");

const generateJWT = (payload: any) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_KEY,
            {
                expiresIn: "120000", //ms
            },
            (err: any, token: unknown) => {
                if (err) {
                    console.log(err);
                    reject("No se pudo generar el JWT");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

const verifyJWT = (token = "") => {
    try {
        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        return [true, uid];
    } catch (error) {
        console.log(error);
        return [false, null];
    }
};

module.exports = {
    generateJWT,
    verifyJWT,
};
