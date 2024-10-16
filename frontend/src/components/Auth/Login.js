import React, { useState } from 'react';
import styles from './Login.module.css';
import apiService from "../../services/apiService";

const Login = () => {
	const [error, setError] = useState(null);

	const handleSubmit = async event => {
		event.preventDefault();
		const username = event.target.username.value;
		const password = event.target.password.value;
		try {
			const result = await apiService.post('/api/auth/sign-in',{ username, password });
			if (result.status === 200) {
				localStorage.setItem('username', username);
				localStorage.setItem('token', result.data.token);
				window.location.replace(window.location.origin);
			}
		} catch (e) {
			if(e.response && e.response.status === 403)
			{
				setError("Invalid username or password. Please check and retry!");
			}
			else
			{
				console.log(e.message);
			}
		}
	}

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginCard}>
				<h2 className={styles.loginTitle}>Culinary Blog Login</h2>
				<form onSubmit={handleSubmit} className={styles.loginForm}>
					<div className={styles.loginField}>
						{
							error ? (
								<div className="mb-3">
									<h5 className="text-danger">{error}</h5>
								</div>
							) : ""
						}
						<label htmlFor='username' className={styles.loginLabel}>
							Username
						</label>
						<input
							id='username'
							type='text'
							className={styles.loginInput}
							placeholder='Enter your username'
						/>
					</div>
					<div className={styles.loginField}>
						<label htmlFor='password' className={styles.loginLabel}>
							Password
						</label>
						<input
							id='password'
							type='password'
							className={styles.loginInput}
							placeholder='Enter your password'
						/>
					</div>
					<div className={styles.signUpContainer}>
						<a href="/sign-up" className={styles.signUpLink}>
							Sign up?
						</a>
					</div>
					<button type='submit' className={styles.loginButton}>
						Sign in
					</button>
				</form>
			</div>
		</div>
	)
}

export default Login;
