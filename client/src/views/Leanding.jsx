import React, { useState } from 'react';
import styles from '../assets/styles/components/views/Leanding.module.css';
import Login from '../components/Login';
import Register from '../components/Register';
import logo from '../assets/img/logo 1 .png';

const Leanding = () => {
	const [viewForm, setViewForm] = useState(true);
	const handleViewForm = (event) => {
		event.preventDefault();
		setViewForm(!viewForm);
	};
	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<div className={styles.contentLogo}>
					<img src={logo} alt="" />
				</div>
				<div className={styles.contentForms}>
					<div className={styles.contentButtons}>
						<button
							disabled={viewForm}
							className={
								viewForm
									? `${styles.buttonSelected}`
									: `${styles.buttonNotSelected}`
							}
							onClick={handleViewForm}
						>
							Log In
						</button>
						<button
							disabled={!viewForm}
							className={
								viewForm
									? `${styles.buttonNotSelected}`
									: `${styles.buttonSelected}`
							}
							onClick={handleViewForm}
						>
							Register
						</button>
					</div>
					{viewForm ? <Login /> : <Register />}
				</div>
			</main>
		</div>
	);
};

export default Leanding;
