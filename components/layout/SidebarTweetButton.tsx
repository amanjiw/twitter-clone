import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { FaFeather } from "react-icons/fa";

import useLoginModal from "@/hooks/useLoginModal";

interface SidebarTweetButtonProps {}

const SidebarTweetButton: React.FC<SidebarTweetButtonProps> = () => {
	const router = useRouter();
	const loginModal = useLoginModal();

	const onClick = useCallback(() => loginModal.onOpen(), [loginModal]);
	return (
		<div className="" onClick={onClick}>
			<div className="mt-6 lg:hidden rounded-full h-14 w-14 p-4 items-center justify-center bg-sky-500 hover:bg-opacity-80 cursor-pointer ">
				<FaFeather size={24} color="white" />
			</div>
			<div className="mt-6 hidden lg:block px-4 py-2 rounded-full bg-sky-500 bg-opacity-90 cursor-pointer transition-all">
				<p className="hidden lg:block text-center font-semibold text-white text-[20px]">
					Tweet
				</p>
			</div>
		</div>
	);
};

export default SidebarTweetButton;
