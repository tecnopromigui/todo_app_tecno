import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo 2.png';
import styles from '../assets/styles/components/Nav.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../redux/actions';
import iconMenu from '../assets/img/menu-2.png';

const Nav = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [viewMenuIcon, setViewMenuIcon] = useState(false);
	const [viewMenu, setViewMenu] = useState(false);
	const navigate = useNavigate();

	const handleLogOut = (event) => {
		event.preventDefault();
		dispatch(logOutUser());
		navigate('/');
	};

	const handleView = (event) => {
		event.preventDefault();
		setViewMenu(!viewMenu);
	};

	const handleItemView = (event) => {
		event.preventDefault();
		const page = event.target.name;
		console.log(page);
		setViewMenu(!viewMenu);
		navigate(page);
	};

	useEffect(() => {
		if (window.screen.width <= 576) {
			setViewMenuIcon(true);
		}
	}, []);

	return (
		<div className={styles.container}>
			<main className={styles.content}>
				<div className={styles.contentLogo}>
					<img src={logo} alt="" />
				</div>
				{!viewMenuIcon ? (
					<nav className={styles.nav}>
						<ul>
							<Link className={styles.link} to={'/'}>
								Home
							</Link>
							{user.id && (
								<Link className={styles.link} to={'/task'}>
									Tasks
								</Link>
							)}

							<Link className={styles.link} to={'/about'}>
								About
							</Link>
							{user.id && (
								<div className={styles.perfilUser}>
									<div className={styles.pictureUser}>
										<img src={user.profile_picture} alt="" />
									</div>
									<p className={styles.nameUser}>{user.first_name}</p>
								</div>
							)}

							{!user.id ? (
								<Link className={styles.link} to={'/login'}>
									Log in
								</Link>
							) : (
								<Link className={styles.link} onClick={handleLogOut}>
									Log out
								</Link>
							)}
						</ul>
					</nav>
				) : (
					<div className={styles.contentSubMenu}>
						<img
							src={iconMenu}
							alt=""
							className={styles.iconMenuImage}
							onClick={handleView}
						/>
						{viewMenu && (
							<div className={styles.contentMenuSmall}>
								<ul className={styles.ulMenu}>
									<Link
										className={styles.itemMenu}
										name="/"
										onClick={handleItemView}
										to={'/'}
									>
										Home
									</Link>
									{user.id && (
										<Link
											className={styles.itemMenu}
											name="/task"
											onClick={handleItemView}
											to={'/task'}
										>
											Tasks
										</Link>
									)}

									<Link
										className={styles.itemMenu}
										name="/about"
										onClick={handleItemView}
										to={'/about'}
									>
										About
									</Link>
									{user.id && (
										<div className={styles.perfilUserSubMenu}>
											<div className={styles.pictureUserSubMenu}>
												<img src={user.profile_picture} alt="" />
											</div>
											<p className={styles.nameUserSubMenu}>
												{user.first_name}
											</p>
										</div>
									)}

									{user.id ? (
										<Link
											className={styles.itemMenu}
											onClick={handleLogOut}
											to={'/'}
										>
											Log Out
										</Link>
									) : (
										<Link className={styles.itemMenu} to={'/login'}>
											Log In
										</Link>
									)}
								</ul>
							</div>
						)}
					</div>
				)}
			</main>
		</div>
	);
};

export default Nav;
