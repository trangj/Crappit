import { useQueryClient, useMutation } from "react-query";
import { createStandaloneToast } from "@chakra-ui/toast";
import axios from "../../axiosConfig";
import { Comment } from "src/types/entities/comment";
import { Error } from "src/types/error";
import { Post } from "src/types/entities/post";

interface Response {
	comment: Comment;
}

async function addComment({ newComment }: { newComment: Comment; }) {
	try {
		const res = await axios.post(`/api/comment`, newComment);
		return res.data;
	} catch (err) {
		throw err.response.data;
	}
}

export default function useAddComment(post: Post) {
	const queryClient = useQueryClient();
	return useMutation<Response, Error, any, any>(addComment, {
		onSuccess: (res) => {
			queryClient.setQueryData(["comments", String(post.id)], (initialData: any) => [res.comment, ...initialData]);
		},
		onError: (err) => {
			const toast = createStandaloneToast();
			toast({
				description: err.status.text,
				status: err.status.severity,
			});
		},
	});
}
