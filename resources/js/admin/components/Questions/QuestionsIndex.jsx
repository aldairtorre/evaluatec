import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TableConfig, paginatorConfig } from '../../utils/TableConfig';
import { Paginator } from 'primereact/paginator';
import { QuestionForm } from './QuestionForm';
import { CustomButtonFilterConfig } from '../../utils/Formik/CustomButtonFilterConfig';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { useFetchQuery } from '../../hooks/useFetchQuery';
import { CustomDrowdomFilterConfig } from '../../utils/Formik/CustomDrowdomConfig';

export const QuestionsIndex = () => {

    const [filterContent, setFilterContent] = useState('');
    const [filterNumber, setFilterNumber] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [page, setPage] = useState(0);

    const questionsQuery = useFetchQuery(
        'admin.questions.index',
        {
            'filter-content': filterContent,
            'filter-number': filterNumber?.number_question,
            'size': 4,
            'page': currentPage,
        },
        'questions'
    );
    const sectionsQuery = useFetchQuery(
        'admin.sections.index',
        {},
        'sections'
    );    

    const handleChangePage = (event) => {
        setCurrentPage(event.page);
        setPage(event.first);
    }

    const handleInputTemplates = (rowData) => {
        return (
            <div className='flex items-center gap-5'>
                <QuestionForm
                    isUpdate={true}
                    questionData={rowData}
                    questionQuery={questionsQuery}
                    sections = {sectionsQuery?.data?.data}
                />
                <QuestionForm
                    isDelete={true}
                    questionData={rowData}
                    questionQuery={questionsQuery}
                />
            </div>
        )
    }

    useEffect(() => {
        questionsQuery.refetch();
    },[filterContent, filterNumber, currentPage])

    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className="text-4xl font-semibold mb-5 mt-10">Preguntas</h1>
                <QuestionForm
                    questionData={questionsQuery.data}
                    questionQuery={questionsQuery}
                    sections = {sectionsQuery?.data?.data}
                />
            </div>

            <div className='mb-5 flex gap-3 '>
                <InputText
                    pt={CustomButtonFilterConfig}
                    placeholder='Pregunta'
                    value={filterContent}
                    onChange={(e) => setFilterContent(e.target.value)}
                >
                </InputText>
                <Dropdown
                    value={filterNumber}
                    placeholder='No. Pregunta'
                    pt={CustomDrowdomFilterConfig}
                    options={questionsQuery?.data?.questions}
                    onChange={(e) => setFilterNumber(e.target.value)}
                    optionLabel="number_question"
                    showClear
                />
            </div>

            <DataTable
                pt={TableConfig()}
                value={questionsQuery?.data?.data}
                tableStyle={{ minWidth: '50rem' }}
                loading={questionsQuery.isFetching}
            >
                <Column field='number_question' header='Número' />
                <Column field='question' header='Pregunta' />
                <Column field='section.label' header='Sección' />
                <Column body={handleInputTemplates} />
            </DataTable>
            <Paginator
                rows={4}
                totalRecords={questionsQuery.data?.total_rows}
                onPageChange={handleChangePage}
                pt={paginatorConfig}
                first={page}
            ></Paginator>
        </>
    )
}
