import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const MySwal = withReactContent(Swal)

export const SwalReact = MySwal.mixin({
    customClass: {
        confirmButton: 'bg-primary-tec text-white px-3 py-2 rounded-xl  text-bold ms-3',
        cancelButton: 'bg-gray-400 text-white px-3 py-2 rounded-xl  text-bold ms-3'
    },
    buttonsStyling: false,
    allowEnterKey: false,
    allowOutsideClick: false,
    reverseButtons: true
})

export const Toast = MySwal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', SwalReact.stopTimer)
        toast.addEventListener('mouseleave', SwalReact.resumeTimer)
    },
})

export const ToastLoading = MySwal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: {
        popup: 'colored-toast'
    },
    showConfirmButton: false,
})