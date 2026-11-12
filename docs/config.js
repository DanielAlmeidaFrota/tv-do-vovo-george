// =====================================================================
//  TV do Vovô — configuração da família
//  Edite este arquivo antes de rodar `python scripts/build.py`.
//  Tudo aqui também pode ser mudado pela TV em ⚙️ Personalizar
//  (o que for salvo na TV vale mais do que este arquivo).
//  Escreva em ES5 simples: aspas simples, sem crase, vírgula entre itens.
// =====================================================================
var TVV_CONFIG = {
    // Aparece no topo: "Bom dia, vovô George!"
    nome: 'vovô George',

    // Cidade do clima. Com latitude/longitude o app não precisa procurar a
    // cidade pelo nome (existe "Gama" em outros países) nem usar o IP.
    cidade: 'Gama',
    latitude: -16.02511,
    longitude: -48.07121,

    // Times acompanhados (ids da ESPN). Para achar o id de outro time:
    // https://site.api.espn.com/apis/site/v2/sports/soccer/bra.1/teams
    times: [
        { id: '2029', nome: 'Palmeiras' },
        { id: '6086', nome: 'Botafogo' }
    ],

    // Remédios: hora (HH:MM, 24h) e nome. A tela inicial mostra os das
    // próximas 6 horas (ligou a TV às 10:00 -> aparecem os das 10:00 às 16:00).
    // Exemplo: { hora: '08:00', nome: 'Losartana' }
    remedios: [
    ],

    // Fotos: coloque os arquivos .jpg/.png em app/fotos/ (o build gera a lista).
    // Elas passam num porta-retrato ao lado dos remédios, e a mesma foto,
    // desfocada, vira o fundo da tela.
    trocarFotoSegundos: 45,

    // Onde mirar o recorte de cada foto ('horizontal% vertical%'), para os
    // rostos não ficarem cortados. 0% = topo, 100% = base. Padrão: '50% 30%'.
    focoFotos: {
        'vovo-e-neto.jpg': '50% 10%',
        'almoco-em-familia.jpg': '50% 50%',
        'vovo-e-neto-basquete.jpg': '50% 0%',
        'aniversario-do-vovo.jpg': '50% 30%'
    }
};
