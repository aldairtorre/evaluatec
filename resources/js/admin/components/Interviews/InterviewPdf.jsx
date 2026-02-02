import { useSwalCustom } from "../../hooks/admin/useSwalCustom";
import axios from "axios";

export const InterviewPdf = ({ aspirant, setPending }) => {

    const handleDownloadPdf = async (aspirantId) => {
        try {
            setPending(true);

            const res = await axios.get(route('admin.interviews.generate_pdf', aspirantId), {
                responseType: 'blob'
            });

            const pdfUrl = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.setAttribute('download', 'Entrevista.pdf'); 

            document.body.appendChild(link);
            link.click();

            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(pdfUrl);
        } catch (error) {
            console.log(error);
        } finally {
            setPending(false);
        }
    }

    return (
        <>
            <img 
                src="/assets/icons/pdf.png" 
                alt="print" 
                className="h-12 cursor-pointer" 
                onClick={ aspirant?.interview ? 
                    () => handleDownloadPdf(aspirant?.id) :
                    () => {
                        useSwalCustom(null, '¡Sin entrevista!',
                        'No se ha encontrado alguna entrevista para este aspirante',
                        true, false,
                        'Aceptar', 'Cancelar',
                        )
                    }
                }
            />
        </>
    );
}
