#include<stdlib.h>
#include<stdio.h>

int main(){
  int *p;
  //*p = 10;
  printf("The value is: %ld\n", sizeof(*p));
  return 0;
}
