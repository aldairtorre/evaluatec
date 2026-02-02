import * as Yup from 'yup';

export const questionFormValidation = Yup.object({
    question: Yup.object({
        number_question: Yup.string()
            .required('El campo es requerido.'),
        question: Yup.string()
            .required('El campo es requerido.'),
        section_id: Yup.object()
            .required('El campo es requerido.'),
    })
})