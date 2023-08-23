import React from 'react';
import logo from '../assets/img/logo 1 .png';
import styles from '../assets/styles/components/views/PageNotFound.module.css';

const PageNotFound = () => {
	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<h3>Page not found!!!</h3>
				<div className={styles.contentLogo}>
					<img src={logo} alt="" />
				</div>
				<h3>Error 404</h3>
			</main>
		</div>
	);
};

export default PageNotFound;
