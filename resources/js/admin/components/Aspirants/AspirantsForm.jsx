import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { Form, Formik } from 'formik';
import { CustonInputText } from '../../common/Formik/CustonInputText'
import { CustonInputTextConfig } from '../../utils/Formik/CustomInputTextConfig';
import { useState } from 'react';
import { CustomButtonConfig } from '../../utils/Formik/CustomButtonConfig';
import { usePostMutation  } from '../../hooks/admin/usePostMutation'

export const AspirantsForm = ({ isUpdate = false, aspirantsQuery }) => {

    const [openDialog, setOpenDialog] = useState(false);
    const aspirantMutation = usePostMutation();

    const handleDataInit = (isUpdate) => {
        if (isUpdate) {
            return {
                'aspirant': {
                    'name': '',
                    'first_last_name': '',
                    'second_last_name': '',
                    'email': '',
                    'phone': '',
                }
            }
        }

        return {
            'aspirant': {
                'name': '',
                'first_last_name': '',
                'second_last_name': '',
                'email': '',
                'phone': '',
            }
        }
    }

    const formData = (values) => {
        const formData = new FormData();
        formData.append('aspirant', JSON.stringify(values.aspirant))
        return formData
    }

    const handleSubmit = async (values) => {
       try {
            const response = await aspirantMutation.mutateAsync({
                url: 'admin.aspirants.upsert',
                params: isUpdate ? userData.id : 'FAKE_ID',
                data: formData(values)
            })
            if (response.data.success) {
                aspirantsQuery.refetch();
                setOpenDialog(false);
            }
       } catch (error) {
        console.log(error);
       }
    }   

    return (
        <>
            {!isUpdate ?
                <button
                    className="bg-black text-white px-2 py-3 rounded cursor-pointer"
                    onClick={() => setOpenDialog(true)}
                >Agregar aspirante
                </button> : ''
            }
            <Dialog
                draggable={false}
                visible={openDialog}
                style={{ width: '30vw', zIndex: '1' }}
                onHide={() => setOpenDialog(false)}
                header={<p className='text-center'>{isUpdate ? 'Modificar aspirante' : 'Agregar aspirante'}</p>}
            >
                <Formik
                    initialValues={handleDataInit(isUpdate)}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {() => (
                        <Form>
                            <CustonInputText
                                label={'Nombre'}
                                name={'aspirant.name'}
                            />
                            <CustonInputText
                                label={'Apellido Paterno'}
                                name={'aspirant.first_last_name'}
                            />
                            <CustonInputText
                                label={'Apellido materno'}
                                name={'aspirant.second_last_name'}
                            />
                            <CustonInputText
                                label={'Email'}
                                name={'aspirant.email'}
                            />
                            <CustonInputText
                                label={'Telefono'}
                                name={'aspirant.phone'}
                            />
                            <Button
                                label='Registrar aspirante'
                                pt={CustomButtonConfig}
                                type='submit'
                            />
                        </Form>
                    )}
                </Formik>
            </Dialog>
        </>
    )
}
