import fetch from 'cross-fetch';
import { useCallback } from 'react';
import useStorage from './useStorage'

export const encodeURL = (url, params = {}) => {
  const json = JSON.stringify(params)
  return `${url + encodeURIComponent(json)}`

}

let useAPI = () => {

  const { getToken, setToken, setUsername } = useStorage()

  let login = useCallback(async (url, params) => {

    try {
      const res = await fetch("/api" + url, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }

      var _data = await res.json();

      console.log("token response:", _data)

      setToken(_data.access_token);
      setUsername(_data.username)

      return true

    } catch (err) {
      console.error(err);
      return false
    }
  }, [setToken, setUsername])



  let get = useCallback(async (url, params) => {

    var token = getToken()
    console.log("get local token:", token)
    console.log('encodeurl:', encodeURL(url, params))
    try {
      const res = await fetch("/api" + url, {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token
        },
      });

      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }

      var _data = await res.json();

      console.log("get usename:", _data);

      return _data

    } catch (err) {
      console.error(err);
      return null
    }
  }, [getToken])



  let post = useCallback(async (url, params) => {

    var token = getToken()
    console.log("get local token:", token)


    try {
      const res = await fetch("/api" + url, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
      });

      if (res.status >= 400) {
        throw new Error("Bad response from server");
      }

      var _data = await res.json();

      return _data;

    } catch (err) {
      console.error(err);
      return null
    }
  }, [getToken])



  return { post, login, get }


}

export default useAPI