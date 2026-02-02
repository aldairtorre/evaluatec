<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Guía de Entrevista</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 0;
        }

        .container {
            width: 100%;
            padding: 20px;
        }

        .header,
        .footer {
            text-align: center;
        }

        .header img {
            height: 50px;
        }

        .header h1,
        .header h2,
        .header h3,
        .header p {
            margin: 0;
        }

        .info-table {
            width: 100%;
            margin-bottom: 20px;
            border-collapse: collapse;
        }

        .info-table td {
            padding: 5px;
        }

        .info-table input {
            width: 100%;
            padding: 5px;
            box-sizing: border-box;
        }

        .section {
            margin-bottom: 20px;
        }

        .question {
            margin: 10px 0;
        }

        .footer {
            position: absolute;
            bottom: 20px;
            width: 100%;
            text-align: center;
        }

        .footer img {
            height: 50px;
        }

        ul,
        li {
            list-style: none;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="{{ $ruta }}" height="" alt="" >
            {{-- <img src="{{ asset('assets/logos/logo-tecnm.png') }}" alt="Logo 2"> --}}
            <h1>Instituto Tecnológico de Acapulco</h1>
            <p>Sistema Nacional de Posgrados (SNP) del CONACHYT</p>
            <p>Maestría en Desarrollo Regional e Innovación Tecnológica (MDRIT)</p>
            <p>Referencia: 007365</p>
            <h2>Guía de entrevista para candidatos(as) a ingresar al posgrado</h2>
            <h3>Núcleo Académico Básico</h3>
        </div>

        <p style="margin-left: 140mm">fecha: <span>____________</span></p>
        <p>Nombre del(la) entrevistado(a):<span>___________________________________</span></p>
        <p>Nombre de los entrevistadores(as):<span>_____________________________________</span></p>
        <p style="margin-left: 80mm">Hora de inicio: <span>____________</span> <span>Hora de finalización:<span>____________</span></span></p>

        <div class="section">
            <h3>I. Motivaciones para estudiar un posgrado</h3>
            <div class="question">1. ¿Por qué quieres estudiar esta Maestría?</div>
            <div class="question">2. ¿Qué crees que te hace un candidato ideal para integrarse a esta Maestría?</div>
            <div class="question">3. Desde tu punto de vista, ¿Cuál es el mayor problema en el área que enfrenta nuestro
                entorno?</div>
            <div class="question">4. ¿Cómo crees que estudiar esta Maestría pudiese ayudar a afrontar este problema?
            </div>
        </div>

        <div class="section">
            <h3>II. Antecedentes académicos</h3>
            <div class="question">5. ¿Qué competencias o habilidades traes contigo que puedan integrarse a este
                programa, es decir, cómo puedes contribuir a la Maestría?</div>
        </div>

        <div class="section">
            <h3>III. Antecedentes laborales</h3>
            <div class="question">6. Actualmente, ¿trabajas?</div>
            <div class="question">7. ¿Qué habilidades que hayas adquirido en tu trabajo te pueden ayudar en este
                contexto educativo?</div>
        </div>

        <div class="section">
            <h3>IV. Competencias personales académicas</h3>
            <div class="question">8. ¿Qué tal trabajas bajo presión? ¿Me podrías dar un ejemplo?</div>
            <div class="question">9. ¿Qué problemas prevés en el futuro -en los próximos dos años- que puedan interferir
                para que completes la Maestría?</div>
        </div>

        <div class="section">
            <h3>V. Propuesta de investigación</h3>
            <div class="question">10. ¿Cuál es la propuesta de anteproyecto que planteas o propones para resolver una
                problemática, regional o nacional?, alineada a los ODS establecidos en la AGENDA 2023 y los PRONACES del
                CONACHYT</div>
        </div>

        <div class="section">
            <h3>VI. Aspiraciones laborales y de vida</h3>
            <div class="question">11. ¿Nos podrías platicar sobre tu proyecto de vida?</div>
            <div class="question">12. ¿Cuál ha sido tu principal logro hasta ahora y por qué?</div>
            <div class="question">13. ¿Qué haces en tus ratos libres?</div>
            <div class="question">14. ¿Cómo has resuelto problemas fuertes en tu vida?</div>
            <div class="question">15. ¿Cuáles son tus fortalezas y debilidades, en lo general? ¿Cómo te describirías a
                ti mismo?</div>
            <div class="question">16. Si surgiera la oportunidad de hacer una estancia en el extranjero por un tiempo
                considerable, meses o quizás, ¿la harías? ¿Qué limitaciones te pudiesen surgir?</div>
            <div class="question">17. Comentarios o preguntas adicionales</div>
        </div>

        <div class="footer">
            <p>Dirección: Avenida Instituto Tecnológico km. 6.5, s/n, Col. El Cayaco, C.P. 39905 Acapulco de Juárez,
                Guerrero, Tel. (744) 4429100 ext. 146 y 146 e-mail: isa@itacapulco.tecnm.mx</p>
            {{-- <img src="{{ asset('path_to_footer_logo.png') }}" alt="Footer Logo"> --}}
        </div>
    </div>
</body>

</html>


