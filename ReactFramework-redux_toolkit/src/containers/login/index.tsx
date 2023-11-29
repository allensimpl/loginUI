import React, { useState } from "react";
import "./styles.css";
import { Button } from "antd";

export const Login = () => {
	const [loginDetails, setLoginDetails] = useState({
		name: "",
		password: "",
	});
	const handleLogin = () => {
		console.log(loginDetails);
	};
	return (
		<div className="login-container">
			<div className="login">
				<h3>Name</h3>
				<input
					className="input"
					type="text"
					onChange={(event) => setLoginDetails({ ...loginDetails, name: event.target.value })}
				></input>
				<h3>Password</h3>
				<input
					className="input"
					type="text"
					onChange={(event) => setLoginDetails({ ...loginDetails, password: event.target.value })}
				></input>
				<div className="button-container">
					<Button className="button-17" onClick={() => handleLogin()}>
						Login
					</Button>
				</div>
			</div>
		</div>
	);
};
