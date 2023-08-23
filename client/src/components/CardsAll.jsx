import React from 'react';
import styles from '../assets/styles/components/CardsAll.module.css';

const CardsAll = ({ id, task, is_completed }) => {
	return (
		<div className={styles.container}>
			<main className={styles.content}>
				{is_completed ? (
					<p>
						{' '}
						<strike>{task}</strike>
					</p>
				) : (
					<p>{task}</p>
				)}
			</main>
		</div>
	);
};

export default CardsAll;
