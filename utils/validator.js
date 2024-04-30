import { body, validationResult } from "express-validator";

export function validate( validations){
    return async (req,res,next) => {
        for(let validaton of validations){
            const result = await validaton.run(req);
            if(result.errors.length){
                break;
            }
        }

        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }

        res.status(400).json({errors: errors.array()});
    };
};


export const signupValidations = [body('name').notEmpty().withMessage("Name is required"),
                                body('email').notEmpty().withMessage("Email is required").trim().isEmail().withMessage("Shoul be a email"),
                                body('password').notEmpty().withMessage("Password is required").isLength({min: 6}).withMessage("Password should have atleast 6 characters")]


export const loginValidations = [body('email').notEmpty().withMessage("Email is required").trim().isEmail().withMessage("Shoul be a email"),
                                body('password').notEmpty().withMessage("Password is required").isLength({min: 6}).withMessage("Password should have atleast 6 characters")]


export const chatValidations = [body('message').notEmpty().withMessage("Cannot prompt empty messages").trim()]