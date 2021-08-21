import createPersistedState from 'use-persisted-state';

const useToken = createPersistedState('token');


const useStorage = () => {
    const [token, _setToken] = useToken('');

    let setToken = (_token) => {
        console.log("set token:", _token)
        _setToken(_token)
    }
    return { token, setToken }
}


export default useStorage