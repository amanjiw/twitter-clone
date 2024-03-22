import Image from "next/image";
import React from "react";
import Avatar from "../Avatar";

interface UserHeroProps {
	coverImage: string;
	userId: string;
}

function UserHero({ coverImage, userId }: UserHeroProps) {
	return (
		<div className="">
			<div className="bg-neutral-700 h-44 relative">
				{coverImage && (
					<Image
						src={coverImage}
						fill
						style={{ objectFit: "cover" }}
						alt="Cover Image"
					/>
				)}
				<div className="absolute -bottom-16 left-4">
					<Avatar userId={userId} isLarge hasBorder />
				</div>
			</div>
		</div>
	);
}

export default UserHero;
