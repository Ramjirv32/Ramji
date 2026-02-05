import java.util.*;
class up {
    public static void main(String[]args){
        String v="4.8.2";
        String v2 ="4.8.4";
        boolean a=false;
        for(int i =0; i <5; i=i+2){
            int f=v.charAt(i)-'0';
            int s =v2.charAt(i)-'0';
            if(s>f) {
                a=true;
                System.out.println("upgraded");
            break;}

        }
        if(!a) System.out.println("no upgraded"); 
    }
}