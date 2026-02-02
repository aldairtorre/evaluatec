import { useEffect, useMemo, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Steps } from "primereact/steps";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { CustomStepsConfig } from "../../utils/Formik/CustomStepsConfig";
import { CustonInputTextConfig } from "../../utils/Formik/CustomInputTextConfig";
import { usePostMutation } from "../../hooks/admin/usePostMutation";
import { useSwalCustom } from "../../hooks/admin/useSwalCustom";

export const InterviewForm = ({
  isUpdate = false,
  questions = [],
  aspirant,
  userAuthenticate,
  aspirantsQuery,
  interviewEdit = null,
  sections = [],
  interviewQuery,
}) => {
  const interviewMutation = usePostMutation();

  const [openDialog, setOpenDialog] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const [answersById, setAnswersById] = useState({});

  const isLastSection = sections?.length
    ? activeSection === sections.length - 1
    : true;

  const questionsInSection = useMemo(() => {
    const sectionId = activeSection + 1; 
    return questions.filter((q) => q.section_id === sectionId);
  }, [questions, activeSection]);

  const handleChange = (questionId, value) => {
    setAnswersById((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  useEffect(() => {
    if (!isUpdate || !interviewEdit?.question_answers) return;

    const map = {};
    interviewEdit.question_answers.forEach(({ question, answer }) => {
      if (question?.id) map[question.id] = answer?.answer ?? "";
    });

    setAnswersById(map);
  }, [isUpdate, interviewEdit]);

  const formData = (payload, user) => {
    const fd = new FormData();
    fd.append("interview", JSON.stringify(payload));
    fd.append("user", JSON.stringify(user));
    return fd;
  };

  const validateAll = () => {
    const missing = questions.filter(
      (q) => !(answersById[q.id] ?? "").trim()
    );
    return missing;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missing = validateAll();
    if (missing.length) {
      useSwalCustom(
        null,
        "¡Existen campos vacíos!",
        "Debe completar todos los campos",
        true,
        false,
        "Aceptar",
        "Cancelar"
      );
      setActiveSection(0);
      return;
    }

    const payload = questions.map((q) => ({
      ...q,
      answer: (answersById[q.id] ?? "").trim(),
    }));

    try {
      const response = await interviewMutation.mutateAsync({
        url: "admin.interviews.upsert",
        params: aspirant.id,
        data: formData(payload, userAuthenticate),
      });

      if (response?.data?.success) {
        setActiveSection(0);
        setOpenDialog(false);

        aspirantsQuery.refetch();
        interviewQuery.refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextOrBack = (e) => {
    const { key } = e;

    if (key === "ArrowRight" && activeSection < sections.length - 1) {
      setActiveSection((s) => s + 1);
    } else if (key === "ArrowLeft" && activeSection > 0) {
      setActiveSection((s) => s - 1);
    }
  };

  const handleIconClick = () => {
    if (isUpdate) {
      if (!aspirant?.interview) {
        useSwalCustom(
          null,
          "¡Sin entrevista!",
          "No se ha encontrado alguna entrevista para este aspirante",
          true,
          false,
          "Aceptar",
          "Cancelar"
        );
        return;
      }
      setOpenDialog(true);
      return;
    }

    if (aspirant?.interview) {
      useSwalCustom(
        null,
        "¡Entrevistado!",
        "Ya existe una entrevista para este aspirante",
        true,
        false,
        "Aceptar",
        "Cancelar"
      );
      return;
    }
    setOpenDialog(true);
  };

  return (
    <>
      <img
        onClick={handleIconClick}
        src={
          isUpdate ? "/assets/icons/escritura.png" : "/assets/icons/expediente.png"
        }
        alt="interview"
        className="h-12 cursor-pointer"
      />

      <Dialog
        draggable={false}
        visible={openDialog}
        style={{ width: "95vw", height: "90vh" }}
        className="bg-gray-100"
        onKeyDown={handleNextOrBack}
        onHide={() => setOpenDialog(false)}
        header={
          <>
            <p className="text-center mb-3">
              {isUpdate ? "Modificar entrevista" : "Agregar entrevista"}
            </p>

            <Steps
              pt={CustomStepsConfig}
              model={sections}
              activeIndex={activeSection}
              onSelect={(e) => setActiveSection(e.index)}
              readOnly={false}
            />
          </>
        }
      >
        <div className="bg-gray-100 p-2 w-3/4 m-auto rounded-lg">
          <div className="mt-5 mb-5 w-3/4 m-auto border border-primary-tec p-3 rounded-lg bg-white shadow">
            <p className="font-bold">
              Nombre: <span className="font-normal">{aspirant.full_name}</span>
            </p>
            <p className="font-bold">
              Entrevistador:{" "}
              <span className="font-normal">
                {isUpdate ? interviewEdit?.user?.full_name : userAuthenticate?.full_name}
              </span>
            </p>
          </div>

          <form className="w-3/4 m-auto" onSubmit={handleSubmit}>
            {questionsInSection.map((q) => (
              <div
                className="mb-3 bg-white p-3 rounded-lg border border-primary-tec"
                key={q.id}
              >
                <p>
                  {`Pregunta ${q.number_question}: ${q.question} `}
                  <span className="text-red-600">*</span>
                </p>

                <InputTextarea
                  value={answersById[q.id] ?? ""}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  className="h-[12vh]"
                  placeholder="Escribe tu respuesta aquí"
                  pt={CustonInputTextConfig}
                />
              </div>
            ))}

            <div className="flex justify-end gap-5">
              <Button
                label="Regresar"
                className="bg-gray-200 font-bold px-5 py-2 rounded-xl"
                onClick={() => setActiveSection((s) => s - 1)}
                disabled={activeSection <= 0}
                type="button"
              />

              <Button
                label={isLastSection ? "Guardar" : "Siguiente"}
                className="bg-black text-white font-bold px-5 py-2 rounded-xl"
                type={isLastSection ? "submit" : "button"}
                onClick={() => {
                  if (!isLastSection) setActiveSection((s) => s + 1);
                }}
              />
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
};