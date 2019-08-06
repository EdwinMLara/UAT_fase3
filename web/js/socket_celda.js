/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dps_socket = [];
var bandera = false;
var dps = [];
var inicio=0;
var chart;
var id,con = 0;
window.onload = function () {
chart = new CanvasJS.Chart("chartContainer", {
        title :{
                text: ""
        },
        axisY: {
                includeZero: false
        },      
        data: [{
                type: "line",
                dataPoints: dps
        }]
    });         
    chart.render();
    inicio = 0;
};


function updateChart(){
    var incremento = 10;
    for (var i=inicio;i<inicio+incremento;i++){            
        dps.push({
                x: i,
                y: dps_socket[i]
        });
    }
    fin = inicio + incremento;
    if(dps.length > 50){
        dps.splice(0, 10);
    }
    if(dps.length === dps_socket.length){
        clearInterval(id);
    }           
    chart.render();
    inicio = inicio + incremento;
};

function prueba(){
    console.log(con);
    alert("Probando");
    if(con === 3){
        clearInterval(id);
        con = 0;
    }
    con++;
}

var websocket_celda = new WebSocket("ws://localhost:8080/Uat_Motor/WebsocketCelda");     
websocket_celda.onmessage = function Mensaje_celda(message2){
    var msj2 = message2.data;
    if(msj2.indexOf(":")>=0){
        bandera = true;
        inicio = 0;
        console.log("Iniciar");
    }
    if(msj2.indexOf("Fin")>=0){
        console.log("Stop");
        bandera = false;
    }
    if(msj2.indexOf(",")>0){
        var str = msj2;
        str = str.substr(1);
        str = str.slice(0,-1);
        
        var array = str.split(",");
        for(var i=0;i<array.length;i++){
            dps_socket.push(parseFloat(array[i]));
        }
        if(bandera===true){
            bandera = false;
            id = setInterval(updateChart,100); 
        }
    }
};

