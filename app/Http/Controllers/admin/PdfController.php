<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Interview;
use Dompdf\Dompdf;
use Dompdf\Options;
use Illuminate\Http\Request;

class PdfController extends Controller
{
    public function downloadPdf($userId)
    {
        $domPdf = new Dompdf();
        $options = new Options();

        $options->set('isHtml5ParserEnabled', true);
        $options->set('isRemoteEnabled', true);
        $domPdf->setOptions($options);

        $img = public_path('/logos/ita.png');

        $query = Interview::where('aspirant_id', '=', $userId)
            ->with('user', 'aspirant', 'questionAnswers.question', 'questionAnswers.answer')
            ->get();
        
        $data[] = $query[0];

        // dd($img);

        $htmlContent = view('pdf.Interview')
            ->with('data', $data)
            ->with('ruta', $img);

        $domPdf->loadHtml($htmlContent);
        $domPdf->setPaper('letter', 'portrait');
        $domPdf->render();

        $pdfFile = $domPdf->output();

        return response($pdfFile, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'attachment; filename="Entrevista.pdf"');
    }
}
