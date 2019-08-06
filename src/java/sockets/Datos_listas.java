/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockets;

import java.util.List;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author emlar
 */
public class Datos_listas {
    public static String Crear_cadena_escritura(String sensor_name,List <String> list_Sensor){
        String str1,str_return;
        str1 = "?"+sensor_name +" = ";
        
        for (String list_Temperatura1 : list_Sensor) {
            str1 = str1 + list_Temperatura1 + " ";
        }
        str_return = str1 + "\n" ;
        
        return str_return;
    }
   
    public static boolean isJSONValid(String test) {
        try {
            JSONObject jsonObject = new JSONObject(test);
        } catch (JSONException ex) {
            try {
                JSONArray jsonArray = new JSONArray(test);
            } catch (JSONException ex1) {
                return false;
            }
        }
        return true;
    }
}
