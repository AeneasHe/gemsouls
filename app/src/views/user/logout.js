import { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import useStorage from '../../hooks/useStorage';


function Logout(props) {

    let history = useHistory();
    const { clearToken } = useStorage()


    useEffect(() => {
        clearToken()
        history.push('/login')

    })
    return (<>

    </>
    )
}



export default Logout