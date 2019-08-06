/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var gauge_ecu = new RadialGauge({
    renderTo: 'canvas-id-Ecu',
    width: 300,
    height: 300,
    units: "Km/h",
    title: "ECU",
    value: 0,
    minValue: 0,
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
            "from": 4080,
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

var websocket_ecu = new WebSocket("ws://localhost:8080/socket_paralelo/WebsocketECU");
websocket_ecu.onmessage = function Mensaje_ecu(message3){
    var ecu = message3.data;
    if(ecu.indexOf(":")>=0){
        console.log("Iniciar");
    }
    if(ecu.indexOf("Fin")>=0){
        console.log("Stop");
    }
    if(ecu.indexOf(",")>0){
        var str = ecu;
        var array = str.split(",");
        console.log(array[0]);
        gauge_ecu.update({     
            value: parseInt(array[1])
        });
    }
};   


