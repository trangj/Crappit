import { createStandaloneToast } from "@chakra-ui/toast";
import { useMutation } from "react-query";
import axios from "../../axiosConfig";

async function addModerator({ topic, username }: { topic: string, username: string; }) {
	try {
		const res = await axios.post(`/api/moderation/topic/${topic}`, {
			username,
		});
		return res.data;
	} catch (err) {
		throw err.response.data;
	}
}

export default function useAddModerator() {
	return useMutation(addModerator, {
		onSettled: (data, error) => {
			const res = data || error;
			const toast = createStandaloneToast();
			toast({
				description: res.status.text,
				status: res.status.severity,
			});
		},
	});
}