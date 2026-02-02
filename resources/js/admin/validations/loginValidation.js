import * as Yup from 'yup';

export const loginValidation = Yup.object({
    email: Yup.string()
        .email('El correo debe tener un formato válido.')
        .required('El correo es requerido.'),
    password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres.')
        .required('La contraseña es requerida.'),
})