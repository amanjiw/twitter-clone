import useCurrentUser from "@/hooks/useCurrentUser";
import useNotification from "@/hooks/useNotification";
import React, { FC, useEffect } from "react";
import { BsTwitter } from "react-icons/bs";

interface NotificationsFeedProps {}

const NotificationsFeed: FC<NotificationsFeedProps> = ({}) => {
	const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
	const { data: fetchedNotifications } = useNotification(currentUser?.id);

	useEffect(() => {
		mutateCurrentUser;
	}, [mutateCurrentUser]);

	if (fetchedNotifications.lenght === 0)
		return (
			<div className="text- to-neutral-600 text-center p-6 text-xl">
				No notifications
			</div>
		);

	return (
		<div className="flex flex-col">
			{fetchedNotifications.map((notification: Record<string, any>) => {
				return (
					<div
						key={notification?.id}
						className="flex flex-row items-center p-6 gap-4 border-b-[1px] text-neutral-800"
					>
						<BsTwitter color="#ffff" />
						<p className="text-white">{notification?.body}</p>
					</div>
				);
			})}
		</div>
	);
};

export default NotificationsFeed;
