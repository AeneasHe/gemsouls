
const useStorage = () => {
    const setUsername = (username) => {
        localStorage.setItem('username', username)
    }
    const getUsername = () => {
        return localStorage.getItem('username')
    }

    const getToken = () => {
        var token = localStorage.getItem('token')
        return token
    }
    const setToken = (token) => {
        localStorage.setItem('token', token)
    }

    const clearToken = (token) => {
        localStorage.removeItem('token', token)
    }


    const getMessage = () => {
        return JSON.parse(localStorage.getItem('messages'))
    }

    const clearMessage = () => {
        return localStorage.removeItem('messages')
    }

    const addMessage = (message) => {
        var messages = getMessage()

        if (!messages) {
            messages = []
        }
        messages.push(message)
        localStorage.setItem('messages', JSON.stringify(messages))

    }

    return {
        setUsername, getUsername,
        getToken, setToken, clearToken, getMessage, addMessage, clearMessage
    }
}


export default useStorage