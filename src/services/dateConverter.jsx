
export default function formatDate(dataHoraISO) {
    // Converter a data e hora do formato ISO8601 para um objeto Date
    var dataHora = new Date(dataHoraISO);

    // Extrair os componentes da data e hora
    var dia = dataHora.getUTCDate();
    var mes = dataHora.getUTCMonth() + 1; // Meses são indexados de 0 a 11, então adicionamos 1
    var ano = dataHora.getUTCFullYear();
    var horas = dataHora.getUTCHours();
    var minutos = dataHora.getUTCMinutes();

    // Adicionar zeros à esquerda, se necessário
    dia = (dia < 10) ? '0' + dia : dia;
    mes = (mes < 10) ? '0' + mes : mes;
    horas = (horas < 10) ? '0' + horas : horas;
    minutos = (minutos < 10) ? '0' + minutos : minutos;

    // Formatar a data e hora no formato desejado
    var dataHoraFormatada = dia + '/' + mes + '/' + ano + ' ' + horas + ':' + minutos;

    return dataHoraFormatada;
}
