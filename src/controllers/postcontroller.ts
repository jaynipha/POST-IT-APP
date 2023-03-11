// export const getAllPosts = async (req:Request, res:Response) => {

//   try {
//     const postMsg = await postMessage.find(); // finding posts from a model is time consuming thats why it is an asynchronous task add await before it.
//     res.status(200).json(postMsg); // if no err, them send status 200 i.e success and send response as json. array of posts.
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
// export const createPost = async (req, res) => {
//   const post = req.body;
//   const newPost = new postMessage(post);
//   try {
//     newPost.save();
//     res.status(200).json(newPost); // suceessful creation is status 201
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const updatePosts = async (req, res) => {
//   const { id: _id } = req.params;
//   const post = req.body;

//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     res.status(404).json({ message: "No post with this id." });
//   }
//   const updatedPost = await postMessage.findByIdAndUpdate(_id, post, {
//     new: true,
//   });
//   res.status(200).json(updatedPost);
// };
// export const deletePosts = async (req, res) => {
//   const { id: _id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     res.status(404).json({ message: "No post with this id." });
//   }

//   await postMessage.findByIdAndDelete(_id);
//   res.status(200).json("The post has been deleted.");
// };

// export const likePosts = async (req, res) => {
//   const { id: _id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(_id)) {
//     res.status(404).json({ message: "No post with this id." });
//   }
//   const post = await postMessage.findById(_id);

//   const updatedPost = await postMessage.findByIdAndUpdate(
//     _id,
//     { likeCount: post.likeCount + 1 },
//     {
//       new: true,
//     }
//   );
//   res.status(200).json(updatedPost);
// };
// export const createPost = async (req:Request, res:Response) => {
// 	const { userId, text, media } = req.body;

// 	try {
// 		const newPost = new ({ userId });
// 		await post.save();
// 		return res.status(201).send({ status: true, data: newRoomType });
// 	} catch (error:any) {
// 		return res.status(404).json(error.message);
//   };

//import 