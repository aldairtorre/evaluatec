import { useContext } from "react";
import { useMutation } from "@tanstack/react-query"
import { SwalReact } from '../utils/SwalConfig'
import axios from 'axios';
import { UserContext } from "../context/UserContext";

export const usePostMutation = () => {

    const mutation = useMutation({
        mutationFn: ({ url, params, data }) => {
            return axios.post(route(url, params), data);
        },
        onSuccess: (response) => {
            if (response.data.success) {
                SwalReact.fire({
                    icon: response.data.success ? 'success' : 'error',
                    title: response.data.title,
                    text: response.data.message,
                    showConfirmButton: false,
                    iconColor: '#4de41b',
                    color: 'black',
                    timer: 1500,
                    customClass: {
                        icon: 'border-color-green bg-green'
                    }
                }).then(() => {
                    window.location.reload()
                    return response;
                });
            }else {
                SwalReact.fire({
                    icon: 'error',
                    title: '¡Acceso denegado!',
                    text: response.data.message,
                    showConfirmButton: false,
                    iconColor: '#E41B23',
                    color: 'black',
                    timer: 2000,
                    customClass: {
                        icon: 'bg-red'
                    }
                })
        }},
        onError: (error) => {
            SwalReact.fire({
                icon: 'error',
                title: error.message,
                text: '',
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
        }
    });

    return mutation
}