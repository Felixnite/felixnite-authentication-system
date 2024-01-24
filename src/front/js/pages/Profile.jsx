import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom"

export const Profile = () => {
    const navigate = useNavigate()
	const { store, actions } = useContext(Context);

    return (
        <>
            {
                localStorage.getItem("token") === null ?
                    navigate("/login") :
                    <>
                        <h1>Hola welcome</h1>
                       
                        
                    </>
            }
        </>
    )
};


