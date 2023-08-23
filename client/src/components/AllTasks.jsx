import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CardsAll from './CardsAll';
import { useEffect, useState } from 'react';

//importacion para toastify and sweetalert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { getAllTasks } from '../redux/actions';
import styles from '../assets/styles/components/AllTasks.module.css';

const AllTasks = () => {
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

	const [newTask, setNewTask] = useState('');
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);
	const allTasks = useSelector((state) => state.allTasks);
	const [changeOnTasks, setChangeOnTasks] = useState(false);

	useEffect(() => {
		dispatch(getAllTasks(user.id));
	}, []);

	useEffect(() => {
		dispatch(getAllTasks(user.id));
	}, [changeOnTasks]);

	const handleChangeNewTask = (event) => {
		setNewTask(event.target.value);
	};

	const createNewTaks = async (event) => {
		event.preventDefault();
		if (newTask === '') {
			return displayFailedMessage('Cannot create an empty task');
		}
		try {
			const newTaskAdd = await axios.post(`/task/create?id_user=${user.id}`, {
				task: newTask,
			});
			displaySuccessMessage('Task successfully created');
			setNewTask('');
			setChangeOnTasks(!changeOnTasks);
		} catch (error) {
			console.log(error);
			displayFailedMessage(error.response.data.error);
		}
	};

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<div className={styles.newTask}>
					<input
						type="text"
						name=""
						value={newTask}
						onChange={handleChangeNewTask}
						placeholder="New task..."
						id=""
					/>
					<button onClick={createNewTaks} className={styles.cssbuttonsIoButton}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="24"
							height="24"
						>
							<path fill="none" d="M0 0h24v24H0z"></path>
							<path
								fill="currentColor"
								d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
							></path>
						</svg>
						<span>Add</span>
					</button>
				</div>
				<hr />
				<div className={styles.contenteAllTasks}>
					{allTasks && allTasks.length !== 0 ? (
						allTasks.map(({ id, task, is_completed }) => {
							return (
								<CardsAll
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
			</main>
		</div>
	);
};

export default AllTasks;
