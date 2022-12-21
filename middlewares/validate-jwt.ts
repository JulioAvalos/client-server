// @ts-ignore
const jwt = require('jsonwebtoken');

export const validateJWT = (req: any, res: any, next: any) => {

    try {

        const token = req.header('x-token');

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Invalid request, there is no request token found or it has already expired'
            })
        }

        const {uid} = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid request token - Expired'
        })
    }

}
