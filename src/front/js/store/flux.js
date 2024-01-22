const getState = ({ getStore, getActions, setStore }) => {
	let URL = "https://jubilant-happiness-979j7994rqw6f9xq9-3001.app.github.dev/api"
	return {
		store: {
	
			token:null
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
					if (response.status == 200) {
						const data = await response.json()
						localStorage.setItem("token", data.token)
						console.log(data.token)
						setStore({token:true})

					} else {
						setStore({token:false})
					}
				} catch (error) {
					console.log(error)
				}
			}
			
			
		}
	};
};

export default getState;
