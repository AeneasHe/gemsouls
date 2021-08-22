

import { useCallback, useEffect, useState } from 'react'

import useAPI from '../../hooks/useAPI'

export default function Profile() {
    const api = useAPI()

    const [username, setUsername] = useState(null)

    const onProfile = useCallback((e) => {
        console.log('profile')
        api.get('/user/me').then(data => {
            console.log('data:', data)
            setUsername(data.username)
        })


    }, [api])

    useEffect(() => {
        onProfile()
    }, [onProfile])

    return (<>
        <h3>User profile</h3>

        <div className="my-4">
            username:{username}
        </div>
    </>
    )
}
