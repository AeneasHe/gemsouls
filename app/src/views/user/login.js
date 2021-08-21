import { useState, useCallback } from 'react'
import useAPI from '../../hooks/useAPI'
import useStorage from '../../hooks/useStorage'

function Login() {
    const [username, setUsername] = useState('aeneas')
    const [password, setPassword] = useState('123456')
    const { getToken, setToken } = useStorage()

    const api = useAPI()

    const onLogin = useCallback((e) => {
        console.log('login')
        api.login('/token', { username, password })

    }, [username, password])

    const onProfile = useCallback((e) => {
        console.log('profile')
        api.get('/user/me')

    }, [])


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
                    <div className="my-4">
                        <div className="bg-blue-400 text-white p-1 w-40" onClick={onProfile}>get user </div>
                    </div>
                </div>
            </form>

        </div>
    </>
    )
}



export default Login