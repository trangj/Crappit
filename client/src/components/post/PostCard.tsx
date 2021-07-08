import React, { useState } from "react";
import DeletePostModerator from "./DeletePostModerator";
import DeletePost from "./DeletePost";
import UpdatePost from "./UpdatePost";
import Voting from "./Voting";
import Card from "../utils/Card";
import Link from "next/link";
import { useUser } from "../../context/UserState";
import { Box, Image, Heading, Text, HStack, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Post } from "src/types/entities/post";
import { Topic } from "src/types/entities/topic";

type Props = {
	post: Post,
	topic: Topic;
};

const PostCard = ({ post, topic }: Props) => {
	const { user } = useUser();
	const [openEdit, setOpenEdit] = useState(false);

	return (
		<Card>
			<HStack spacing="0">
				<Box mb="auto">
					<Voting post={post} />
				</Box>
				<Box width="100%">
					<Text fontSize="xs">
						<Link passHref href={`/t/${post.topic}`}>
							<a style={{ fontWeight: "bold" }}>
								t/{post.topic}
							</a>
						</Link>{" "}
						| Posted by{" "}
						<Link href={`/user/${post.author_id}`} passHref><a>u/{post.author}</a></Link>{" "}
						{dayjs(post.created_at).fromNow()}
					</Text>
					{post.type === "link" ? (
						<a href={post.content} target="_blank" rel="noopener noreferrer">
							<Heading size="lg">{post.title}</Heading>
						</a>
					) : (
						<Heading size="lg">{post.title}</Heading>
					)}
					{openEdit ? (
						<UpdatePost
							post={post}
							openEdit={openEdit}
							setOpenEdit={setOpenEdit}
						/>
					) : (
						<>
							{post.type === "text" && <Text mt="1">{post.content}</Text>}
							{post.type === "photo" && (
								<Image
									alt={post.image_name}
									src={post.image_url}
									maxHeight="400px"
									mx="auto"
									pt="3"
								/>
							)}
							<HStack mt="1">
								<Button size="sm" variant="ghost">
									{post.number_of_comments}
									{post.number_of_comments === 1 ? " Comment" : " Comments"}
								</Button>
								{user && user.id === post.author_id && (
									<>
										<DeletePost post={post} />
										{post.type === "text" && (
											<Button
												size="sm"
												variant="ghost"
												onClick={() => setOpenEdit(!openEdit)}
											>
												Edit
											</Button>
										)}
									</>
								)}
								{user &&
									user.id !== post.author_id &&
									topic.user_moderator_id && (
										<DeletePostModerator post={post} />
									)}
							</HStack>
						</>
					)}
				</Box>
			</HStack>
		</Card>
	);
};

export default PostCard;