import fetcher from "@/libs/fetcher";
import useSWR from "swr";

const useNotification = (userId: string) => {
	const url = userId ? `/api/notifications/${userId}` : null;

	const { data, mutate, isLoading, error } = useSWR(url, fetcher);

	return {
		data,
		mutate,
		isLoading,
		error,
	};
};


export default useNotification