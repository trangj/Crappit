import { createStandaloneToast } from "@chakra-ui/toast";
import { useMutation } from "react-query";
import { Topic } from "src/types/entities/topic";
import axios from "../../axiosConfig";

async function updateTopic({ topic, formData }: { topic: string, formData: FormData; }) {
	try {
		const res = await axios.put(`/api/topic/${topic}`, formData);
		return res.data;
	} catch (err) {
		throw err.response.data;
	}
}

export default function useUpdateTopic(topic: Topic) {
	return useMutation(updateTopic, {
		onSuccess: (res) => {
			topic.description = res.topic.description;
			topic.image_url = res.topic.image_url;
			topic.image_name = res.topic.image_name;
		},
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