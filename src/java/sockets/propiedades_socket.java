/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockets;


import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import javax.websocket.Session;

import org.json.JSONArray;
import org.json.JSONException;
import static sockets.Websocket_celda.users;


/**
 *
 * @author emlar    
 */
public class propiedades_socket {
    public static Set<Session> users;
    public static List<String> list;
    public static String datos;
    
    public static String path = "web\\texto\\";
    
    public propiedades_socket(List<String> list,Set<Session> users){
        propiedades_socket.list = list;
        propiedades_socket.users = users;
    }
    
    public static void agregar_datos_lista(String onmessage) throws JSONException{
        JSONArray array = new JSONArray(onmessage);
        for (int i=0;i<array.length();i++){
            list.add(array.get(i).toString());
        }  
    }
    
    public static void guardar_datos_txt(String nombre_sensor){
        String path_aux;
        Escribir_fichero ef = new Escribir_fichero();
        datos = Datos_listas.Crear_cadena_escritura(nombre_sensor, list);
        path_aux = path.concat(nombre_sensor);
        ef.Escrbir(datos, path_aux.concat(".txt"));
        list.clear();
    }
    
     public static void send_Message(String onmessage) throws IOException{
        Iterator<Session> interator = users.iterator();
        while(interator.hasNext()){
            interator.next().getBasicRemote().sendText(onmessage);
        }
    }
}
