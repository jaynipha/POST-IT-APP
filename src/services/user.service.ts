import { Post } from "../models/post.model";
import { Comment } from "../models/comment.model";
import { generateRandomAvatar } from "../utils/utils"
import { UserModel, User } from "../models/user.model";
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

export const signInService = async ({ email, password }: { email: string, password: string }) => {
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

export async function findByIdUserService(id: string) {
  try {
    const checkExistingUser = await UserModel.findOne({ _id: id });
    if (!checkExistingUser) {
      throw new AppError(400, "Invalid Credentials!")
    }
    return { data: checkExistingUser }
  } catch (error) {
    throw new AppError(500, "Something went wrong!!")
  }
}

export async function getAllUsersService() {
  try {
    const data = await UserModel.find({ isDeleted: false });
    if (!data) {
      throw new AppError(400, "No user data in the DB!")
    }
    return { data }
  } catch (error) {
    throw new AppError(500, "Something went wrong!!")
  }
}

export async function updateReplaceUserService(id: string, data: User) {
  try {
    const checkExistingUser = await UserModel.findOne({ _id: id });
    if (!checkExistingUser) {
      throw new AppError(400, "Invalid Credentials!")
    }

    const avatarUrl = await generateRandomAvatar(checkExistingUser.email);
    const updateData = {
      email: data.email || checkExistingUser.email,
      lastName: data.lastName || checkExistingUser.lastName,
      firstName: data.firstName || checkExistingUser.firstName,
      avatar: avatarUrl,
    }

    await UserModel.findByIdAndUpdate(id, updateData);
    return { data: `User with id-${id} Updated Succesfully` }
  } catch (error) {
    throw new AppError(500, "Something went wrong!!")
  }
}

export async function deleteUserService(id: string) {
  try {
    const checkExistingUser = await UserModel.findOne({ _id: id });
    if (!checkExistingUser) {
      throw new AppError(400, "Invalid Credentials!")
    }

    await UserModel.findByIdAndUpdate(id, { isDeleted: true });
    return { data: `Soft Deleted User with id-${id}` }
  } catch (error) {
    throw new AppError(500, "Something went wrong!!")
  }
}

export async function getAllUserPosts(id: string) {
  try {
    //check if user exists
    const checkExistingUser = await UserModel.findOne({ _id: id });
    if (!checkExistingUser) {
      throw new AppError(400, "Invalid Credentials!")
    }
    //find all posts where user-id = id
    const userPosts = await Post.find({ userId: id })
    return { data: userPosts }
  } catch (error) {
    throw new AppError(500, "Something went wrong!!")
  }
}

export async function getUserSpecificPostService(userId: string, postId: string) {
  try {
    //check if user exists
    const checkExistingUser = await UserModel.findOne({ _id: userId });
    if (!checkExistingUser) {
      throw new AppError(400, "Invalid Credentials!")
    }
    //find post where user-id = userId and _id = postId
    const specificPost = await Post.findOne({ userId, _id: postId })
    return { data: specificPost }
  } catch (error) {
    throw new AppError(500, "Something went wrong!!")
  }
}

export async function getUserPostCommentsService(userId: string, postId: string) {
  try {
    //check if user exists
    const checkExistingUser = await UserModel.findOne({ _id: userId });
    if (!checkExistingUser) {
      throw new AppError(400, "Invalid Credentials!")
    }
    //find post where user-id = userId and _id = postId
    const checkExistingPost = await Post.findOne({ _id: postId });
    if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
      throw new AppError(400, "Post Not Available")
    }

    const getUserPostComments = await Comment.find({ postId });
    return { data: getUserPostComments }
  } catch (error: any) {
    throw new AppError(500, error)
  }
}

export async function getUserSpecificPostCommentService(userId: string, postId: string, id: string) {
  try {
    //check if user exists
    const checkExistingUser = await UserModel.findOne({ _id: userId });
    if (!checkExistingUser) {
      throw new AppError(400, "Invalid Credentials!")
    }
    //find post where user-id = userId and _id = postId
    const checkExistingPost = await Post.findOne({ _id: postId });
    if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
      throw new AppError(400, "Post Not Available")
    }

    const getUserPostComment = await Comment.findOne({ postId, userId, _id: id });
    return { data: getUserPostComment }
  } catch (error: any) {
    throw new AppError(500, error)
  }
}