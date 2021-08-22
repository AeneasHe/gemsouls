import React, { useEffect, useState } from "react";
import useStorage from '../hooks/useStorage'


function MenuButton(props) {

    // const location = useLocation();

    var color = 'bg-blue-200 hover:bg-blue-600'

    // React.useEffect(() => {
    //     if (location.pathname === props.link) {
    //         color = 'bg-red-200 hover:bg-red-600'
    //     }
    // }, [location]);



    return (
        <div className={"p-1 transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110 " + color}>
            <a href={props.link}> {props.label} </a>
        </div>
    )
}

function Nav(props) {
    return <div className="p-2 m-1 h-12 w-24  text-left ">
        <MenuButton label={props.label} link={props.link} />
    </div>
}

export default function Menu() {
    const { getToken } = useStorage()
    const [token, setToken] = useState(null)

    useEffect(() => {
        setToken(getToken())
    }, [setToken, getToken])

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
                            <div className="flex flex-row justify-start">
                                <Nav label="Profile" link="/user" />
                                <Nav label="Logout" link="/user/logout" />
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