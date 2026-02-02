import { useContext, useEffect, useState } from "react";
import { useFetchQuery } from "../../hooks/useFetchQuery"
import { InterviewForm } from "./InterviewForm"
import { AspirantsForm } from "../Aspirants/AspirantsForm";
import { Badge } from 'primereact/badge';
import { UserContext } from '../../context/UserContext';
import { InterviewPdf } from "./InterviewPdf";
import { CustomButtonFilterConfig } from "../../utils/Formik/CustomButtonFilterConfig";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { paginatorConfig } from "../../utils/TableConfig";
import { Spinner } from '../../utils/Spinner'

export const InterviewIndex = () => {

    const [filterName, setFilterName] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [pending, setPending] = useState(false)

    const { userAuthenticate } = useContext(UserContext)

    const interviewQuery = useFetchQuery(
        'admin.interviews.index',
        {},
        'interviews'
    );    

    const sectionsQuery = useFetchQuery(
        'admin.sections.index',
        {},
        'sections'
    );

    const aspirantsQuery = useFetchQuery(
        'admin.aspirants.index',
        {
            filterName: filterName,
            'size': 3,
            'page': currentPage
        },
        'aspirants'
    );

    const handleChangePage = (event) => {
        setCurrentPage(event.page);
        setPage(event.first);
    }

    useEffect(() => {
        setQuestions(interviewQuery.data?.questions);
    }, [interviewQuery.isSuccess]);

    useEffect(() => {
        aspirantsQuery.refetch();
    }, [filterName, currentPage])

    if (aspirantsQuery.isLoading || interviewQuery.isLoading) return <Spinner />
    if (aspirantsQuery?.data?.data?.length === 0) {
        return (
            <div className=''>
                <div className='flex justify-between items-center'>
                    <h1 className="text-4xl font-semibold mb-5 mt-10">Entrevistas </h1>
                    <AspirantsForm
                        aspirantsQuery={aspirantsQuery}
                    />
                </div>
                <div className='mb-5 flex gap-3'>
                    <InputText
                        pt={CustomButtonFilterConfig}
                        placeholder='Nombre'
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </div>
                <p>No hay aspirantes registrados</p>
            </div>
        )
    }

    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className="text-4xl font-semibold mb-5 mt-10">Entrevistas </h1>
                {/* <AspirantsForm
                    aspirantsQuery={aspirantsQuery}
                /> */}
            </div>
            <div className='mb-5 flex gap-3'>
                <InputText
                    pt={CustomButtonFilterConfig}
                    placeholder='Nombre'
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                >
                </InputText>
            </div>
            {(aspirantsQuery.isRefetching || interviewQuery.isRefetching) ? <Spinner /> :

                <>
                    <div className="grid grid-cols-3 gap-5">
                        {aspirantsQuery?.data?.data?.map(aspirant => (
                            <div className="bg-gray-50 w-1/4 p-4 rounded mt-3 shadow border border-primary-tec" key={aspirant.id}>
                                <div className="mb-2">
                                    <p className="font-semibold mb-2">{aspirant.full_name}</p>
                                    <Badge
                                        value={aspirant.interview ? 'Entrevistado' : 'Sin entrevista'}
                                        severity={aspirant.interview ? 'success' : 'warning'}
                                    />
                                </div>
                                <div className="flex gap-2 pt-3 justify-end ">
                                    <InterviewForm
                                        questions={questions}
                                        aspirant={aspirant}
                                        aspirantsQuery={aspirantsQuery}
                                        userAuthenticate={userAuthenticate}
                                        interviewQuery={interviewQuery}
                                        sections={sectionsQuery?.data?.data}
                                    />
                                    <InterviewForm
                                        questions={questions}
                                        isUpdate={true}
                                        aspirant={aspirant}
                                        aspirantsQuery={aspirantsQuery}
                                        userAuthenticate={userAuthenticate}
                                        interviewEdit={interviewQuery?.data?.data.find(asp => asp.aspirant_id === aspirant.id)}
                                        interviewQuery={interviewQuery}
                                        sections={sectionsQuery?.data?.data}
                                    />
                                    <InterviewPdf
                                        aspirant={aspirant}
                                        setPending={setPending}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <Paginator
                        rows={3}
                        totalRecords={aspirantsQuery.data?.total_rows}
                        onPageChange={handleChangePage}
                        pt={paginatorConfig}
                        first={page}
                    ></Paginator>
                    {pending ? <Spinner /> : null}
                </>
            }

        </>
    )
}
