import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom"
// import Login from "../pages/Login";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()
	const [ver, setVer] = useState("visible")
	const [verLogin, setVerLogin] = useState("visible")
	// const logOut = (event => {actions.logOut()})
	function logOut() {
		actions.logOut()
		setVer("invisible")
		navigate("/login")
	}
	function logeo() {
		navigate("/login")
		setVerLogin("invisible")
	}

	useEffect(() => {
		if (localStorage.getItem("token") === null) {
			setVer("invisible")
			setVerLogin("visible")
		} else {
			setVer("visible")
			setVerLogin("invisible")
		}
	},[localStorage.getItem("token")])
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="ml-auto">
				<button className={"btn btn-primary "+verLogin} onClick={logeo}>Login</button>
					
						<button className={"btn btn-primary "+ver} onClick={logOut} >logOut</button>
					
				</div>
			</div>
		</nav>
	);
};
