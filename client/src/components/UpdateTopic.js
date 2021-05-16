import React from "react";
import { Button } from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import TextFieldForm from "./Forms/TextFieldForm";
import FileFieldForm from "./Forms/FileFieldForm";
import { useMutation, useQueryClient } from "react-query";
import { updateTopic } from "../query/topic-query";
import AlertStatus from "./Utils/AlertStatus";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const FILE_SIZE = 320 * 1024;
const schema = yup.object({
	description: yup.string().required(),
	file: yup
		.mixed()
		.test("fileSize", "File Size is too large", (value) =>
			value === undefined ? true : value.size <= FILE_SIZE
		)
		.test("fileType", "Unsupported File Format", (value) =>
			value === undefined ? true : SUPPORTED_FORMATS.includes(value.type)
		),
});

const UpdateTopic = ({ topic, openEdit, setOpenEdit }) => {
	const queryClient = useQueryClient();
	const { isError, isLoading, error, mutate } = useMutation(updateTopic, {
		onSuccess: (res) => {
			queryClient.invalidateQueries(["topic", topic.title]);
			setOpenEdit(false);
		},
	});

	const handleSubmit = (values) => {
		const { description, file } = values;
		const formData = new FormData();
		formData.append("description", description);
		formData.append("file", file);
		mutate({ topic: topic.title, formData });
	};

	return (
		openEdit && (
			<Formik
				initialValues={{ description: topic.description, file: "" }}
				onSubmit={handleSubmit}
				validationSchema={schema}
			>
				{({ setFieldValue }) => (
					<Form>
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
						<Button mr="2" type="submit" isLoading={isLoading}>
							Update
						</Button>
						<Button onClick={() => setOpenEdit(false)}>Cancel</Button>
						{isError && <AlertStatus status={error} />}
					</Form>
				)}
			</Formik>
		)
	);
};

export default UpdateTopic;
