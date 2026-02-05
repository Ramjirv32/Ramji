import java.util.*;
class zig{
    public static void main(String[]args){
        int n =3;
        Scanner s = new Scanner(System.in);
        int[][] a= new int[n][n];

        for(int i =0; i <n;i++){
            for(int j =0;  j <n; j++){
                a[i][j]=s.nextInt();    
            }
        }
        for (int j = 0; j < n; j++) {
            if (j % 2 == 0) {
                for (int i = 0; i < n; i++)
                    System.out.print(a[i][j] + " ");
            } else {
                for (int i = n - 1; i >= 0; i--)
                    System.out.print(a[i][j] + " ");
            }
        }


        s.close();
    }
}