import { UserModel, User } from "../models/user.model";
import { FilterQuery, UpdateQuery } from "mongoose";
import * as utils from "../utils/utils"


export async function createUser(input: User) {
  const {firstName, lastName,email, password} = input;
  try {
    return await UserModel.create({
      firstName,
      lastName,
      email,
      password: await utils.hashPassword(password)
    })
    
  } catch (error: any) {
    throw new Error(error)
    
  }
  
}

export async function findUser(query: FilterQuery<User>) {
  return await UserModel.findOne(query)

}

export async function updateUser(query: FilterQuery<User>, update: UpdateQuery<User>) {
  return await UserModel.findOneAndUpdate(query, update)
  
}