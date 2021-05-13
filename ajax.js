(function() {
        var url = 'https://opendata.aemet.es/opendata/api/prediccion/especifica/municipio/diaria/18087/?api_key=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwZXJpY2xlc2F3ZXNvbWVAZ21haWwuY29tIiwianRpIjoiZWYzOGI0ZDItZGViZi00MGZkLWEwNTctNTIyMGRhMDkyNTkzIiwiaXNzIjoiQUVNRVQiLCJpYXQiOjE1NDY5MzgzMjcsInVzZXJJZCI6ImVmMzhiNGQyLWRlYmYtNDBmZC1hMDU3LTUyMjBkYTA5MjU5MyIsInJvbGUiOiIifQ.gc9uH--fIPBZOinTLrvj98IHqHY3FGMsY6CVtojC7Jc';
        var actualizar = document.getElementById("actualizar");
        actualizar.addEventListener('click', comprobar);

        function comprobar(e) {
            $('#contenedorTabla').empty();
            var solicitud = new XMLHttpRequest();
            solicitud.open("GET", url);
            solicitud.onload = function() {
                if (solicitud.status == 200) {
                    var info = JSON.parse(solicitud.responseText).datos
                    var datos = "Información no disponible todavía";
                    var solicitudInfo = new XMLHttpRequest();
                    solicitudInfo.open("GET", info);
                    solicitudInfo.onload = function() {
                        if (solicitudInfo.status == 200) {
                            console.log('Array de datos');
                            datos = JSON.parse(solicitudInfo.responseText)[0];
                            /*console.log(datos[0].prediccion.dia[0]);*/
                            
                            var tabla = $(`<table border=1 class=table-dark>
                                                <thead>
                                                    <tr>
                                                        <th>Día: </th>
                                                        <th>Prob precipitacion: </th>
                                                        <th>Cota de nieve: </th>
                                                        <th>Viento</th>
                                                        <th>Temperatura: </th>
                                                        <th>Sensación térmica: </th>
                                                        <th>Humedad relativa: </th>
                                                    </tr>
                                                </thead>
                                            </table>`);
                            
                            //Listar los primeros 5 días
                            var bodytabla = $('<tbody></tbody>');
                            for(var i=0; i<5; i++){
                                var cota = datos.prediccion.dia[i].cotaNieveProv[0].value;
                                if(cota ==""){
                                    cota = '---';
                                }else{
                                    cota = datos.prediccion.dia[i].cotaNieveProv[0].value + 'm';
                                }
                                
                                bodytabla.append ('<tr>'
                                + '<td>' + datos.prediccion.dia[i].fecha + '</td>'
                                + '<td>' + datos.prediccion.dia[i].probPrecipitacion[0].value + '%</td>'
                                + '<td>' + cota + '</td>' 
                                + '<td>' + datos.prediccion.dia[i].viento[0].velocidad  + 'km/h </td>' 
                                + '<td>' + datos.prediccion.dia[i].temperatura.minima + '-' + datos.prediccion.dia[i].temperatura.maxima + 'ºC </td>' 
                                + '<td>' + datos.prediccion.dia[i].sensTermica.minima + '-' + datos.prediccion.dia[i].sensTermica.maxima + 'ºC </td>' 
                                + '<td>' + datos.prediccion.dia[i].humedadRelativa.minima + '-' + datos.prediccion.dia[i].humedadRelativa.maxima + '%</td></tr>');
                            }
                            tabla.append(bodytabla);
                            var content = $('#contenedorTabla');
                            content.append(tabla);
                            
                            //Array con los datos de los dias
                            console.log(datos);
                        };
                    };
                    solicitudInfo.send(null);
                }
            };
            solicitud.send(null);
        }
}());