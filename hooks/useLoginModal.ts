import React from "react";
import { create } from "zustand";

interface LoginModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
	isOpen: true,
	onClose: () =>
		set({
			isOpen: false,
		}),
	onOpen: () =>
		set({
			isOpen: true,
		}),
}));

export default useLoginModal;
