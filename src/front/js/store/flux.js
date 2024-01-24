const getState = ({ getStore, getActions, setStore }) => {
	let URL = "https://jubilant-happiness-979j7994rqw6f9xq9-3001.app.github.dev/api"
	return {
		store: {
	
			currentUser:null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			
			login: async(email, password) => {
				try {
					const response = await fetch(URL + "/login", {
						method: "POST", 
						body: JSON.stringify({
							email: email,
							password: password
						}),
						headers: {"Content-Type": "application/json"}
					})
					const data = await response.json()
					if (response.ok) {
						
						localStorage.setItem("token", data.token)
						console.log(data)
						setStore({currentUser:data.user})

					} else {
						console.log(data)
						setStore({currentUser:false})
					}
				} catch (error) {
					console.log(error)
					setStore({currentUser:false})
				}
			},
			signup: async(username, email, password) => {
				try {
					const response = await fetch(URL + "/signup", {
						method: "POST", 
						body: JSON.stringify({
							username: username,
							email: email,
							password: password
						}),
						headers: {"Content-Type": "application/json"}
					})
					const data = await response.json()
					if (response.ok) {
						console.log(data)
					} else {
						console.log(data)
					}
				} catch (error) {
					console.log(error)
				}
			},
			isAuth: async() => {
				try {
					const response = await fetch(URL + "/profile", {
						method: "GET", 
						
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer "+localStorage.getItem("token")
						}
					})
					const data = await response.json()
					if (response.ok) {
						
						
						console.log(data)
						setStore({currentUser:data.user})

					} else {
						console.log(data)
						setStore({currentUser:false})
					}
				} catch (error) {
					console.log(error)
					setStore({currentUser:false})
				}
			},
			logOut: async() => {
				try {
					localStorage.removeItem("token")
					console.log("logout exitoso")
				} catch (error) {
					console.log(error)
				}
			}
			
		}
	};
};

export default getState;
