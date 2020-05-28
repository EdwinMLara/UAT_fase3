/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dps_socket = [];
var bandera = false,timer = true;
var dps = [];
var inicio=0;
var chart;
var id = null;
var con = 0,fin_datos;

window.onload = function () {
chart = new CanvasJS.Chart("chartContainer", {
        title :{
                text: ""
        },
        axisY: {
                includeZero: true
        },      
        data: [{
                type: "line",
                dataPoints: dps
        }]
    });         
    chart.render();
    inicio = 0;
};


function updateChart(incremento,num_datos_grafico){
    timer = true;
    fin = inicio + incremento;
    console.log(fin);
    for (var i=inicio;i<fin;i++){            
        dps.push({
                x: i,
                y: dps_socket[i]
        });
    }
    
    if(dps.length > num_datos_grafico){
        dps.splice(0, incremento);
    }
    if(fin === dps_socket.length || fin > dps_socket.length){
        clearInterval(id);
        timer = false;
    }          
    chart.render();
    inicio = fin;
};

var aux;
function updateChart2(){
    dps.push({
                x: con,
                y: aux
        });
    console.log(con,aux);
    chart.render();
}

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
        if(dps.length > 0){
            dps_socket.length=0;
            dps.length = 0;
            chart.render();
        }
        console.log("Iniciar");
        console.log("Se empieza a llenar el buffer");
    }
    if(msj2.indexOf("Fin")>=0){
        console.log("Stop");
        clearInterval(id);
        bandera = false;
    }
    if(msj2.indexOf(",")>0){
        var str = msj2;
        str = str.substr(1);
        str = str.slice(0,-1);
        
        var array = str.split(",");
        console.log(array.length);
        for(var i=0;i<array.length;i++){
            dps_socket.push(parseFloat(array[i]));
        }
        console.log("socket vector",dps_socket.length);
        if(bandera===true || timer == false){
            console.log("se reactivo el buffer");
            timer = true;
            bandera = false;
            id = setInterval(updateChart,100,10,400); 
        }
    }
};

function tiemporeal(){
     var msj2 = message2.data;
    
    if(msj2.indexOf(":")>=0){
        bandera = true;
        con = 0;
        console.log(message2.data);
    }else{
        var array = msj2.split(",");
        con++;
        aux = parseFloat(array[1]);
        updateChart2();
    }
}

