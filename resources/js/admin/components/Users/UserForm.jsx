import { useState } from 'react';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";
import { Form, Formik } from 'formik';
import { CustonInputText } from '../../common/Formik/CustonInputText';
import { CustomButtonConfig } from '../../utils/Formik/CustomButtonConfig';
import { CustomDrawdown } from '../../common/Formik/CustomDrawdown';
import { CustomDrowdomConfig } from '../../utils/Formik/CustomDrawdonwConfig';
import { CustomFormImageInput } from '../../common/Formik/CustomFormImageInput';
import { toast } from 'react-toastify';
import { usePostMutation } from '../../hooks/admin/usePostMutation';
import { userFormValidation } from '../../validations/userFormValidation';

export const UserForm = ({ isUpdate = false, userData, usersQuery }) => {

    const [openDialog, setOpenDialog] = useState(false)
    const userMutation = usePostMutation();    

    const handleInitData = (isUpdate) => {
        if (isUpdate) {
            return {
                user: {
                    name: userData?.name,
                    first_last_name: userData?.first_last_name,
                    second_last_name: userData?.second_last_name,
                    phone: userData?.phone,
                    email: userData?.email,
                    password: userData?.password,
                    gender_id: userData?.gender,
                    profile_id: userData?.profile
                },
                user_image: userData?.image_user || ''
            }
        } else {
            return {
                user: {
                    name: '',
                    first_last_name: '',
                    second_last_name: '',
                    phone: '',
                    email: '',
                    password: '',
                    gender_id: '',
                    profile_id: ''
                },
                user_image: ''
            }
        }
    }

    const formData = (values) => {
        const formData = new FormData();
        formData.append('user', JSON.stringify(values.user));
        formData.append('profile_image', values.user_image[0]);
        return formData;
    }

    const handleSubmit = async (values) => {

        const data = {
            user: {
                ...values.user,
                gender_id: values.user.gender_id.id,
                profile_id: values.user.profile_id.id
            },
            user_image : values.user_image
        }

        try {
            const response = await  userMutation.mutateAsync({
                url: 'admin.users.upsert',
                params: isUpdate ? userData.id : 'FAKE_ID',
                data: formData(data)
            });
            if (response.data.success) {
                usersQuery.refetch();
                setOpenDialog(false);
            }
        } catch (error) {
            console.log(error);
        }
        // toast.success('Usuario agregado')
    }

    return (
        <>
            {!isUpdate ?
                <button className='bg-black px-5 py-2 rounded text-white flex items-center gap-1' onClick={() => setOpenDialog(true)}>
                    <span className='pi pi-plus-circle pl-2'></span>
                    Agregar Usuario
                </button>
                :
                <Button
                    className='mt-4 p-button-text'
                    label={'Editar'}
                    onClick={() => setOpenDialog(true)}
                /> }
            {
                <Dialog
                    draggable={false}
                    visible={openDialog}
                    style={{ width: '40vw', zIndex: '1' }}
                    onHide={() => setOpenDialog(false)}
                    header={<p className='text-center'>{isUpdate ? 'Modificar usuario' : 'Agregar usuario'}</p>}
                >
                    <Formik
                        initialValues={{
                            ...handleInitData(isUpdate),
                            isUpdate: isUpdate
                        }}
                        onSubmit={(values) => handleSubmit(values)}
                        validationSchema={userFormValidation}
                        validateOnBlur={false}
                    >
                        {() => (
                            <Form>
                                <CustomFormImageInput
                                    label='Seleccione o arrastre una imagen'
                                    name='user_image'
                                    userImage={userData?.image_user}
                                />
                                <div className='flex gap-3'>
                                    <CustonInputText
                                        label='Apellido paterno'
                                        name='user.first_last_name'

                                    />
                                    <CustonInputText
                                        label='Apellido Materno'
                                        name='user.second_last_name'
                                    />
                                    <CustonInputText
                                        label='Nombre(s)'
                                        name='user.name'
                                    />
                                </div>
                                <CustonInputText
                                    label='Telefono'
                                    name='user.phone'
                                />
                                <CustonInputText
                                    label='Correo electrónico'
                                    type='email'
                                    name='user.email'
                                />
                                <CustonInputText
                                    label='Contraseña'
                                    type='password'
                                    name='user.password'
                                />
                                <CustomDrawdown
                                    label='Genero'
                                    name='user.gender_id'
                                    pt={CustomDrowdomConfig}
                                    options={usersQuery.data?.genders}
                                    optionLabel="name"
                                />
                                <CustomDrawdown
                                    label='Perfil'
                                    name='user.profile_id'
                                    pt={CustomDrowdomConfig}
                                    options={usersQuery.data?.profiles}
                                    optionLabel="name"
                                />
                                <Button
                                    label={isUpdate ? 'Guardar usuario' : 'Registrar usuario'}
                                    type="submit"
                                    disabled={usersQuery.isPending}
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
