import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../assets/styles/components/CardsIncompleted.module.css';
//importacion para toastify and sweetalert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import { getIncompletedTasks } from '../redux/actions';

import axios from 'axios';
import { useSelector } from 'react-redux';
import pen from '../assets/img/pencil-plusv2.png';
import UpdateTask from './UpdateTask';
const CardsIncompleted = ({ id, task, is_completed }) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [changeOnTasks, setChangeOnTasks] = useState(false);

	const [viewWindow, setViewWindow] = useState(false);

	useEffect(() => {
		dispatch(getIncompletedTasks(user.id));
	}, []);

	useEffect(() => {
		dispatch(getIncompletedTasks(user.id));
	}, [changeOnTasks]);

	const handleClickTask = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.put(
				`/task/update/${id}/?id_user=${user.id}`,
				{
					is_completed: true,
				},
			);
			displaySuccessMessage('Task marked as completed');
			setChangeOnTasks(!changeOnTasks);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteTask = (event) => {
		event.preventDefault();
		swal({
			title: 'Attention',
			text: 'Are you sure to delete the task you have not yet completed?',
			icon: 'warning',
			buttons: ['No', 'Yes'],
		}).then((response) => {
			if (response) {
				deleteTask().then(() => {
					displaySuccessMessage('Task successfully eliminated');
					setChangeOnTasks(!changeOnTasks);
				});
			} else {
				swal({
					title: 'Canceled',
					text: 'The operation has been successfully cancelled.',
					icon: 'success',
					buttons: 'Accept',
				});
			}
		});
	};

	const deleteTask = async () => {
		try {
			const { data } = await axios.delete(
				`/task/delete/${id}/?id_user=${user.id}`,
			);
		} catch (error) {
			console.log(error);
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

	const HandleUpdateTask = (event) => {
		event.preventDefault();
		setViewWindow(!viewWindow);
	};

	const closeWindow = () => {
		setViewWindow(!viewWindow);
	};

	return (
		<div className={styles.container}>
			{viewWindow && (
				<UpdateTask key={id} id={id} task={task} closeWindow={closeWindow} />
			)}
			<main className={styles.content}>
				{!is_completed && <p>{task}</p>}
				<div className={styles.contentIcons}>
					<label className={styles.containerCheck}>
						<input onClick={handleClickTask} type="checkbox" />
						<svg viewBox="0 0 64 64" height="2em" width="2em">
							<path
								d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
								pathLength="575.0541381835938"
								className={styles.path}
							></path>
						</svg>
					</label>
					<div className={styles.contentPen} onClick={HandleUpdateTask}>
						<img src={pen} alt="" />
					</div>
					<div>
						<button onClick={handleDeleteTask} className={styles.bin}>
							🗑
						</button>
						<div className={styles.div}>
							<small>
								<i></i>
							</small>
						</div>
					</div>
				</div>
			</main>
			<ToastContainer />
		</div>
	);
};

export default CardsIncompleted;
