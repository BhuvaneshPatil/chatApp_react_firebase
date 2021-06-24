import React, { useEffect, useState } from "react";
import { ChatEngine } from "react-chat-engine";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/authContext";

import axios from "axios";
const Chats = () => {
	const [loading, setLoading] = useState(true);
	const { user } = useAuth();
	console.log(user);
	const history = useHistory();
	const handleLogout = async () => {
		await auth.signOut();
		history.push("/");
	};
	const getFile = async (url) => {
		const response = await fetch(url);
		const data = response.blob();
		return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
	};
	useEffect(() => {
		if (!user) {
			history.push("/");
			return;
		}
		console.log(user);
		axios
			.get("https://api.chatengine.io/users/me/", {
				headers: {
					"Project-ID": "3761959d-7026-4449-bd13-da87c9efb429",
					"User-Name": user.email,
					"User-Secret": user.uid,
				},
			})
			.then((response) => {
				console.log(response);
				setLoading(false);
			})
			.catch((err) => {
				// console.log(user);
				let formData = new FormData();
				// formData.append("email", user.email);
				formData.append("username", user.email);
				formData.append("secret", user.uid);

				getFile(user.photoURL).then((avatar) => {
					// formData.append("avatar", avatar, avatar.name);
					axios
						.post("https://api.chatengine.io/users/", formData, {
							headers: {
								"PRIVATE-KEY":
									process.env.REACT_APP_CHAT_ENGINE_KEY,
							},
						})
						.then((res) => {
							console.log(res);
							setLoading(false);
						})
						.catch((err) => console.log(err));
				});
			});
	}, [user, history]);
	if (!user || loading) return <h1>Loading</h1>;
	return (
		<div className="chat-page">
			<div className="nav-bar">
				<div className="logo-tab">UNICHAT</div>
				<div className="logout-tab" onClick={handleLogout}>
					Logout
				</div>
			</div>
			<ChatEngine
				height="calc(100vh-66px)"
				projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
				userName={user.email}
				userSecret={user.uid}
			/>
		</div>
	);
};

export default Chats;
