import { useState, useCallback, useEffect } from 'react'
import useAPI from '../../hooks/useAPI'
import { useHistory } from "react-router-dom";

import { withRouter } from 'react-router-dom';
import Info from '../../components/Info'

function Login(props) {
    const [username, setUsername] = useState('aeneas')
    const [password, setPassword] = useState('123456')
    let history = useHistory();
    const api = useAPI()

    const [info, setInfo] = useState(null)


    const onLogin = useCallback((e) => {
        console.log('login')

        api.login('/token', { username, password }).then(status => {
            console.log("token status:", status)
            if (status) {
                history.push('/chatroom')
                setInfo("登录成功，可能自动跳转不成功，请手动刷新")
            }
        })


    }, [api, username, password, history])

    return (<>
        <div className="flex justify-center ">
            <h3>User login</h3>
        </div>
        <div className="mx-auto">
            <form className=" p-3 m-3 lg:w-8/12 justify-center text-lg">
                <div className="mx-auto">
                    <div className="label">name</div>
                    <div className="mx-auto">
                        <input type="text" name="msg-send" width="800" className="login-input border-2 border-blue-500" value={username} placehold="input username" onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="label">password</div>
                    <div className="mx-auto">
                        <input type="text" name="msg-send" width="800" className="login-input border-2 border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="my-4">
                        <div className="bg-blue-400 text-white p-1 w-40" onClick={onLogin}>login </div>
                    </div>

                </div>
            </form>
            <Info value={info} />

        </div>
    </>
    )
}



export default withRouter(Login)