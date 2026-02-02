import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Form, Formik } from 'formik';
import { CustonInputText} from '../../common/Formik/CustonInputText';
import { CustomTextArea } from '../../common/Formik/CustomTextArea';
import { CustomButtonConfig } from '../../utils/Formik/CustomButtonConfig';
import { Button } from 'primereact/button';
import { usePostMutation } from '../../hooks/admin/usePostMutation';
import axios from 'axios';
import { useSwalCustom } from '../../hooks/admin/useSwalCustom';
import { CustomDrawdown } from '../../common/Formik/CustomDrawdown';
import { CustomDrowdomConfig } from '../../utils/Formik/CustomDrawdonwConfig';
import { questionFormValidation } from '../../validations/questionFormValidation';

export const QuestionForm = ({ isUpdate = false, isDelete = false, sections = [], questionQuery, questionData}) => {

    const [openDialog, setOpenDialog] = useState(false);
    const questionMutation = usePostMutation();

    const handleInitData = (isUpdate) => {
        if (isUpdate) {
            return {
                question: {
                    number_question: questionData?.number_question,
                    question: questionData?.question,
                    section_id : questionData?.section,
                }
            }
        }else{
            return {
                question: {
                    number_question: '',
                    question: '',
                    section_id : '',
                }
            }
        }
    }

    const formData = (values) => {
        const formData = new FormData();
        formData.append('question', JSON.stringify(values.question));
        return formData;
    }

    const handleSubmit = async (values) => {
        const data = {
            question: {
                ...values.question,
                section_id : values.question.section_id.id,
            }
        }
        
        try {
            const res = await questionMutation.mutateAsync({
                url: 'admin.questions.upsert',
                params: isUpdate ? questionData.id : 'FAKE_ID',
                data: formData(data)
            })
            if (res.data.success) {
                questionQuery.refetch();
                setOpenDialog(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteQuestion = (id) => {
        useSwalCustom(
            null,
            `¿Deseas elimar la pregunta?`, null,
            true, true, 'Aceptar', 'Cancelar',
            null,
            handleDeleteAction,
            { questionId: id }
        );
    }

    const handleDeleteAction = (params) => {
        axios.delete(route('admin.questions.delete_question', params))
        .then(response => {
            if (response.data.success) {
                useSwalCustom(null, response.data.title,
                    response.data.message,
                    false, false,
                    'Aceptar', 'Cancelar',
                    2000);
                questionQuery.refetch();
            } else {
                useSwalCustom(null, '¡Error!',
                    response.data.message,
                    false, false,
                    'Aceptar', 'Cancelar',
                    2000);
            }
        })
    }

    return (
        <>
            {isDelete === false && (
                !isUpdate ?
                    <button className='bg-slate-700 px-5 py-2 rounded text-white flex items-center gap-1' onClick={() => setOpenDialog(true)}>
                        <span className='pi pi-plus-circle'></span>
                        Agregar
                    </button>
                    :
                    <img
                        className='cursor-pointer'
                        alt={'Imagen'}
                        src={'/assets/icons/edit.svg'}
                        width="25px"
                        height={'25px'}
                        onClick={() => setOpenDialog(true)}
                    />
            )}
            {isDelete !== false &&
                <i
                    className="pi pi-times-circle p-input-icon-left text-red-600 me-1 cursor-pointer"
                    style={{ fontSize: '22px' }}
                    data-pr-position="left"
                    data-pr-at="center right"
                    data-pr-my="center left"
                    onClick={() => handleDeleteQuestion(questionData?.id)}
                />}
            {
                <Dialog
                    visible={openDialog}
                    draggable={false}
                    style={{ width: '30vw', zIndex: '1' }}
                    onHide={() => setOpenDialog(false)}
                    header={<p className='text-center'>{isUpdate ? 'Modificar pregunta' : 'Agregar pregunta'}</p>}
                >
                    <Formik 
                        initialValues={handleInitData(isUpdate)}
                        onSubmit={(values) => handleSubmit(values)}
                        validationSchema={questionFormValidation}
                        validateOnBlur={false}
                    >
                        {() => (
                            <Form>
                                <CustonInputText
                                    label='No. Pregunta'
                                    type='number'
                                    name = 'question.number_question'
                                />
                                <CustomTextArea
                                    label='Pregunta'
                                    name= 'question.question'
                                />
                                <CustomDrawdown
                                    label='Sección'
                                    name='question.section_id'
                                    pt={CustomDrowdomConfig}
                                    options={sections}
                                    optionLabel='label'
                                />
                                <Button
                                    label={isUpdate ? 'Guardar pregunta' : 'Registrar pregunta'}
                                    type="submit"
                                    //disabled={usersQuery.isPending}
                                    pt={CustomButtonConfig}
                                />
                            </Form>
                        )}
                    </Formik>
                </Dialog>
            }
        </>
    )
}
