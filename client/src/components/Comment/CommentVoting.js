import React, { useContext } from "react";
import { IconButton, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { UserContext } from "../../context/UserState";
import useCommentVoting from "../../hooks/comment-query/useCommentVoting";

const CommentVoting = ({ comment }) => {
	const { user, setUser } = useContext(UserContext);
	const { mutate } = useCommentVoting(comment, setUser);
	const bg = useColorModeValue(`gray.100`, `whiteAlpha.200`);

	const handleUpvote = () => {
		mutate({
			commentId: comment._id,
			vote: "like",
		});
	};

	const handleDownvote = () => {
		mutate({
			commentId: comment._id,
			vote: "dislike",
		});
	};

	return (
		<HStack>
			{user.likedComments.includes(comment._id) ? (
				<IconButton
					onClick={handleUpvote}
					size="xs"
					icon={<ArrowUpIcon />}
					variant="ghost"
					color="orange.400"
				/>
			) : (
				<IconButton
					onClick={handleUpvote}
					size="xs"
					icon={<ArrowUpIcon />}
					variant="ghost"
					_hover={{ color: "orange.400", backgroundColor: bg }}
				/>
			)}
			<Text
				color={
					user.likedComments.includes(comment._id)
						? "orange.400"
						: user.dislikedComments.includes(comment._id)
						? "blue.600"
						: ""
				}
			>
				{comment.vote}
			</Text>
			{user.dislikedComments.includes(comment._id) ? (
				<IconButton
					onClick={handleDownvote}
					size="xs"
					icon={<ArrowDownIcon />}
					variant="ghost"
					color="blue.600"
				/>
			) : (
				<IconButton
					onClick={handleDownvote}
					size="xs"
					icon={<ArrowDownIcon />}
					variant="ghost"
					_hover={{ color: "blue.600", backgroundColor: bg }}
				/>
			)}
		</HStack>
	);
};

export default CommentVoting;
