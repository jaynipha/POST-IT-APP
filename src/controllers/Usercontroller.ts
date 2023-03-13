import { Response, Request, NextFunction } from "express";
import {
  getAllUserPosts,
  signInService,
  createUserService,
  deleteUserService,
  getAllUsersService,
  findByIdUserService,
  updateReplaceUserService,
  getUserSpecificPostService,
  getUserPostCommentsService,
  getUserSpecificPostCommentService
} from "../services/user.service"



export async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { data, token } = await createUserService(req.body);
    return res.status(201).send({ status: true, data, token });

  } catch (error) {
    next(error)
  }
};

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { data, token } = await signInService(req.body);
    return res.status(200).send({ status: true, data, token });

  } catch (error) {
    next(error)
  }
};

export async function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.id
    const { data } = await findByIdUserService(userId);
    return res.status(200).send({ status: true, data });

  } catch (error) {
    next(error)
  }
};

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { data } = await getAllUsersService();
    return res.status(200).send({ status: true, data });

  } catch (error) {
    next(error)
  }
};

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { data } = await updateReplaceUserService(req.params.id, req.body);
    return res.status(200).send({ status: true, data });

  } catch (error) {
    next(error)
  }
};

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { data } = await deleteUserService(req.params.id);
    return res.status(200).send({ status: true, data });

  } catch (error) {
    next(error)
  }
};

export async function fetchAllUserSpecificPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const { data } = await getAllUserPosts(req.params.userId);
    return res.status(200).send({ status: true, data });

  } catch (error) {
    next(error)
  }
};


export async function getUserSpecificPost(req: Request, res: Response, next: NextFunction) {
  try {
    const { data } = await getUserSpecificPostService(req.params.userId, req.params.postId);
    return res.status(200).send({ status: true, data });

  } catch (error) {
    next(error)
  }
};

export async function getUserSpecificPostComments(req: Request, res: Response, next: NextFunction) {
  try {
    const { data } = await getUserPostCommentsService(req.params.userId, req.params.postId);
    return res.status(200).send({ status: true, data });

  } catch (error) {
    next(error)
  }
};

export async function getUserSpecificPostComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { data } = await getUserSpecificPostCommentService(req.params.userId, req.params.postId, req.params.id);
    return res.status(200).send({ status: true, data });

  } catch (error) {
    next(error)
  }
};
