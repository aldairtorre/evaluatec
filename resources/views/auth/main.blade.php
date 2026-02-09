<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {{-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> --}}
    <link rel="icon" href="{{asset('assets/img/logo.jpeg')}}">
    <title>TecNM | EvaluaTec</title>
</head>
<body>
@routes
<div id="login" class="h-screen w-100 d-flex justify-content-center align-items-center bg-gray-100 "></div>

<input type="hidden" id="csrf_token" value="{{csrf_token()}}">
<input type="hidden" id="asset" value="{{asset('')}}">
@include('auth.template.global_js')
</body>
</html>
