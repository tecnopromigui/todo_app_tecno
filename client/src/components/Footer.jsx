import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/styles/components/Footer.module.css';
const Footer = () => {
	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<p className={styles.parrafo}>
					&copy; Developed by{' '}
					<Link className={styles.link} to={'/about'}>
						Miguel Fernandez
					</Link>{' '}
					with Love
				</p>
			</main>
		</div>
	);
};

export default Footer;
