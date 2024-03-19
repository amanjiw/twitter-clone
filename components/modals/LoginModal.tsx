import React, { useCallback, useState } from "react";

import useLoginModal from "@/hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
	const loginModal = useLoginModal();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = useCallback(async () => {
		try {
			setIsLoading(true);

			//TODO: add login

			loginModal.onClose();
		} catch (error) {
			console.log(error);
		}
	}, [loginModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Input
				placeholder="E-mail"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
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

	return (
		<Modal
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			onClose={loginModal.onClose}
			onSubmit={onSubmit}
			actionLabel="sign in"
			body={bodyContent}
		/>
	);
};

export default LoginModal;
