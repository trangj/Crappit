import React, { useContext } from "react";
import { IconButton, HStack, Text, useColorModeValue } from "@chakra-ui/react";
import { TriangleUpIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { UserContext } from "../../context/UserState";
import { Link, useLocation } from "react-router-dom";
import useCommentVoting from "../../hooks/comment-query/useCommentVoting";

const CommentVoting = ({ comment }) => {
	const { user } = useContext(UserContext);
	const { mutate } = useCommentVoting(comment);
	const bg = useColorModeValue(`gray.100`, `whiteAlpha.200`);
	const location = useLocation();

	const handleUpvote = () => {
		mutate({
			commentId: comment.id,
			vote: "like",
		});
	};

	const handleDownvote = () => {
		mutate({
			commentId: comment.id,
			vote: "dislike",
		});
	};

	return user ? (
		<HStack>
			{comment.user_vote === 1 ? (
				<IconButton
					aria-label="Upvote"
					onClick={handleUpvote}
					size="xs"
					icon={<TriangleUpIcon />}
					variant="ghost"
					color="orange.400"
				/>
			) : (
				<IconButton
					aria-label="Upvote"
					onClick={handleUpvote}
					size="xs"
					icon={<TriangleUpIcon />}
					variant="ghost"
					_hover={{ color: "orange.400", backgroundColor: bg }}
				/>
			)}
			<Text
				color={
					comment.user_vote === 1
						? "orange.400"
						: comment.user_vote === -1
						? "blue.600"
						: ""
				}
				fontWeight="500"
			>
				{comment.vote}
			</Text>
			{comment.user_vote === -1 ? (
				<IconButton
					aria-label="Downvote"
					onClick={handleDownvote}
					size="xs"
					icon={<TriangleDownIcon />}
					variant="ghost"
					color="blue.600"
				/>
			) : (
				<IconButton
					aria-label="Downvote"
					onClick={handleDownvote}
					size="xs"
					icon={<TriangleDownIcon />}
					variant="ghost"
					_hover={{ color: "blue.600", backgroundColor: bg }}
				/>
			)}
		</HStack>
	) : (
		<HStack>
			<IconButton
				aria-label="Upvote"
				as={Link}
				to={{
					pathname: "/login",
					state: {
						status: {
							text: "Login to vote on comments",
							severity: "error",
						},
						from: location.pathname,
					},
				}}
				size="xs"
				icon={<TriangleUpIcon />}
				variant="ghost"
				_hover={{ color: "orange.400", backgroundColor: bg }}
			/>
			<Text>{comment.vote}</Text>
			<IconButton
				aria-label="Downvote"
				as={Link}
				to={{
					pathname: "/login",
					state: {
						status: {
							text: "Login to vote on comments",
							severity: "error",
						},
						from: location.pathname,
					},
				}}
				size="xs"
				icon={<TriangleDownIcon />}
				variant="ghost"
				_hover={{ color: "blue.600", backgroundColor: bg }}
			/>
		</HStack>
	);
};

export default CommentVoting;