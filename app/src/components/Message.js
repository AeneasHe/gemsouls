import { UserIcon } from '@heroicons/react/outline';


export default function Message(props) {
    const { type, value } = props

    return type === "send" ?
        (
            <div className={"flex m-1 justify-end"} >
                <div className="bg-green-300  p-1 w-max"> {value} </div>
                <UserIcon className={"mx-3 h-8 w-8  text-green-300"} />
            </div >
        )
        :
        (
            <div className={"flex m-1 "} >
                <UserIcon className={"mx-3 h-8 w-8 text-gray-300"} />
                <div className="bg-white  p-1 w-max"> {value} </div>
            </div >
        )

}