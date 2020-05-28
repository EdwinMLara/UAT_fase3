/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var rpm = [];
var bandera = false, timer = true;
var id_rpm = null;
var inicio2 = 0;
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

function mostrar_rpm(){
    gauge_encoder.update({     
        value: parseInt(rpm[inicio2])
    });
    inicio2 += 1;
    if(inicio2 >= rpm.length){
        clearInterval(id_rpm);
        timer = false;
    }
}

websocket_encoder = new WebSocket("ws://localhost:8080/Uat_Motor/WebsocketEncoder");
websocket_encoder.onmessage = function Mensaje_encoder(message4){
    var msj = message4.data;
    //console.log("Encoder ".concat(msj));
    if(msj.indexOf(":")>=0){
        console.log("Iniciar");
        inicio2 = 0;
        bandera = true;
    }
    if(msj.indexOf("Fin")>=0){
        console.log("Stop");
    }
    if(msj.indexOf(",")>0){
        var str = msj;
        str = str.substr(1);
        str = str.slice(0,-1);
        var array = str.split(",");
        
        var transmiciones = parseInt(array.length/20);
        
        for(var i=0;i<transmiciones;i++){
            var aux = array.slice(i*transmiciones,(i+1)*transmiciones);
            var sum = 0;
            for(var k=0;k<aux.length;k++){
                sum += aux[k];
            }
            sum = sum/aux.length;
            rpm.push(sum);
        }
        
        if (bandera === true || timer === false){
            timer = true;
            bandera = false;
            id_rpm = setInterval(mostrar_rpm,100);
        }
        console.log(array[0]);
    }
};


