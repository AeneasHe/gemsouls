import { ChatAlt2Icon, XCircleIcon } from '@heroicons/react/outline';



export default function Chatbar(props) {
    const { msgSend, setMsgSend, onSendMessage, onClearMessage } = props

    return (
        <form className="flex  p-3 m-3 lg:w-8/12 justify-center text-lg">
            <input type="text" name="msg-send" width="800" className="msg-input border-2 border-blue-500" value={msgSend} onChange={(e) => setMsgSend(e.target.value)} />
            <ChatAlt2Icon className={"mx-3 h-8 w-8 "} onClick={onSendMessage} />
            <XCircleIcon className={"mx-3 h-8 w-8 "} onClick={onClearMessage} />
        </form>
    )
}