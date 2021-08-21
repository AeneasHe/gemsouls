import { useRouter } from 'next/router'

function MenuButton(props) {
    const router = useRouter()

    const color = router.asPath === props.link ? 'bg-red-200 hover:bg-red-600' : 'bg-blue-200 hover:bg-blue-600'

    const handleClick = () => {
        console.log("click")
        router.push(props.link)
    }

    return (
        <button className={"p-1 transition duration-500 ease-in-out  transform hover:-translate-y-1 hover:scale-110 " + color} onClick={handleClick}>
            {props.label}
        </button>
    )
}

function Nav(props) {
    return <div className="p-2 m-1 h-12 w-24  text-left ">
        <MenuButton label={props.label} link={props.link} />
    </div>
}

export default function Menu() {
    return (
        <div className="mx-auto m-2">
            <div className="flex flex-row justify-start items-start">
                <Nav label="Home" link="/" />
                <Nav label="ChatRoom" link="/chatroom" />
                <Nav label="Login" link="/user/login" />
            </div>
        </div>
    )
}