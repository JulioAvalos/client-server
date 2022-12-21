import Router from 'express';
import {login} from "../controller/auth";
import {validateFields} from "../middlewares/validate-fields";
import {check} from "express-validator";

const router = Router();

router.post("/", [
    check('email', "Email must be valid").isEmail(),
    check('password')
        .not().isEmpty()
        .withMessage('Password required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
        .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)
        .withMessage('Password must have at least one uppercase, one lowercase, one number and one special character'),
    validateFields
], login);

module.exports = router;
