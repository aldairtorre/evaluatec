import { Formik, Form } from "formik";
import { Button } from "primereact/button";
import { CustonInputText } from "../common/Formik/CustonInputText";
import { CustomButtonLoginConfig } from "../utils/Formik/CustomButtonConfig";
import { usePostMutation } from "../hooks/usePostMutation";
import { loginValidation } from "../validations/loginValidation";

export const Login = () => {
    const loginMutation = usePostMutation();

    const handleSubmit = async (values) => {
        try {
            const response = await loginMutation.mutateAsync({
                url: 'auth.authenticate',
                params: {},
                data: values
            });
            if (response.data.success) {
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
                <div className="flex shadow-lg max-w-4xl bg-white rounded-lg overflow-hidden">
                    <div className="w-1/2 bg-blue-800 p-12 flex flex-col text-white justify-between">
                        <h1 className="text-4xl font-bold mb-8">Maestría en Desarrollo Regional e Innovación Tecnológica</h1>
                        <p className="text-uppercase">&reg;EvaluaTec. Todos los derechos reservados</p>
                    </div>

                    <div className="w-1/2 p-12">
                        <img src="/assets/logos/LogoMDRIT1.png" alt="logo" className=" w-28 h-28 block m-auto"/>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Bienvenido a la plataforma EvaluaTec</h2>
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values) => handleSubmit(values)}
                            validationSchema={loginValidation}
                            validateOnBlur={false}
                            validateOnChange={false}
                        >
                            {() => (
                                <Form>
                                    <CustonInputText label={'Correo electrónico'} name={'email'} />
                                    <CustonInputText label={'Contraseña'} type={'password'} name={'password'} />
                                    <Button label="Iniciar sesión" type="submit" disabled={loginMutation.isPending} pt={CustomButtonLoginConfig} />
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );


};
