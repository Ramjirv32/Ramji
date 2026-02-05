import java.util.*;
class s{
    public static void main(String[]args){
        String a = "Hacker";

        StringBuilder f = new StringBuilder();
        StringBuilder s = new StringBuilder();

        int n = a.length();
        for(int i =0; i <n; i=i+2){
            f.append(a.charAt(i));
        }
         for(int i =1; i <n; i=i+2){
            s.append(a.charAt(i));
        }

        System.out.println(f.toString()+ "  "+ s.toString());
    }
}