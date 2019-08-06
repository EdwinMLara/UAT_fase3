/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sockets;

import java.io.FileWriter;
import java.io.PrintWriter;

/**
 *
 * @author emlar
 */
public class Escribir_fichero {
    void Escrbir(String msj,String Path){
        FileWriter fichero = null;
        PrintWriter pw;
        
        try{
            fichero = new FileWriter(Path);
            pw =  new PrintWriter(fichero);
            pw.print(msj);
        }
        catch(Exception e){
        }finally{
            try{
                if(null != fichero)
                    fichero.close();
            }
            catch(Exception e2){
            }
        }
    }
}
