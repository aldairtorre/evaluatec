import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const getFetchData = async (url, params) => {
    const { data } = await axios.get(route(url, params));
    return data;
}

export const useFetchQuery = (url = '', params={}, queryName = '') => {
    return useQuery({
        queryKey: [queryName],
        queryFn: () => getFetchData(url, params)
    });
}