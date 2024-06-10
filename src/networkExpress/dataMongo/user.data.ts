import { UserModel } from "./models/models";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config'
import { logger } from '../../utility/logger';

export type error = {
    message: string;
    code: number;
};

export const initUserListData = async () => {
    try {
        const encryptedPassword = await bcrypt.hash("abcd123456", 10);
        const user1 = new UserModel({
            id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
            role: 'admin',
            email: 'abc@gmail.com',
            password: encryptedPassword
        });
        await user1.save();
    } catch (error) {
        if (error.code === 11000) {
            logger.debug('Error: Duplicate "User id" found.');
        } else {
            logger.error('Error while inserting initial users:', error);
        }
    }
}

export async function getUserById(userId: string | string[]) {
    try {
        const user = await UserModel.findOne({ id: userId });
        return user;
    } catch (error) {
        logger.error('Error fetching user detail:', error.message);
    }
}

export async function createUser(reqBody: any, res: any) {
    try {
        // Get user input
        const { role, email, password } = reqBody;
        let error: error = {
            message: "",
            code: 0
        };

        // Validate user input
        if (!(email && password && role)) {
            error.message = "All input is required";
            error.code = 400;
            return error;
        }

        // Validate if user already exist in our database
        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            error.message = "User Already Exist. Please Login";
            error.code = 409;
            return error;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            id: uuidv4(),
            email: email.toLowerCase(),
            password: encryptedPassword,
            role: role
        });
        return user;
    } catch (error) {
        error.message = "Internal server error";
        error.code = 400;
        return error;
    }
}

export async function login(reqBody: any, res: any) {
    let error: error = {
        message: "",
        code: 0
    };
    try {
        // Get user input
        const { email, password } = reqBody;
        // Validate user input
        if (!email || !password) {
            error.message = "All input is required";
            error.code = 400;
            return error;
        }
        // Validate if user exist in our database
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user.id, email: email, role: user.role },
                process.env.TOKEN_KEY!,
                {
                    expiresIn: "2h",
                }
            );
            return token;
        }
        console.log("Invalid Credentials")
        error.message = "Invalid Credentials";
        error.code = 400;
        return error;
    } catch (err) {
        error.message = "Internal Server Error";
        error.code = 400;
        return error;
    }
}

