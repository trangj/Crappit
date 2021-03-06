import React from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import TextFieldForm from "../ui/TextFieldForm";
import { Formik, Form, Field } from "formik";
import { useUser } from "../context/UserState";
import { Button, Card } from "../ui";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";

const schema = yup.object({
	username: yup
		.string()
		.required("Enter an username")
		.matches(/^(\S+$)/, "Username cannot have any white space"),
	email: yup.string().email().required("Enter an email"),
	password: yup
		.string()
		.required("Enter a password")
		.min(6, "Your password must be at least 6 characters long")
		.matches(/^(\S+$)/, "Password cannot have any white space"),
	password2: yup
		.string()
		.oneOf([yup.ref("password"), undefined], "Passwords must match")
		.required("Confirm your password"),
});

interface FormValues {
	username: string,
	email: string,
	password: string,
	password2: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	if (req.cookies.token) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}
	return {
		props: {}
	};
};

const Register = () => {
	const { registerUser } = useUser();
	const router = useRouter();

	const handleSubmit = async ({ username, email, password, password2 }: FormValues) => {
		try {
			const user = {
				username,
				email,
				password,
				password2,
			};
			const res = await registerUser(user);
			toast.success(res.data.status.text);
			router.back();
		} catch (err) {
			toast.error(err.response.data.status.text);
		}
	};

	return (
		<div className="mt-16 container mx-auto max-w-5xl">
			<Head>
				<title>crappit: Join the worldwide conversation</title>
			</Head>
			<Card className="flex">
				<div className="bg-blue-300 w-32" />
				<div className="flex flex-col p-6 gap-2">
					<h5>Register</h5>
					<small>By continuing, you agree to our User Agreement and Privacy Policy.</small>
					<Formik
						initialValues={{
							username: "",
							email: "",
							password: "",
							password2: "",
						}}
						onSubmit={handleSubmit}
						validationSchema={schema}
					>
						{() => (
							<Form className="w-72 flex flex-col">
								<Field
									label="Username"
									name="username"
									component={TextFieldForm}
								/>
								<Field
									label="Email"
									name="email"
									type="email"
									component={TextFieldForm}
								/>
								<Field
									label="Password"
									name="password"
									type="password"
									component={TextFieldForm}
								/>
								<Field
									label="Confirm Password"
									name="password2"
									type="password"
									component={TextFieldForm}
								/>
								<Button type="submit" variant="filled" className="mt-3">
									Register
								</Button>
							</Form>
						)}
					</Formik>
					<small className="mt-3">
						<Link href="/login">
							<a>Already have an account?</a>
						</Link>
					</small>
				</div>
			</Card>
		</div>
	);
};

export default Register;
