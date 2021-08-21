import fetch from 'cross-fetch';
import { useEffect, useState, useCallback } from 'react';
import useStorage from './useStorage'
// import lscache from "lscache";


let useAPI = () => {

  const { getToken, setToken } = useStorage()

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


    } catch (err) {
      console.error(err);
      return null
    }
  })



  let get = useCallback(async (url, params) => {

    var token = getToken()
    console.log("get local token:", token)

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

      console.log("get:", _data);

    } catch (err) {
      console.error(err);
      return null
    }
  }, [])



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


    } catch (err) {
      console.error(err);
      return null
    }
  }, [])



  return { post, login, get }


}

export default useAPI