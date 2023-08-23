import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//importacion para toastify and sweetalert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';

import styles from '../assets/styles/components/views/Tasks.module.css';

import {
	getAllTasks,
	getCompletedTasks,
	getIncompletedTasks,
} from '../redux/actions';
import AllTasks from '../components/AllTasks';
import CompletedTasks from '../components/CompletedTasks';
import IncompletedTasks from '../components/IncompletedTasks';
import axios from 'axios';


const Tasks = () => {
	const [viewOption, setViewOption] = useState('all');

	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (!user.id) {
			navigate('/');
		}
	}, []);

	useEffect(() => {
		dispatch(getAllTasks(user.id));
		dispatch(getCompletedTasks(user.id));
		dispatch(getIncompletedTasks(user.id));
	}, []);

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

	const handleChangeItem = (event) => {
		event.preventDefault();
		const name = event.target.dataset.name;
		setViewOption(name);
	};

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<nav className={styles.nav}>
					<ul>
						<li
							data-name="all"
							onClick={handleChangeItem}
							className={
								viewOption === 'all' ? `${styles.activeItem}` : `${styles.item}`
							}
						>
							All tasks
						</li>
						<li
							data-name="incompleted"
							onClick={handleChangeItem}
							className={
								viewOption === 'incompleted'
									? `${styles.activeItem}`
									: `${styles.item}`
							}
						>
							Incomplete tasks
						</li>
						<li
							data-name="completed"
							onClick={handleChangeItem}
							className={
								viewOption === 'completed'
									? `${styles.activeItem}`
									: `${styles.item}`
							}
						>
							Complete tasks
						</li>
					</ul>
				</nav>
				{viewOption === 'all' && <AllTasks />}
				{viewOption === 'incompleted' && <IncompletedTasks />}
				{viewOption === 'completed' && <CompletedTasks />}
			</main>
			<ToastContainer />
		</div>
	);
};

export default Tasks;
