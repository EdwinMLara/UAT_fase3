/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import javax.websocket.Session;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.ServerEndpoint;
import org.json.JSONException;

/**
 *
 * @author emlar
 */
@ServerEndpoint("/WebsocketCelda")
public class Websocket_celda extends propiedades_socket{
    
    public Websocket_celda(){
        super(new ArrayList<>(),Collections.synchronizedSet(new HashSet<Session>()));
    }
    
    @OnOpen
    public void onOpen(Session user){
        users.add(user);
        System.out.println("Conected celda: " + user.getId());
    }
    
    @OnMessage
    public void onMessage(String onmessage) throws IOException, JSONException{    
        System.out.println("Celda " + onmessage);
        send_Message(onmessage);
        if(Datos_listas.isJSONValid(onmessage)){
            agregar_datos_lista(onmessage);
        }
        if(onmessage.equals("Fin")){
            guardar_datos_txt("Celda");
        }
    }
     
     @OnClose
    public void handleClose(javax.websocket.Session userSession){
        users.remove(userSession);
    }
    
    @OnError
    public void handleError(Throwable t){
        StackTraceElement[] stackTrace = null;
        t.setStackTrace(stackTrace);
    }
    
   
 
}
