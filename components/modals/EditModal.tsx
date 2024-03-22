import React, { useCallback, useEffect, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import axios from "axios";
import toast from "react-hot-toast";
import useEditModal from "@/hooks/useEditModal";
import Modal from "../Modal";
import Input from "../Input";
import ImageUpload from "../ImageUpload";

const EditModal = () => {
	const { data: currentUser } = useCurrentUser();
	const { mutate: mutateFetchedUser } = useUser(currentUser?.id);
	const editModal = useEditModal();

	const [profileImage, setProfileImage] = useState("");
	const [coverImage, setCoverImage] = useState("");
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [bio, setBio] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setProfileImage(currentUser?.profileImage);
		setCoverImage(currentUser?.coverImage);
		setBio(currentUser?.bio);
		setUsername(currentUser?.username);
		setName(currentUser?.name);
	}, [currentUser]);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);
			await axios.patch("/api/edit", {
				bio,
				name,
				username,
				coverImage,
				profileImage,
			});

			mutateFetchedUser();
			toast.success("Updated!");
			editModal.onClose();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, [
		bio,
		name,
		username,
		coverImage,
		profileImage,
		editModal,
		mutateFetchedUser,
	]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input
				placeholder="Name"
				onChange={(event) => setName(event.target.value)}
				value={name}
				disabled={isLoading}
			/>
			<Input
				placeholder="Username"
				onChange={(event) => setUsername(event.target.value)}
				value={username}
				disabled={isLoading}
			/>
			<Input
				placeholder="Bio"
				onChange={(event) => setBio(event.target.value)}
				value={bio}
				disabled={isLoading}
			/>
			<ImageUpload
				value={profileImage}
				disabled={isLoading}
				onChenge={(image) => setProfileImage(image)}
				lable="Upload profile image"
			/>
			<ImageUpload
				value={coverImage}
				disabled={isLoading}
				onChenge={(image) => setCoverImage(image)}
				lable="Upload cover image"
			/>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={editModal.isOpen}
			title="Edit your profile"
			actionLabel="Save"
			onClose={editModal.onClose}
			onSubmit={onSubmit}
			body={bodyContent}
		/>
	);
};

export default EditModal;
