import Header from "@/components/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";

const UserView = () => {
	const router = useRouter();
	const { data: fetchedUser, isLoading } = useUser(
		router.query.userId as string
	);

	if (isLoading || !fetchedUser)
		return (
			<div className="flex justify-center items-center h-full">
				<ClipLoader color="lightblue" size={80} />
			</div>
		);

	return (
		<div>
			<Header label={fetchedUser?.name} showBackArrow />
			<UserHero
				coverImage={fetchedUser?.coverImage}
				userId={router.query.userId as string}
			/>

			<UserBio user={fetchedUser} />
		</div>
	);
};

export default UserView;
