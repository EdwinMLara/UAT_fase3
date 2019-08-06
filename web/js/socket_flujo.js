/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var gauge_flujo = new RadialGauge({
    renderTo: 'canvas-id-flujo',
    width: 300,
    height: 300,
    units: "l/h",
    minValue: 0,
    startAngle: 90,
    ticksAngle: 180,
    valueBox: false,
    maxValue: 5000,
    majorTicks: [
        "0",
        "200",
        "400",
        "600",
        "800",
        "1000",
        "1200",
        "1400",
        "1600",
        "1800",
        "2000",
        "5000"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 4000,
            "to": 5000,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: "#fff",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear"
}).draw();
      
var websocket_flujo = new WebSocket("ws://localhost:8080/socket_paralelo/WebsocketFlujo");
websocket_flujo.onmessage = function Mensaje_flujo(message){
    var flujo = message.data;
    if(flujo.indexOf(":")>=0){
        console.log("Iniciar");
    }
    if(flujo.indexOf("Fin")>=0){
        console.log("Stop");
    }
    if(flujo.indexOf(",")>0){
        var str = flujo;
        var array = str.split(",");
        console.log(array[0]);
        gauge_flujo.update({     
            value: parseInt(array[1])
        });
    }
};