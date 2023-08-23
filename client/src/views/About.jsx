import React from 'react';
import styles from '../assets/styles/components/views/About.module.css';
import Footer from '../components/Footer';
import logoGithub from '../assets/img/github.png';
import logoLinkedin from '../assets/img/Linkedin_color.png';
const About = () => {
	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<section className={styles.sectionPrimary}>
					<div className={styles.contentImageMe}>
						<img
							src="https://res.cloudinary.com/dgp4xwknu/image/upload/v1691163438/Portfolio%20Miguel%20Fernandez/YO_a_color_xz0gqh.png"
							alt="me"
							title="Photo of me"
						/>
					</div>
					<div className={styles.contentTextMe}>
						<h3>Who I am?</h3>
						<p>
							Hello everyone, my name is{' '}
							<strong>
								{' '}
								<a
									className={styles.portfolio}
									href="https://portfolio-miguel-fernandez-v2.vercel.app/"
									target="_blank"
								>
									Miguel Fernandez
								</a>
							</strong>{' '}
							I am a Full Stack Developer with a passion for IT, I develop
							solutions like this App you are in, I also developed an E-commerce
							about wine and liquor sales with a team in which I was the Tech
							Lead, I learned a lot more and I can take my skills both soft and
							technical to a new level.
						</p>
						<div className={styles.contentLogosContact}>
							<a href="https://github.com/Fer-Mig-Agus" target="_blank">
								<img src={logoGithub} alt="github" title="link to Github" />
							</a>
							<a
								href="https://www.linkedin.com/in/miguel-agustin-fernandez-aa1596248/"
								target="_blank"
							>
								<img
									src={logoLinkedin}
									alt="linkedin"
									title="link to Linkedin"
								/>
							</a>
						</div>
					</div>
				</section>
				<section className={styles.sectionSecondary}>
					<h3>Why the name?</h3>
					<p>
						The name My Tasks is a simple name, easy to remember and makes 100%
						reference to what this App is oriented, which provides a simple
						interface for the user, making it possible to use it without any
						problem and from any device.
					</p>
				</section>
				<section className={styles.sectionSecondary}>
					<h3>Inspired by?</h3>
					<p>
						What inspired me to make this App, was that I was looking for a
						simple interface, so that anyone can use it without any
						inconvenience, and that it is straight to what it was created for.
					</p>
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default About;
