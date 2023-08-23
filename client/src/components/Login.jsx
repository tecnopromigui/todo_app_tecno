import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { saveUser, setUser } from '../redux/actions';
import { validate, validateFields } from '../utils/Verification';

import imageEyeView from '../assets/img/eye.png';
import imageEyeHide from '../assets/img/eye-closed.png';

//importacion para toastify and sweetalert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

//Importaciones para el boton de Google

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import styles from '../assets/styles/components/Login.module.css';

const Login = () => {
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
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	//Estado para ver la contraseña
	const [pass, setPass] = useState(false);

	const statusPassword = (event) => {
		event.preventDefault();
		setPass(!pass);
	};

	const login = async (form) => {
		console.log(form);
		try {
			const userLogin = {
				email: form.email,
				password: form.password,
			};
			const { data } = await axios.post(`/user/login`, userLogin);
			dispatch(saveUser(data.data));
			setForm({ email: '', password: '' });
			navigate('/');
		} catch (error) {
			if (error.response.data.error) {
				displayFailedMessage(error.response.data.error);
			} else {
				console.log(error);
			}
		}
	};

	const handleChangeInput = (event) => {
		const property = event.target.name;
		const value = event.target.value;
		setForm({ ...form, [property]: value });
		setErrors(validate({ ...form, [property]: value }, errors));
	};

	const handleSubmitForm = (event) => {
		event.preventDefault();
		if (
			!form.email ||
			!form.email === '' ||
			!form.password ||
			form.password === ''
		) {
			displayFailedMessage('Todos los campos son obligatorios');
			return;
		}
		login(form);
	};

	//Para el boton de google
	const handleGoogleLoginSuccess = async (credentialResponse) => {
		try {
			let decoded = jwt_decode(credentialResponse.credential);
			const { given_name, family_name, picture, email } = decoded;
			console.log(decoded);

			const { data } = await axios.post(`/user/google/login`, {
				given_name,
				family_name,
				picture,
				email,
			});

			const newUser = {
				id: data.data.id,
				first_name: data.data.first_name,
				last_name: data.data.last_name,
				email: data.data.email,
				token: data.data.token,
				profile_picture: data.data.profile_picture,
			};

			dispatch(saveUser(newUser));
			navigate('/');
		} catch (error) {
			console.log('Login Failed', error);
		}
	};

	const handleGoogleLoginError = () => {
		console.log('Login Failed');
	};

	useEffect(() => {
		if (user.id) {
			navigate('/');
		}
	}, []);

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<form action="" onSubmit={handleSubmitForm} className={styles.form}>
					<div className={styles.ContentEmail}>
						<input
							type="email"
							name="email"
							placeholder="Email..."
							value={form.email}
							onChange={handleChangeInput}
						/>
						<span className={styles.spanError}>{errors.email}</span>
					</div>
					<div className={styles.contentPassword}>
						<div className={styles.contentDivPassword}>
							<input
								type={pass ? 'text' : 'password'}
								name="password"
								placeholder="Password..."
								value={form.password}
								onChange={handleChangeInput}
							/>
							<span className={styles.spanError}>{errors.password}</span>
						</div>
						<div className={styles.contentImageEye} onClick={statusPassword}>
							<img
								className={styles.imageEye}
								src={pass ? imageEyeView : imageEyeHide}
								alt=""
							/>
						</div>
					</div>
					<Link className={styles.link} to={'/reset_password_one'}>
						Forgot your password?
					</Link>
					<button className={styles.buttonLogIn}>Log In</button>
				</form>
				<div className={styles.contentGoogle}>
					<div className="">
						<GoogleOAuthProvider clientId="314726977646-gd1fd5l3t3gna2htbhhrp8a5a4ol2uro.apps.googleusercontent.com">
							<GoogleLogin
								onSuccess={handleGoogleLoginSuccess}
								onError={handleGoogleLoginError}
							/>
						</GoogleOAuthProvider>
					</div>
				</div>
			</main>
			<ToastContainer />
		</div>
	);
};

export default Login;
