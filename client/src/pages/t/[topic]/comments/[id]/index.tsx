import React from "react";
import PostCard from "../../../../../components/post/PostCard";
import CommentCard from "../../../../../components/comment/CommentCard";
import TopicPostCard from "../../../../../components/topic/TopicPostCard";
import usePost, { fetchPost } from "../../../../../hooks/post-query/usePost";
import useTopic, { fetchTopic } from "../../../../../hooks/topic-query/useTopic";
import { fetchComments } from "../../../../../hooks/comment-query/useComments";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { PostType } from "src/types/entities/post";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const sort = query.sort ? query.sort as string : "";
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(['topic', query.topic], () => fetchTopic(query.topic as string));
	await queryClient.prefetchQuery(['post', query.id], () => fetchPost(query.id as string));
	await queryClient.prefetchQuery(['comments', query.id, sort], () => fetchComments(query.id as string, sort));
	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	};
};

const PostPage = () => {
	const router = useRouter();
	const { id, topic } = router.query;
	const {
		data
	} = usePost(id as string);
	const {
		data: topicData,
	} = useTopic(topic as string);

	if (!data || !topicData) return <div>Loading...</div>;

	const description = `${data.vote} votes, ${data.number_of_comments} comments. ${data.type === PostType.TEXT ? data.content.slice(0, 155) + ' ...' : topicData.description.slice(0, 155)}`;
	const title = `${data.title} : ${data.topic}`;
	const url = `https://crappit.me/t/${topicData?.title}/comments/${data.id}`;
	const image = `https://crappit.imgix.net/${data.image_name}`;

	return (
		<div className="mt-16 container mx-auto max-w-5xl">
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta property="og:title" content={title} />
				<meta property="og:type" content={data.type === PostType.PHOTO ? 'image' : 'website'} />
				{data.type === PostType.PHOTO ? (<meta property="og:image" content={image} key="default" />) : null}
				<meta property="og:url" content={url} />
				<meta property="og:description" content={description} />
			</Head>
			<div className="flex gap-5">
				<div className="flex flex-col w-full">
					<PostCard post={data} topic={topicData} />
					<CommentCard post={data} topic={topicData} />
				</div>
				<div className="flex-col w-80 hidden lg:flex">
					<div style={{ width: 'inherit' }}>
						<TopicPostCard topicData={topicData} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PostPage;
