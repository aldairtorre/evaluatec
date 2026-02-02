<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    {{-- <link rel="icon" href="{{asset('assets/icons/logo.svg')}}"> --}}
    <title>TecNM | EvaluaTec</title>
</head>
<body class="bg-gray-100">
@routes
<div id="app" class="vhh-100 w-100 d-flex justify-content-center align-items-center "></div>

<input type="hidden" id="csrf_token" value="{{csrf_token()}}">
<input type="hidden" id="asset" value="{{asset('')}}">
@include('admin.template.global_js')
</body>
</html>