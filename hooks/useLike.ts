import React, { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import usePost from "./usePost";
import usePosts from "./usePosts";
import useLoginModal from "./useLoginModal";
import toast from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
	const { data: currentUser } = useCurrentUser();
	const { data: fetchedPost, mutate: mutatePost } = usePost(postId);
	const { mutate: mutatePosts } = usePosts(userId);
	const loginModal = useLoginModal();

	const isLiked = useMemo(() => {
		const list: any[] = fetchedPost?.likedIds || [];

		return list.includes(currentUser?.id);
	}, [currentUser?.id, fetchedPost?.likedIds]);

	const toggleLike = useCallback(async () => {
		if (!currentUser) return loginModal.onOpen();
		else
			try {
				let request;
				if (isLiked)
					request = () =>
						axios.delete("/api/like", { data: { postId } });
				else request = () => axios.post("/api/like", { postId });

				await request();
				mutatePost();
				mutatePosts();

				toast.success("Success");
			} catch (error) {
				console.log(error);
				toast.error("Somthing went wrong");
			}
	}, [currentUser, isLiked, postId, mutatePost, mutatePosts, loginModal]);

	//

	return {
		isLiked,
		toggleLike,
	};
};

export default useLike;
