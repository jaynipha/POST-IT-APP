import { Response, Request, NextFunction } from "express";
import {
    createPostService,
    createCommentService,
    getPostCommentService,
    deletePostWithIdService,
    getOnePostCommentService,
    editOnePostCommentService,
    deleteCommentWithIdService

} from "../services/post.service";
import * as service  from "../services/post.service"

export async function createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { data } = await createPostService(req.body);
    
        return res.status(201).send({ status: true, data });

    } catch (error) {
      console.log(error);
        next(error)
    }
}

export async function createComment(req: Request, res: Response, next: NextFunction) {
    try {
        const { data } = await createCommentService(req.params.postId, req.body);
        return res.status(201).send({ status: true, data });

    } catch (error) {
        next(error)
    }
};

export async function getPostComments(req: Request, res: Response, next: NextFunction) {
    try {
        const { data } = await getPostCommentService(req.params.postId);
        return res.status(200).send({ status: true, data });

    } catch (error) {
        next(error)
    }
}

export async function getOnePostComment(req: Request, res: Response, next: NextFunction) {
    try {
        const { data } = await getOnePostCommentService(req.params.postId, req.params.id);
        return res.status(200).send({ status: true, data });

    } catch (error) {
        next(error)
    }
}

export async function editOnePostComment(req: Request, res: Response, next: NextFunction) {
    try {
        const { data } = await editOnePostCommentService(req.params.postId, req.params.id,  req.body);
        return res.status(200).send({ status: true, data });

    } catch (error) {
        next(error)
    }
}

export async function deletePostWithId(req: Request, res: Response, next: NextFunction) {
    try {
        const { data } = await deletePostWithIdService(req.params.id, req.params.id);
        return res.status(200).send({ status: true, data });

    } catch (error) {
        next(error)
    }
}
export async function deleteCommentWithId(req: Request, res: Response, next: NextFunction) {
    try {
        const { data } = await deleteCommentWithIdService(req.params.postId, req.params.id, req.params.userId);
        return res.status(200).send({ status: true, data });

    } catch (error) {
        next(error)
    }
}

