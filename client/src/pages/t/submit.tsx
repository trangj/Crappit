import React from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import TextFieldForm from "../../ui/TextFieldForm";
import FileFieldForm from "../../ui/FileFieldForm";
import useAddTopic from "../../hooks/topic-query/useAddTopic";
import { Button, Card, Divider } from "../../ui";
import Head from "next/head";
import { GetServerSideProps } from "next";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const FILE_SIZE = 10485760;
const schema = yup.object({
	title: yup
		.string()
		.required("Enter a title for your topic")
		.matches(/^(\S+$)/, "Title cannot have any white space"),
	description: yup.string().required("Enter a description about your topic"),
	file: yup
		.mixed()
		.test("fileSize", "File Size is too large", (value) =>
			value === undefined ? true : value.size <= FILE_SIZE
		)
		.test("fileType", "Unsupported File Format", (value) =>
			value === undefined ? true : SUPPORTED_FORMATS.includes(value.type)
		),
});

interface FormValues {
	title: string,
	description: string,
	file: File | "";
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	if (!req.cookies.token) {
		return {
			redirect: {
				destination: '/login',
				permanent: false
			}
		};
	}
	return {
		props: {}
	};
};

const AddTopic = () => {
	const { isLoading, mutate } = useAddTopic();
	const handleSubmit = ({ title, description, file }: FormValues) => {
		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("file", file);
		mutate({ formData });
	};
	const initialValues: FormValues = { title: "", description: "", file: "" };

	return (
		<div className="mt-16 container mx-auto max-w-5xl">
			<Head>
				<title>Create Topic</title>
			</Head>
			<Card className="p-3 flex flex-col gap-2">
				<h5>Create a topic</h5>
				<Divider />
				<Formik
					initialValues={initialValues}
					onSubmit={handleSubmit}
					validationSchema={schema}
				>
					{({ setFieldValue, values }) => (
						<Form>
							<Field label="Title" name="title" component={TextFieldForm} />
							<Field
								label="Description"
								name="description"
								multiline
								component={TextFieldForm}
							/>
							<Field
								label="File"
								name="file"
								component={FileFieldForm}
								setFieldValue={setFieldValue}
							/>
							<Button
								type="submit"
								loading={isLoading}
								className="mt-2 w-20 ml-auto"
								variant="filled"
								disabled={!!!values.title || !!!values.description}
							>
								Post
							</Button>
						</Form>
					)}
				</Formik>
			</Card>
		</div>
	);
};

export default AddTopic;
