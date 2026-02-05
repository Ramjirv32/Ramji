import java.util.*;
class Main{
    public static void main(String[]args){
        int n = 6;
        int [] arr = {16,17,4,3,5,2};

        int[] ans = new int[n];


        for(int i =0;i<n; i++){
            int max=-1;
            for(int j=i+1; j<n; j++){
                max=Math.max(arr[j],max);
            }
            ans[i]=max;
        }
        System.out.println(Arrays.toString(ans));
    }
}