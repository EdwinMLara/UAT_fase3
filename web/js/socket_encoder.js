/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gauge_encoder = new RadialGauge({
    renderTo: 'canvas-id-rpm',
    width: 300,
    height: 300,
    units: "Km/h",
    title: "RPM",
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

websocket_encoder = new WebSocket("ws://localhost:8080/socket_paralelo/WebsocketEncoder");
websocket_encoder.onmessage = function Mensaje_encoder(message4){
    var msj = message4.data;
    //console.log("Encoder ".concat(msj));
    if(msj.indexOf(":")>=0){
        console.log("Iniciar");
    }
    if(msj.indexOf("Fin")>=0){
        console.log("Stop");
    }
    if(msj.indexOf(",")>0){
        var str = msj;
        var array = str.split(",");
        console.log(array[0]);
        gauge_encoder.update({     
            value: parseInt(array[1])
        });
    }
};


