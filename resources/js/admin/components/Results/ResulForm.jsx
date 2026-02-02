import { Form, Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { CustonInputText } from '../../common/Formik/CustonInputText';
import { Button } from 'primereact/button';
import { CustomButtonConfig } from '../../utils/Formik/CustomButtonConfig';
import { usePostMutation } from '../../hooks/admin/usePostMutation';
import { useSwalCustom } from '../../hooks/admin/useSwalCustom';
import axios from 'axios';
import { resultFormValidation } from '../../validations/resultFormValidation';

export const ResulForm = ({ isUpdate = false, isDelete = false, results, resultQuery }) => {

    const [openDialog, setOpenDialog] = useState(false)
    const resultMutation = usePostMutation();

    const handleInitData = (isUpdate) => {
        if (isUpdate) {
            return {
                score: {
                    course_score: results?.result?.course_score,
                    correct_reagents: results?.result?.correct_reagents,
                    interview_score: results?.result?.interview_score,
                }
            }
        } else {
            return {
                score: {
                    course_score: '',
                    correct_reagents: '',
                    interview_score: ''
                },

            }
        }
    }

    const formData = (values) => {
        const formData = new FormData();
        formData.append('score', JSON.stringify(values.score))
        return formData
    }

    const handleSubmit = async (values) => {

        if (results?.result !== null && isUpdate === false) {
            useSwalCustom(null, '¡Ya existe un puntaje!',
                'Ya existe un puntaje registrado para este aspirante',
                true, false,
                'Aceptar', 'Cancelar',
            )
            setOpenDialog(false)
            return
        }

        try {
            const response = await resultMutation.mutateAsync({
                url: 'admin.results.upsert',
                params: results?.id,
                data: formData(values)
            });
            console.log(response);
            if (response.data.success) {
                resultQuery.refetch();
                setOpenDialog(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteScore = (id) => {
        useSwalCustom(
            null,
            `¿Deseas elimar el puntaje del aspirante?`, null,
            true, true, 'Aceptar', 'Cancelar',
            null,
            handleDeleteAction,
            { scoreId: id }
        );
    }

    const handleDeleteAction = (params) => {
        axios.delete(route('admin.results.delete_score', params))
            .then(response => {
                if (response.data.success) {
                    useSwalCustom(null, response.data.title,
                        response.data.message,
                        false, false,
                        'Aceptar', 'Cancelar',
                        2000);
                    resultQuery.refetch();
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
                    <span
                        className='pi pi-plus-circle cursor-pointer'
                        onClick={results?.result === null ? (
                            () => setOpenDialog(true)
                        ) : (
                            () => {
                                useSwalCustom(null, '¡Existe un puntaje!',
                                    'Ya existe un puntaje agregado para este aspirante.',
                                    true, false,
                                    'Aceptar', 'Cancelar',
                                )
                            }
                        )}
                        style={{ fontSize: '22px' }}
                    ></span>
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
                    onClick={() => handleDeleteScore(results?.id)}
                />}

            <Dialog
                draggable={false}
                visible={openDialog}
                style={{ width: '25vw', zIndex: '1' }}
                onHide={() => setOpenDialog(false)}
                header={<p className='text-center'>{isUpdate ? 'Modificar puntaje' : 'Agregar puntaje'}</p>}
            >
                <Formik
                    initialValues={{
                        ...handleInitData(isUpdate),
                        isUpdate: isUpdate
                    }}
                    onSubmit={(values) => handleSubmit(values)}
                    validationSchema={resultFormValidation}
                    validateOnBlur={false}
                >
                    {() => (
                        <Form>
                            <CustonInputText
                                label='Ingrese el puntaje del curso propedeútico'
                                name='score.course_score'
                                type={'number'}
                            />
                            <CustonInputText
                                label='Ingrese el numero de reactivos correctos'
                                name='score.correct_reagents'
                                type={'number'}
                            />
                            <CustonInputText
                                label='Ingrese el puntaje de la entrevista'
                                name='score.interview_score'
                                type={'number'}
                            />
                            <Button
                                label={isUpdate ? 'Guardar puntaje' : 'Registrar puntaje'}
                                type='submit'
                                pt={CustomButtonConfig}
                            />
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}
