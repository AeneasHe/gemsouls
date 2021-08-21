import { useCookies } from "react-cookie"
import cookie from "cookie"

export function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

const useCookie = () => {
    const [setCookie] = useCookies(["user"])

    const save = async (data) => {
        try {

            setCookie("user", JSON.stringify(data), {
                path: "/",
                maxAge: 3600 * 24 * 7, // cookeie 一小时后过期
                sameSite: true,
            })
        } catch (err) {
            console.log(err)
        }
    }


    return { save }
}

export default useCookie

