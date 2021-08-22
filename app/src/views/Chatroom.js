
import { useCallback, useState, useReducer, useEffect } from 'react'
import useWebsocket from '../hooks/useWebsocket'
import Chatbar from '../components/Chatbar'
import Message from '../components/Message'
import Info from '../components/Info'

export default function Chatroom() {

    const [msgSend, setMsgSend] = useState('')

    const [msgs, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'recieve':
                return [...state,
                {
                    id: action.id,
                    value: action.value,
                    type: "recieve"
                }]
            case 'send':
                return [...state,
                {
                    id: action.id,
                    value: action.value,
                    type: "send"
                }]
            default:
                console.log(action)
        }
    }, [])


    const [info, setInfo] = useState(null)


    const { sendMessage, msgRecieve } = useWebsocket(dispatch)

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

    useEffect(() => {
        var id = "recieve@" + (new Date()).valueOf().toString()

        dispatch({ value: "welcome to gemsouls chatroom", type: "recieve", id: id })
    }, [])

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
                <Chatbar  {...{ msgSend, setMsgSend, onSendMessage }} />
                <Info value={info} />
            </div>



        </div>
    )
}
