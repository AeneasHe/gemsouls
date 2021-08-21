
const useStorage = () => {
    const getToken = () => {
        var token = localStorage.getItem('token')
        console.log("gettoken:", token)
        return token
    }
    const setToken = (token) => {
        console.log("settoken:", token)
        localStorage.setItem('token', token)
    }
    return { getToken, setToken }
}


export default useStorage