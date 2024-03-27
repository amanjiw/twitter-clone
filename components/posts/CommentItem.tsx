import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import React, {
	FC,
	useCallback,
	MouseEvent,
	useMemo,
	MouseEventHandler,
} from "react";
import Avatar from "../Avatar";

interface CommentItemProps {
	data: Record<string, any>;
}

const CommentItem: FC<CommentItemProps> = ({ data }) => {
	const router = useRouter();

	const goToUser = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();

			router.push(`/users/${data?.user?.id}`);
		},
		[data, router]
	);

	const createdAt = useMemo(() => {
		if (!data?.createdAt) return null;
		return formatDistanceToNowStrict(new Date(data.createdAt));
	}, [data?.createdAt]);

	return (
		<div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer transition hover:bg-neutral-900">
			<div className="flex flex-row items-center gap-3 ">
				<Avatar userId={data?.user?.id} />
				<div className="">
					<div className="flex flex-row items-center gap-2">
						<p
							className="text-white font-semibold cursor-pointer hover:underline"
							onClick={goToUser as MouseEventHandler}
						>
							{data?.user?.name}
						</p>
						<span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
							@{data?.user?.username}
						</span>
						<span className="text-neutral-500 text-sm">
							{createdAt}
						</span>
					</div>
					<div className=" text-white mt-1">{data?.body}</div>
				</div>
			</div>
		</div>
	);
};

export default CommentItem;
