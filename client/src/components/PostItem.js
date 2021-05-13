import React, { useState } from "react";
import {
	Box,
	Heading,
	Text,
	HStack,
	Divider,
	Button,
	IconButton,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import Voting from "./Voting";
import { Link } from "react-router-dom";
import moment from "moment";

const PostItem = ({ post }) => {
	const [open, setOpen] = useState(false);

	return (
		<Box mb="2" borderWidth="1px" borderRadius="lg">
			<HStack m="3">
				<Voting post={post} />
				<Box>
					<Heading>
						<Link to={`/t/${post.topic}/p/${post._id}`}>{post.title}</Link>
					</Heading>
					<Text fontSize="sm">
						<Link to={`/t/${post.topic}`} style={{ fontWeight: "bold" }}>
							t/{post.topic}
						</Link>{" "}
						| Posted by <Link to={`/u/${post.authorId}`}>u/{post.author}</Link>{" "}
						{moment(post.date).fromNow()}
					</Text>
					<HStack mt="2">
						<IconButton
							size="xs"
							onClick={() => setOpen(!open)}
							icon={open ? <MinusIcon /> : <AddIcon />}
						/>
						<Button
							size="xs"
							as={Link}
							to={`/t/${post.topic}/p/${post._id}#comments`}
						>
							{post.comments.length} Comments
						</Button>
					</HStack>
				</Box>
			</HStack>
			{open && (
				<>
					<Divider />
					<Box id={post._id} m="3">
						<img
							alt={post.imageName}
							src={post.imageURL}
							style={{
								display: "block",
								maxWidth: "100%",
								maxHeight: "400px",
								marginLeft: "auto",
								marginRight: "auto",
							}}
						/>
						<Text mt="3">{post.content}</Text>
					</Box>
				</>
			)}
		</Box>
	);
};

export default PostItem;
