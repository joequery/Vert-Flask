// Demonstrate a simple function that returns an integer.
#include<stdio.h>

int return_me(int);

int main(){
  int x = 5;
  printf("x: %d\n", x);

  x = return_me(x);
  printf("x: %d\n", x);

  return 0;
}

/*
 * A very simple function: Just returns the integer passed to it!
 */
int return_me(int num){
  return num;
}
