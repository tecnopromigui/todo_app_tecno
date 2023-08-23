import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CardsIncompleted from './CardsIncompleted';
import { useEffect, useState } from 'react';

//importacion para toastify and sweetalert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { getIncompletedTasks } from '../redux/actions';
import styles from '../assets/styles/components/IncompletedTasks.module.css';

const IncompletedTasks = () => {
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

	const [search, setSearch] = useState('');
	const user = useSelector((state) => state.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const tasksIncompleted = useSelector((state) => state.incompletedTasks);

	const handleChangeInput = (event) => {
		setSearch(event.target.value);
	};

	useEffect(() => {
		dispatch(getIncompletedTasks(user.id));
	}, []);

	// useEffect(() => {
	// 	dispatch(getIncompletedTasks(user.id));
	// }, [changeOnTasks]);
	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<div className={styles.searchTask}>
					<input
						type="text"
						onChange={handleChangeInput}
						value={search}
						placeholder="Search task..."
						name=""
						id=""
					/>
					<button className={styles.searchButton}>
						<span>
							<svg
								viewBox="0 0 24 24"
								height="24"
								width="24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M9.145 18.29c-5.042 0-9.145-4.102-9.145-9.145s4.103-9.145 9.145-9.145 9.145 4.103 9.145 9.145-4.102 9.145-9.145 9.145zm0-15.167c-3.321 0-6.022 2.702-6.022 6.022s2.702 6.022 6.022 6.022 6.023-2.702 6.023-6.022-2.702-6.022-6.023-6.022zm9.263 12.443c-.817 1.176-1.852 2.188-3.046 2.981l5.452 5.453 3.014-3.013-5.42-5.421z"></path>
							</svg>
						</span>
					</button>
				</div>
				<hr />
				<div>
					<div className={styles.contentIncompletedTasks}>
						{tasksIncompleted && tasksIncompleted.length !== 0 ? (
							tasksIncompleted
								.filter((task) =>
									task.task
										.toLocaleLowerCase()
										.includes(search.toLocaleLowerCase()),
								)
								.map(({ id, task, is_completed }) => {
									return (
										<CardsIncompleted
											key={id}
											id={id}
											task={task}
											is_completed={is_completed}
										/>
									);
								})
						) : (
							<h2 className={styles.taskNotFound}>There are no tasks...</h2>
						)}
					</div>
				</div>
			</main>
		</div>
	);
};

export default IncompletedTasks;
