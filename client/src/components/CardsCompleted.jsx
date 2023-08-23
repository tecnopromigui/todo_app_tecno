import React from 'react';
import { useDispatch } from 'react-redux';
import styles from '../assets/styles/components/CardsCompleted.module.css';
//importacion para toastify and sweetalert
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from 'sweetalert';
import { getCompletedTasks } from '../redux/actions';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CardsCompleted = ({ id, task, is_completed }) => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [changeOnTasks, setChangeOnTasks] = useState(false);

	useEffect(() => {
		dispatch(getCompletedTasks(user.id));
	}, []);

	useEffect(() => {
		dispatch(getCompletedTasks(user.id));
	}, [changeOnTasks]);

	const taskImcompleted = async () => {
		try {
			const { data } = await axios.put(
				`/task/update/${id}/?id_user=${user.id}`,
				{
					is_completed: false,
				},
			);
			setChangeOnTasks(!changeOnTasks);
			displaySuccessMessage(data.data.message);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClickTask = async (event) => {
		event.preventDefault();
		swal({
			title: 'Attention',
			text: 'Are you sure to mark as uncompleted task',
			icon: 'warning',
			buttons: ['No', 'Yes'],
		}).then((response) => {
			if (response) {
				taskImcompleted().then(() => {
					displaySuccessMessage('Task marked as not completed');
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

	const handleDeleteTask = (event) => {
		event.preventDefault();
		swal({
			title: 'Attention',
			text: 'Are you sure to eliminate the task for good?',
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
					buttons: 'Aceptar',
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

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				{is_completed && <p>{task}</p>}
				<div className={styles.contentIcons}>
					<div onClick={handleClickTask} className={styles.containerCheck}>
						<p>x</p>
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
		</div>
	);
};

export default CardsCompleted;
