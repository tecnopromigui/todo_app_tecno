import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { validate, validateFields } from '../utils/Verification';
import styles from '../assets/styles/components/Register.module.css';

//importacion para toastify and sweetalert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

const Register = () => {
	//Toastify module for success message
	const displaySuccessMessage = (mensaje) => {
		toast.success(mensaje, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	// Toastify module for error messages
	const displayFailedMessage = (mensaje) => {
		toast.error(mensaje, {
			position: 'top-right',
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});
	};

	const navigate = useNavigate();

	const [form, setForm] = useState({
		first_name: '',
		last_name: '',
		repeat_password: '',
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		first_name: '',
		last_name: '',
		repeat_password: '',
		email: '',
		password: '',
	});

	const handleChangeInput = (event) => {
		const property = event.target.name;
		const value = event.target.value;

		setForm({ ...form, [property]: value });
		setErrors(validate({ ...form, [property]: value }, errors));
	};

	const registrarUser = async (form) => {
		const newUser = {
			first_name: form.first_name,
			last_name: form.last_name,
			email: form.email,
			password: form.password,
		};
		try {
			const { data } = await axios.post(`/user/register`, newUser);

			displaySuccessMessage(data.message);
			setForm({ email: '', password: '' });
		} catch (error) {
			console.log(error)
			// displayFailedMessage(error.response.data.error);
		}
	};

	const handleSubmitForm = (event) => {
		event.preventDefault();
		if (!validateFields(form)) {
			displayFailedMessage('All fields are required');
			return;
		}
		registrarUser(form);
	};

	const handleReturn = (event) => {
		event.preventDefault();
		navigate('/');
	};

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<form action="" onSubmit={handleSubmitForm} className={styles.form}>
					<div className={styles.ContentFields}>
						<input
							placeholder="Name..."
							type="text"
							name="first_name"
							value={form.first_name}
							onChange={handleChangeInput}
						/>
						<span>{errors.first_name}</span>
					</div>
					<div className={styles.ContentFields}>
						<input
							placeholder="Last name..."
							type="text"
							name="last_name"
							value={form.last_name}
							onChange={handleChangeInput}
						/>
						<span>{errors.last_name}</span>
					</div>

					<div className={styles.ContentFields}>
						<input
							placeholder="Email..."
							type="email"
							name="email"
							value={form.email}
							onChange={handleChangeInput}
						/>
						<span>{errors.email}</span>
					</div>
					<div className={styles.ContentFields}>
						<input
							placeholder="Password..."
							className={styles.inputPass}
							type="text"
							name="password"
							value={form.password}
							onChange={handleChangeInput}
						/>
						<span>{errors.password}</span>
					</div>
					<div className={styles.ContentFields}>
						<input
							placeholder="Repeat password..."
							className={styles.inputPass}
							type="text"
							name="repeat_password"
							value={form.repeat_password}
							onChange={handleChangeInput}
						/>
						<span>{errors.repeat_password}</span>
					</div>
					<div className={styles.contentButtonAll}>
						<button className={styles.button}>Register</button>
						<button className={styles.button} onClick={handleReturn}>
							Cancel
						</button>
					</div>
				</form>
			</main>
			<ToastContainer />
		</div>
	);
};

export default Register;
