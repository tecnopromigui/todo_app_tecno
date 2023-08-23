import React from 'react';

import styles from '../assets/styles/components/views/Home.module.css';
import Footer from '../components/Footer';

import logo from '../assets/img/logo 1 .png';

const Home = () => {
	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<section className={styles.sectionPrimary}>
					<div className={styles.contentLogo}>
						<img src={logo} alt="logo-oficial" title="my tasks logo" />
					</div>
					<article className={styles.contentText}>
						<h3 className={styles.titleSection}>What is My Tasks?</h3>
						<p className={styles.textSection}>
							My Tasks is an intuitive and efficient task management application
							that helps you to keep that helps you keep your responsibilities
							organized and up to date. organized and up to date. Whether it's
							for your work, studies, personal projects or simply to keep track
							of your daily tasks, My Tasks My Tasks provides you with the tools
							you need to keep total control over your you need to maintain
							total control over your activities.
						</p>
					</article>
				</section>
				<section className={styles.sectionSecondary}>
					<h3 className={styles.titleSection}>Main features</h3>
					<div className={styles.contentBox}>
						<article className={styles.boxSection}>
							Minimalist and easy to use interface
						</article>
						<article className={styles.boxSection}>
							Task Creation and Organization
						</article>
						<article className={styles.boxSection}>
							Synchronization with the cloud
						</article>
					</div>
				</section>
				<section className={styles.sectionSecondary}>
					<h3 className={styles.titleSection}>Why choose My Tasks?</h3>
					<p className={styles.textSection}>
						With My Tasks, managing your tasks will be easier and more
						productive than ever. productive than ever. This application helps
						you stay focused on what's important on what's important and avoid
						forgetfulness by making sure each task is completed on time. is
						completed on time. Enjoy a hassle-free user experience experience
						and improve your productivity in all areas of your life. your life.
					</p>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Home;
