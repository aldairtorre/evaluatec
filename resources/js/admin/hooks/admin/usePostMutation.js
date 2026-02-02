import axios from 'axios';
import {useMutation} from '@tanstack/react-query';
import {SwalReact} from "../../utils/SwalConfig";

export const usePostMutation = () => {
    const mutation = useMutation({
            mutationFn: ({url, params, data}) => {
                return axios.post(route(url, params), data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            },
            onError: (error) => {
                SwalReact.fire({
                    icon: 'error',
                    title: response.data.title,
                    text: response.data.message,
                    showConfirmButton: false,
                    iconColor: '#E41B23',
                    color: 'black',
                    timer: 3000,
                    customClass: {
                        icon: 'border-color-red bg-red'
                    }
                }).then(() => {
                    return error;
                });
            },
            onSuccess: (response) => {
                SwalReact.fire({
                    icon: response.data.success ? 'success' : 'error',
                    title: response.data.title,
                    text: response.data.message,
                    showConfirmButton: false,
                    iconColor: '#1B396A',
                    color: 'black',
                    timer: 3000,
                    customClass: {
                        icon: 'border-color-blue bg-green'
                    }
                }).then(() => {
                    return response;
                })
            }
        }
    );
    return mutation;
}
