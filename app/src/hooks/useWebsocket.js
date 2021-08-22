import { useEffect, useState, useCallback } from 'react'


const wsUrl = "ws://127.0.0.1:8000/ws"

function useWebsocket(dispatch) {

    const [ws, setWs] = useState(null)
    const [msgRecieve,] = useState('')

    const sendMessage = useCallback((msg) => {
        if (ws) {
            console.log('send msg:', msg)
            ws.send(msg)
        }
    }, [ws])

    useEffect(() => {
        var _ws = new WebSocket(wsUrl)

        _ws.onopen = function () {
            console.log("open");
        }

        _ws.onmessage = function (e) {
            dispatch({
                type: 'recieve',
                value: e.data,
                id: "recieve@" + (new Date()).valueOf().toString()
            })
        }

        _ws.onclose = function (e) {
            console.log("close");
        }

        _ws.onerror = function (e) {
            console.log(e);
        }

        setWs(_ws)

        return () => {
            console.log('close 2')
            _ws.close()
        }
    }, [dispatch])

    return { sendMessage, msgRecieve }

}

export default useWebsocket