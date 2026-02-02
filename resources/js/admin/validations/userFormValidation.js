import * as Yup from 'yup';

export const userFormValidation = Yup.object({
    user: Yup.object({
        name: Yup.string('Por favor ingrese un texto')
            .required('El campo es requerido.'),
        first_last_name: Yup.string('Por favor ingrese un texto')
            .required('El campo es requerido.'),
        second_last_name: Yup.string('Por favor ingrese un texto')
            .required('El campo es requerido.'),
        email: Yup.string()
            .email('El correo debe tener un formato válido.')
            .required('El correo es requerido.'),
        password: Yup.string().trim().min(8, 'La contraseña debe tener al menos 8 caracteres')
            .required('La contraseña es requerida'),
        gender_id: Yup.object()
            .required('El campo es requerido'),
        profile_id: Yup.object()
            .required('El campo es requerido')
    })
})
