import { useState, useCallback } from 'react'
import useAPI from '../../hooks/useAPI'
import { useHistory, Redirect } from "react-router-dom";

import { withRouter } from 'react-router-dom';
import Info from '../../components/Info'

function Login(props) {
    const [username, setUsername] = useState('aeneas')
    const [password, setPassword] = useState('123456')

    let history = useHistory();
    const api = useAPI()

    const [info, setInfo] = useState(null)

    const [status, setStatus] = useState(false)

    const onLogin = useCallback((e) => {
        console.log('login')

        api.post('/user/register', { username, password }).then(_status => {
            console.log("token status:", status)
            if (_status) {
                setStatus(_status)
                history.push('/chatroom')
                setInfo("登录成功，可能自动跳转不成功，请手动刷新")
            }
        })


    }, [api, username, password, history])

    console.log('registers')

    return (

        status ? (
            <Redirect to="/chatroom" />
        ) :
            (
                <div className="flex flex-col justify-center w-10/12">
                    <div className="flex justify-center ">
                        <h3>User register</h3>
                    </div>
                    <div className="mx-auto">
                        <form className=" p-3 m-3 lg:w-8/12 justify-center text-lg">
                            <div className="mx-auto">
                                <div className="label">name</div>
                                <div className="mx-auto">
                                    <input type="text" name="msg-send" className=" my-2 login-input border-2 border-blue-500" value={username} placehold="input username" onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="label">password</div>
                                <div className="mx-auto">
                                    <input type="text" name="msg-send" className=" my-2 login-input border-2 border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="my-4">
                                    <div className="login-input bg-blue-400 text-white p-1 w-40 text-center" onClick={onLogin}> Register </div>
                                </div>

                            </div>
                        </form>
                        <Info value={info} />

                    </div>
                </div>
            )

    )
}



export default withRouter(Login)