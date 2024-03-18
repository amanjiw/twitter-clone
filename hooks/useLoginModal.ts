import React from "react";
import { create } from "zustand";

interface LoginModalStore {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
	isOpen: false,
	onClose: () => {
		isOpen: false;
	},
	onOpen: () => {
		isOpen: true;
	},
}));

export default useLoginModal;
