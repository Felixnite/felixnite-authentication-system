import React, {useContext, useState} from "react"
import { Context } from "../store/appContext"

const PrivateView = () => {
    const {store, actions} = useContext(Context)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function login(e) {
        e.preventDefault() 
        actions.login(email, password)   
    }

    return(
        <div className="container">
        <form>
            
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text" >We'll never share your email with anyone else.</div>
    </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="exampleInputPassword1"/>
  </div>

  <button type="submit" className="btn btn-primary" onClick={(e) => login(e)}>Submit</button>
</form>
</div>
    )
}

export default PrivateView