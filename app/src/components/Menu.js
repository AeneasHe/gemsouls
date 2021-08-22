import React, { useEffect, useState, useCallback } from "react";
import useStorage from '../hooks/useStorage'
// import { useLocation } from "react-router-dom";

function MenuButton(props) {

    // const location = useLocation();

    var color = 'bg-blue-200 hover:bg-blue-600'

    // React.useEffect(() => {
    //     if (location.pathname === props.link) {
    //         color = 'bg-red-200 hover:bg-red-600'
    //     }
    // }, [location]);



    return (
        <div className={"text-center p-1 transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110 " + color}>
            <a href={props.link}> {props.label} </a>
        </div>
    )
}

function Nav(props) {
    return <div className="p-2 m-1 h-12 w-30  text-left ">
        <MenuButton label={props.label} link={props.link} />
    </div>
}

export default function Menu() {

    const { getToken, getUsername } = useStorage()

    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    const [show, setShow] = useState('invisible')

    useEffect(() => {
        setToken(getToken())
        setUsername(getUsername())
    }, [setToken, getToken, setUsername, getUsername])

    const handleMouseEnter = useCallback(() => {
        console.log("====>enter")
        setShow('visibles')
    }, [setShow])

    const handleMouseLeave = useCallback(() => {
        setShow('invisible')
    }, [setShow])


    return (
        <div className="mx-auto m-2">
            <div className="flex flex-row justify-around items-start">

                {token ?
                    (
                        <>
                            <div className="flex flex-row justify-start">
                                <Nav label="Home" link="/" />
                                <Nav label="ChatRoom" link="/chatroom" />
                            </div>
                            <div className="flex flex-col justify-center"
                                onMouseLeave={handleMouseLeave}

                            >
                                <div className="user-avatar text-white  bg-red-600 rounded-full h-12 w-12 text-xs flex items-center justify-center"
                                    onMouseEnter={handleMouseEnter}
                                > {username}</div>
                                <div className={"shadow-lg my-1 bg-gray-100 p-2  grid grid-cols-1 divide-y divide-blue-500 " + show}>
                                    <Nav label="Profile" link="/user" />
                                    <Nav label="Logout" link="/user/logout" />
                                </div>
                            </div>
                        </>
                    )
                    :
                    (<>
                        <div className="flex flex-row justify-start">
                            <Nav label="Home" link="/" />
                        </div>
                        <div className="flex flex-row justify-start">

                            <Nav label="Login" link="/user/login" />
                            <Nav label="Register" link="/user/register" />
                        </div>

                    </>
                    )

                }

            </div>
        </div>
    )
}