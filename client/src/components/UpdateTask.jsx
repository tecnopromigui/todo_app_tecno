import React from 'react';
import styles from '../assets/styles/components/UpdateTask.module.css';
import { useSelector } from 'react-redux';
//importacion para toastify and sweetalert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getIncompletedTasks } from '../redux/actions';
import { useDispatch } from 'react-redux';
const UpdateTask = ({ id, task, closeWindow }) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [newTask, setNewTask] = useState(task);
	const [changeOnTasks, setChangeOnTasks] = useState(false);
	const handleChangeInput = (event) => {
		const value = event.target.value;
		setNewTask(value);
	};

	useEffect(() => {
		dispatch(getIncompletedTasks(user.id));
	}, [changeOnTasks]);

	const handleUpdateTask = async (event) => {
		event.preventDefault();
		if (newTask == '')
			return displayFailedMessage(
				'El campo está vacio, nose puede actualizar si no posees nada para cambiar',
			);
		try {
			const { data } = await axios.put(
				`/task/update/${id}/?id_user=${user.id}`,
				{
					task: newTask,
				},
			);
			displaySuccessMessage(
				'La tarea se ha actualizado correctamente, precione X para salir',
			);
			setChangeOnTasks(!changeOnTasks);
		} catch (error) {
			displayFailedMessage(error.response.data.error);
		}
	};

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

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<div className={styles.contentTitle}>
					<h3 className={styles.title}>Update your task</h3>
					<button
						className={styles.button}
						onClick={() => {
							closeWindow();
						}}
					>
						X
					</button>
				</div>
				<div className={styles.contentInput}>
					<textarea
						className={styles.input}
						type="text"
						value={newTask}
						onChange={handleChangeInput}
					/>
					<button onClick={handleUpdateTask} className={styles.button}>
						Update
					</button>
                    
				</div>
			</main>
			<ToastContainer />
		</div>
	);
};

export default UpdateTask;
