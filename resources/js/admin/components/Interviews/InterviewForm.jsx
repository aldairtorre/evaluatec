import { useEffect, useState } from "react"
import { Dialog } from 'primereact/dialog';
import { Steps } from 'primereact/steps';
import { CustomStepsConfig } from "../../utils/Formik/CustomStepsConfig";
import { Button } from "primereact/button";
import { InputTextarea } from 'primereact/inputtextarea';
import { CustonInputTextConfig } from "../../utils/Formik/CustomInputTextConfig";
import { usePostMutation } from "../../hooks/admin/usePostMutation";
import { SwalReact } from "../../utils/SwalConfig";
import { useSwalCustom } from "../../hooks/admin/useSwalCustom";
import { color } from "chart.js/helpers";

export const InterviewForm = ({ isUpdate = false, questions = [], aspirant, userAuthenticate, aspirantsQuery, interviewEdit = [], sections = [], interviewQuery }) => {

    const interviewMutation = usePostMutation()

    const [openDialog, setOpenDialog] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [interview, setInterview] = useState([]);

    const handleEditInterview = () => {
        let array = interviewEdit?.question_answers?.map(({ answer, question }) => {
            return {
                question: question.question,
                answer: answer.answer,
            }
        })
        setInterview(array)
    }

    const handleChangeInterview = (e, index) => {
        let question = questions?.find(q => q.id === index);
        let newAnswer = {
            ...question,
            'answer': e.target.value
        }
        setInterview(prevInterview => {
            let updatedInterview = [...prevInterview];
            updatedInterview[index - 1] = newAnswer;
            return updatedInterview;
        });
    }

    const formData = (values, user) => {
        const formData = new FormData();
        formData.append('interview', JSON.stringify(values));
        formData.append('user', JSON.stringify(user));
        return formData;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        const hasUndefinedField = interview.some(item => item === undefined);
        let newArrayAnswers = interview
    
        if (hasUndefinedField) {
            const undefinedCount = interview.filter(item => item === undefined).length;
    
            if (undefinedCount > 1) {
                useSwalCustom(null, '¡Existen campos vacios!',
                    'Debe completar todo los campos',
                    true, false,
                    'Aceptar', 'Cancelar',
                );
                setActiveIndex(0);
                return;
            }
    
            if (interview[16] === undefined && interview.length > 16) {
                const newObject = {
                    id: 17,
                    question: "Comentarios o preguntas adicionales",
                    answer: "",
                    number_question: 17,
                    section_id: 6
                };

                const twentyOneObject = {
                    id: 21,
                    question: "Tiene comentarios o preguntas adicionales",
                    answer: "",
                    number_question: 21,
                    section_id: 7
                }
    
                const updatedInterview = [
                    ...interview.slice(0, 16), 
                    newObject,                
                    ...interview.slice(17,20),
                    twentyOneObject  
                ];

                newArrayAnswers = updatedInterview
            } 
        }
        
    
        if (interview.length === 0 || interview.length < (interviewQuery?.data?.questions.length) - 2) {
            useSwalCustom(null, '¡Existen campos vacios!',
                'Debe completar todo los campos',
                true, false,
                'Aceptar', 'Cancelar',
            );
            setActiveIndex(0);
            return;
        }
    
        const currentInterview = newArrayAnswers; 
    
        try {
            const response = await interviewMutation.mutateAsync({
                url: 'admin.interviews.upsert',
                params: aspirant.id,
                data: formData(currentInterview, userAuthenticate) // Enviar el estado actual
            });
            
            if (response.data.success) {
                setActiveIndex(0);
                setOpenDialog(false);
                aspirantsQuery.refetch();
                interviewQuery.refetch();
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleNextOrBack = (e) => {
        if (!questions?.length) return;

        const { key } = e;
        const isRightKey = key === 'ArrowRight';
        const isLeftKey = key === 'ArrowLeft';

        if (isRightKey && activeIndex < questions.length - 1) {
            setActiveIndex(activeIndex + 1);
        } else if (isLeftKey && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    }

    useEffect(() => {
        if (isUpdate && interviewEdit && interviewEdit.question_answers) {
            handleEditInterview();
        }
    }, [isUpdate, interviewEdit]);

    return (
        <>
            {isUpdate ?
                <img
                    onClick={
                        aspirant?.interview ?
                            () => setOpenDialog(true)
                            :
                            () => {
                                useSwalCustom(null, '¡Sin entrevista!',
                                    'No se ha encontrado alguna entrevista para este aspirante',
                                    true, false,
                                    'Aceptar', 'Cancelar',
                                )
                            }

                    }
                    src="/assets/icons/escritura.png"
                    alt="print"
                    className="h-12 cursor-pointer"
                />

                :
                <img
                    onClick={
                        aspirant.interview ? () => {
                            useSwalCustom(null, '¡Entrevistado!',
                                'Ya existe una entrevista para este aspirante',
                                true, false,
                                'Aceptar', 'Cancelar',
                            )
                        } : () => setOpenDialog(true)
                    }
                    src="/assets/icons/expediente.png"
                    alt="print"
                    className="h-12 cursor-pointer" />
            }
            <Dialog
                draggable={false}
                visible={openDialog}
                style={{ width: '100vw', height: '100vw', zIndex: '1' }}
                className="bg-gray-100"
                onKeyDown={handleNextOrBack}
                onHide={() => setOpenDialog(false)}
                header={
                    <>
                        <p className='text-center mb-3'>{isUpdate ? 'Modificar entrevista' : 'Agregar entrevista'}</p>
                        <Steps
                            pt={CustomStepsConfig}
                            model={sections}
                            activeIndex={activeIndex}
                            onSelect={(e) => setActiveIndex(e.index)}
                            readOnly={false}
                        />
                    </>
                }
            >
                <div className="bg-gray-100 p-2 w-3/4 m-auto rounded-lg">
                    <div className="mt-5 mb-5 w-3/4 m-auto border border-primary-tec p-3 rounded-lg bg-white shadow">
                        <p className="font-bold">Nombre: <span className="font-normal">{aspirant.full_name}</span></p>
                        <p className="font-bold">Entrevistador: <span className="font-normal">{isUpdate ? interviewEdit?.user?.full_name : userAuthenticate?.full_name}</span></p>
                    </div>

                    <form
                        className="w-3/4 m-auto"
                        onSubmit={handleSubmit}
                    >
                        {
                            questions.map(question => (
                                question.section_id === (activeIndex + 1) && (
                                    <div className={`mb-3 bg-white p-3 rounded-lg border border-primary-tec`} key={question.id} >
                                        <p>{`Pregunta ${question.number_question} : ${question.question} `} <span className='text-red-600'>*</span></p>
                                        <InputTextarea
                                            value={interview[question.id - 1]?.answer || ''}
                                            onChange={(e) => handleChangeInterview(e, question.id)}
                                            className='h-[12vh]'
                                            placeholder="Escribe tu respuesta aquí"
                                            pt={CustonInputTextConfig}
                                        // onFocus={() => setActive(!active)}
                                        />
                                    </div>
                                )
                            ))
                        }
                        {/* <div className='mb-3' >
                            <p className='font-semibold text-xl'>{`Pregunta ${questions[activeIndex]?.number_question} : ${questions[activeIndex]?.question} `} <span className='text-red-600'>*</span></p>
                            <InputTextarea
                                value={interview[activeIndex]?.answer || ''}
                                onChange={(e) => handleChangeInterview(e, activeIndex)}
                                className='h-[30vh]'
                                pt={CustonInputTextConfig}
                            />
                        </div> */}
                        <div className="flex justify-end gap-5">
                            <Button
                                label="Regresar"
                                className="bg-gray-200 font-bold px-5 py-2 rounded-xl"
                                onClick={() => setActiveIndex(activeIndex - 1)}
                                disabled={activeIndex <= 0}
                                type="button"
                            />
                            <Button
                                label={activeIndex >= (questions?.length - 1) ? 'Guardar' : 'Siguiente'}
                                className="bg-black text-white font-bold px-5 py-2 rounded-xl"
                                onClick={() => setActiveIndex(activeIndex + 1)}
                                type={activeIndex === (sections?.length) ? 'submit' : 'button'}
                            />
                        </div>
                    </form>
                </div>
            </Dialog>

        </>
    )
}
