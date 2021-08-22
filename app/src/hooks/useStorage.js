
const useStorage = () => {
    const getToken = () => {
        var token = localStorage.getItem('token')
        //console.log("gettoken:", token)
        return token
    }
    const setToken = (token) => {
        console.log("settoken:", token)
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
        console.log("messsages:", messages)

        if (!messages) {
            messages = []
        }
        messages.push(message)

        localStorage.setItem('messages', JSON.stringify(messages))

    }

    return { getToken, setToken, clearToken, getMessage, addMessage, clearMessage }
}


export default useStorage