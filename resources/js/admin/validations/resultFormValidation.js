import * as Yup from 'yup';

export const resultFormValidation = Yup.object({
    score: Yup.object({
        course_score: Yup.number('Por favor ingrese un número')
            .required('El campo es requerido.'),
        correct_reagents: Yup.number('Por favor ingrese un número.').integer('No puedes agregar decimales.')
            .required('El campo es requerido.'),
        interview_score: Yup.number('Por favor ingrese un número')
            .required('El campo es requerido.'),
    })
})