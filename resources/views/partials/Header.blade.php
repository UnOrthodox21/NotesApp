<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta id="csrf-token" name="token" value="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Notes</title>
    <link rel="stylesheet" href="css/app.css">

    <script>window.Laravel = { csrfToken: '{{ csrf_token() }}' }</script>

    @include('partials.Navbar')

</head>
<body>


