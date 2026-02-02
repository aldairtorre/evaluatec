import { Button } from "primereact/button"
import { CustomButtonConfig } from "../utils/Formik/CustomButtonConfig"
import { Dialog } from 'primereact/dialog';
import { Form, Formik } from 'formik';
import { useState } from "react";
import { CustonInputText } from "../common/Formik/CustonInputText";
import { changePasswordValidate } from "../validations/changePasswordValidate";
import { usePostMutation } from "../hooks/usePostMutation";

export const ProfileHome = () => {

  const passwordMutation = usePostMutation();

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const response = await passwordMutation.mutateAsync({
        url: 'admin.users.change_password',
        params: {},
        data: values
      });
      if (response.data.success) {
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="bg-primary-tec min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-1/3 flex flex-col items-center">
          <img
            src={user.image_user ? user.image_user?.url_image : "/assets/img/usuario.png"}
            alt="usuario.png"
            className='rounded-full w-52 h-52 object-cover mb-4'
          />
          <div className="">
            <p className="text-xl mb-2"><span className="font-bold">Nombre:</span> {user.full_name}</p>
            <p className="text-xl mb-2"><span className="font-bold">Email:</span> {user.email}</p>
            <p className="text-xl"><span className="font-bold">Teléfono:</span> {user.phone}</p>
            <p className="text-xl"><span className="font-bold">Genero:</span> {user.gender.name}</p>
            <p className="text-xl"><span className="font-bold">Rol:</span> {user.profile.name}</p>
          </div>

          <Button
            label="Cambiar Contraseña"
            type="buttom"
            className="mt-5 w-1/3 "
            pt={CustomButtonConfig}
            onClick={() => setOpenDialog(true)}
          />
        </div>
      </div>
      <Dialog
        visible={openDialog}
        onHide={() => setOpenDialog(false)}
        style={{ width: '30vw', zIndex: '1' }}
        header={<p className='text-center'>{'Cambiar contraseña'}</p>}
      >
        <Formik
          onSubmit={(values) => handleSubmit(values)}
          initialValues={{
            current_password: '',
            password: '',
            password_confirm: ''
          }}
          validationSchema={changePasswordValidate}
          validateOnBlur={false}
        >
          {() => (
            <Form>
              <CustonInputText
                label='Contraseña anterior'
                name='current_password'
                type='password'
              />
              <CustonInputText
                label='Nueva contraseña'
                name='password'
                type='password'
              />
              <CustonInputText
                label='Confirmar contraseña'
                name='password_confirm'
                type='password'
              />
              <Button
                label="Cambiar contraseña"
                pt={CustomButtonConfig}
              />
            </Form>
          )}
        </Formik>
      </Dialog>
    </>

  )
}
