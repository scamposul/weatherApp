import axios from "axios";
import { useEffect, useState } from "react";

const UseApi = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        getData();
    }, [])

    const getData = (url) => {
        axios.get(url).
        then(res => setData(res.data))
    }

    return {data, getData}
}

export default UseApi;