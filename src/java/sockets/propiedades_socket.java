/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockets;


import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import javax.servlet.ServletContext;
import javax.websocket.Session;

import org.json.JSONArray;
import org.json.JSONException;
import static sockets.Websocket_celda.users;


/**
 *
 * @author emlar    
 */
public class propiedades_socket {
    public static List<String> list;
    public static String datos;
    
    public propiedades_socket(List<String> list){
        propiedades_socket.list = list;
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
        String prueba = "Guardar esta cadena un chingo de texto";
        File file = new File(System.getProperty("com.sun.aas.instanceRoot"));
        path_aux = file.getAbsolutePath();
        path_aux = path_aux.concat("\\docroot\\text.txt");
        System.out.println(path_aux);
        ef.Escrbir(prueba,path_aux );
        list.clear();
    }
    
    
}
