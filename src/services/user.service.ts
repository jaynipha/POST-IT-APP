// 
import { UserModel, User } from "../models/user.model";
import { FilterQuery, UpdateQuery } from "mongoose";
import { generateRandomAvatar } from "../utils/utils"
import { AppError } from "../middlewares/errorhandler";
import { hashPassword, createToken, comparePassword } from '../utils/toolbox'

export async function createUserService(input: User) {
  const { firstName, lastName, email, password, role } = input;
  try {
    const checkExistingUser = await UserModel.findOne({ email });
    if (checkExistingUser !== null) {
      throw new AppError(400, "User Exist Already!!")
    }
    const hashedPassword = hashPassword(password);
    const avatarUrl = await generateRandomAvatar(email);

    const data = {
      email,
      lastName,
      firstName,
      avatar: avatarUrl,
      role: role || 'user',
      password: hashedPassword,
    }
    const newUser = await UserModel.create(data);
    await newUser.save();

    const token = createToken({ role, email, id: newUser.id })
    return { data: newUser, token }
  } catch (error) {
    throw new AppError(500, "Something went wrong!!")
  }
}

export const signIn = async ({ email, password }: { email: string, password: string }) => {

  try {
    const checkExistingUser = await UserModel.findOne({ email });

    if (!checkExistingUser) {
      throw new AppError(400, "Invalid Credentials!")
    }

    const checkPasswordValidity = comparePassword(password, checkExistingUser.password);

    if (!checkPasswordValidity) {
      throw new AppError(400, "Invalid Credentials!")
    }

    const token = createToken({ role: checkExistingUser.role, email, id: checkExistingUser.id });
    return { data: checkExistingUser, token }

  } catch (error) {
    throw new AppError(500, "Something went wrong!!")
  }
}

// export async function findUser(query: FilterQuery<User>) {
//   return await UserModel.findOne(query)

// }

// export async function updateUser(query: FilterQuery<User>, update: UpdateQuery<User>) {
//   return await UserModel.findOneAndUpdate(query, update)

// }