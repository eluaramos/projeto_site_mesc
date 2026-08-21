<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="Mestrado Profissional em Engenharia de Produção e Sistemas Computacionais - UFF">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        {{-- Fontes --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600|lora:400,500,600,700" rel="stylesheet" />

        {{-- VLibras --}}
        <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
        <script>
            new window.VLibras.Widget('https://vlibras.gov.br/app');
        </script>

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        {{-- VLibras widget container --}}
        <div vw class="enabled">
            <div vw-access-button class="active"></div>
            <div vw-plugin-wrapper>
                <div class="vw-plugin-top-wrapper"></div>
            </div>
        </div>

        {{-- Barra do Governo Federal --}}
        <div id="barra-brasil"></div>
        <script defer src="//barra.brasil.gov.br/barra_2.0.js" type="text/javascript"></script>

        @inertia
    </body>
</html>