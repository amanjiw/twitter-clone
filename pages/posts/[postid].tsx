import Form from "@/components/Form";
import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

const PostView = () => {
	const router = useRouter();
	const { postid } = router?.query;

	const { data: fetchedPost, isLoading } = usePost(postid as string);

	if (!fetchedPost || isLoading) {
		return (
			<div className="flex justify-center items-center h-full text-white">
				<ClipLoader size={80} color="lightblue" />
			</div>
		);
	}

	return (
		<>
			<Header label="Tweet" showBackArrow />
			<PostItem data={fetchedPost} />
			<Form
				postId={postid as string}
				isComment
				placeholder="Tweet your reply"
			/>
		</>
	);
};

export default PostView;
