import { AppError } from "../middlewares/errorhandler";
import { Post, PostSchemaType } from "../models/post.model";
import { Comment, CommentSchemaType } from "../models/comment.model";


export async function createPostService(input: PostSchemaType) {
    try {
        const newPost = await Post.create(input);
        await newPost.save();

        return { data: newPost }
    } catch (error: any) {
      console.log(error.message);
        throw new AppError(500, error)
    }
}

export async function createCommentService(postId: string, { text, userId }: CommentSchemaType) {
    try {

        const data = {
            postId, text, userId
        }

        const checkExistingPost = await Post.findOne({ _id: postId });
        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new AppError(400, "Post Not Available")
        }

        const newComment = await Comment.create(data);
      const dataId = await newComment.save();
     await  Post.findByIdAndUpdate(postId,{$push:{comments: dataId._id}})

        return { data: newComment }
    } catch (error: any) {
        throw new AppError(500, error)
    }
}

export async function getPostCommentService(postId: string) {
    try {

        const checkExistingPost = await Post.findOne({ _id: postId });
        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new AppError(400, "Post Not Available")
        }

        const getPostComments = await Comment.find({ postId });

        return { data: getPostComments }
    } catch (error: any) {
        throw new AppError(500, error)
    }
}

export async function getOnePostCommentService(postId: string, id: string) {
    try {
        const checkExistingPost = await Post.findOne({ _id: postId });

        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new AppError(400, "Post Not Available")
        }

        const getPostComment = await Comment.findOne({ _id: id });
        if (!getPostComment || getPostComment.isDeleted !== false) {
            throw new AppError(400, "Post Not Available")
        }
        return { data: getPostComment }
    } catch (error: any) {
        throw new AppError(500, error)
    }
}

export async function editOnePostCommentService(postId: string, commentId: string, data: CommentSchemaType) {
    try {
        //first, check if post exist and throw error if not available
        const checkExistingPost = await Post.findOne({ _id: postId });

        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new AppError(400, "Post Not Available")
        }
        //check if comment exist and throw error if not available
        const getPostComment = await Comment.findOne({ _id: commentId, userId: data.userId });
        if (!getPostComment || getPostComment.isDeleted !== false) {
            throw new AppError(400, "Comment Not Available")
        }

        //check if the post belongs to the user
        if (getPostComment.userId.toString() !== data.userId as unknown as string) {
            throw new AppError(400, "Can't edit comment")
        }
        //update comment with ID
        await Comment.findByIdAndUpdate(commentId, data);
        return { data: `Comment with id-${commentId} have been updated` }
    } catch (error: any) {
        throw new AppError(500, error)
    }
}

export async function deletePostWithIdService(postId: string, id: string,) {
    try {
        //first, check if post exists and throw error if not available
        const checkExistingPost = await Post.findOne({ _id: postId });

        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new AppError(400, "Post Not Available")
        }

        //SOFT DELETE - update is deleted to true.
        await Post.findByIdAndUpdate(id, { isDeleted: true });


        //bulk update all comments to deleted since the original post have been deleted.
        // const updateOperation = {
        //     $set: { isDeleted: true }
        // };

        // const filter = { postId };
        // await Comment.updateMany(filter, updateOperation);

        return { data: `Post with id-${id} have been soft-deleted` }
    } catch (error: any) {
        throw new AppError(500, error)
    }
}

export async function deleteCommentWithIdService(postId: string, id: string, userId: string) {
    try {
        //first, check if post exists and throw error if not available
        const checkExistingPost = await Post.findOne({ _id: postId });

        if (!checkExistingPost || checkExistingPost.isDeleted !== false) {
            throw new AppError(400, "Post Not Available")
        }
      
      //check if comment exist and throw error if not available
        const getPostComment = await Comment.findOne({ _id: id, userId: userId });
        if (!getPostComment || getPostComment.isDeleted !== false) {
            throw new AppError(400, "Comment Not Available")
        }

      //  if (getPostComment.userId.toString() !== data.userId as unknown as string) {
      //       throw new AppError(400, "Can't edit comment")
      //   }

        //SOFT DELETE - update is deleted to true.
      await Comment.findByIdAndUpdate(id, { isDeleted: true });
     await  Post.findByIdAndUpdate(postId,{$pull:{comments:id}})
      


      

        return { data: `comment with id-${id} have been soft-deleted` }
    } catch (error: any) {
        throw new AppError(500, error)
    }
}
 