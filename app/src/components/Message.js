export default function Message(props) {
    const { type, value } = props

    return type == "send" ?
        (
            <div className={"flex m-1 justify-end"} >
                <div className="bg-green-300  p-1 w-max"> {value} </div>
            </div >
        )
        :
        (
            <div className={"flex m-1 "} >
                <div className="bg-white  p-1 w-max"> {value} </div>
            </div >
        )

}