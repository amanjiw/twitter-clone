import React, { useState, useCallback } from "react";
import axios from "axios";

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";

import Input from "../Input";
import Modal from "../Modal";
import LoginModal from "./LoginModal";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();

	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			await axios.post("/api/register", {
				email,
				username,
				password,
				name,
			});

			//TODO: add register and login

			registerModal.onClose();
		} catch (error) {
			console.log(error);
		}
	}, [registerModal, email, password, username, name]);

	const onToggle = useCallback(() => {
		if (isLoading) return;

		registerModal.onClose();
		loginModal.onOpen();
	}, [isLoading, loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input
				placeholder="E-mail"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				disabled={isLoading}
			/>
			<Input
				placeholder="Name"
				onChange={(e) => setName(e.target.value)}
				value={name}
				disabled={isLoading}
			/>
			<Input
				placeholder="Username"
				onChange={(e) => setUsername(e.target.value)}
				value={username}
				disabled={isLoading}
			/>
			<Input
				placeholder="Password"
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				disabled={isLoading}
			/>
		</div>
	);

	const footerConttent = (
		<div className="text-neutral-400 text-center mt-4">
			<p>
				Already have an account?{" "}
				<span
					onClick={onToggle}
					className="text-white cursor-pointer hover:underline"
				>
					Sign in
				</span>
			</p>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			onClose={registerModal.onClose}
			onSubmit={onSubmit}
			title="Create an account"
			actionLabel="Register"
			body={bodyContent}
			footer={footerConttent}
		/>
	);
};

export default RegisterModal;
