
import { useCallback, useState, useReducer, useEffect } from 'react'
import useWebsocket from '../hooks/useWebsocket'
import Chatbar from '../components/Chatbar'
import Message from '../components/Message'
import Info from '../components/Info'
import useStorage from '../hooks/useStorage'


export default function Chatroom() {

    const [msgSend, setMsgSend] = useState('')
    const { addMessage, getMessage, clearMessage } = useStorage()

    const [msgIds, setMsgIds] = useState([])


    const [msgs, dispatch] = useReducer((state, action) => {
        var msg
        switch (action.type) {

            case 'recieve':
                msg = {
                    id: action.id,
                    value: action.value,
                    type: "recieve",

                }
                if (!action.recover) {
                    if (msg.id !== "welcome") {
                        console.log("===>add:", msg)
                        addMessage(msg)
                    }
                }
                if (msgIds.indexOf(msg.id) > -1) {
                    return [...state]
                } else {
                    setMsgIds([...msgIds, msg.id])
                    return [...state, msg]
                }

            case 'send':
                msg = {
                    id: action.id,
                    value: action.value,
                    type: "send"
                }
                if (!action.recover) {
                    if (msg.id !== "welcome") {
                        addMessage(msg)
                    }
                }

                if (msgIds.indexOf(msg.id) > -1) {
                    return [...state]
                } else {
                    setMsgIds([...msgIds, msg.id])
                    return [...state, msg]
                }

            case 'clear':
                return []

            default:
                console.log(action)
        }
    }, [])


    const [info, setInfo] = useState(null)


    const { sendMessage } = useWebsocket(dispatch)

    // 发送消息给ws服务器
    const onSendMessage = useCallback(() => {
        if (msgSend) {
            setInfo("")
            console.log("sendmessage:", msgSend)
            var id = "send@" + (new Date()).valueOf().toString()
            dispatch({ value: msgSend, type: "send", id: id })
            sendMessage(msgSend)

        } else {
            setInfo('message can not be blank')
            setInterval(function () { setInfo("") }, 3000);
        }
    }, [dispatch, msgSend, sendMessage, setInfo])

    const onClearMessage = useCallback(() => {
        setMsgIds([])
        dispatch({ type: "clear" })
        clearMessage()
    })
    // 初始欢迎消息
    useEffect(() => {
        //var id = "recieve@" + (new Date()).valueOf().toString()
        dispatch({ value: "welcome to gemsouls chatroom", type: "recieve", id: "welcome" })
    }, [])

    // 从历史消息里还原
    useEffect(() => {
        var _msgs = getMessage()
        if (_msgs) {
            console.log("====>", typeof _msgs)
            _msgs.map((m) => {
                m.recover = true
                return dispatch(m)
            })
        }
    }, [])

    // console.log("===>msgIds:", msgIds)

    return (
        <div className="container mx-auto" >

            <div className="flex flex-col justify-center text-center">
                <h3>Gemsouls Chat Room</h3>
            </div>

            <div className="msg-container flex flex-col  bg-gray-100 my-10 w-30">
                <div className="flex flex-col p-3 justify-start">
                    {
                        msgs.map((_msg) => {
                            return <Message value={_msg.value} key={_msg.id} type={_msg.type} />
                        })
                    }
                </div>
            </div>

            <div className="flex flex-col justify-center w-30 bg-gray-50 my-10">
                <Chatbar  {...{ msgSend, setMsgSend, onSendMessage, onClearMessage }} />
                <Info value={info} />
            </div>
        </div>
    )
}
