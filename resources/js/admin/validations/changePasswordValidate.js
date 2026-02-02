import * as Yup from 'yup';

export const changePasswordValidate = Yup.object({
    current_password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres.')
        .required('La contraseña es requerida.'),
    password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres.')
        .required('La contraseña es requerida.'),
    password_confirm: Yup.string().trim()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('La confirmación de la contraseña es requerida'),
})