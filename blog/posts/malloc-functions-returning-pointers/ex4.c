// Example of how NOT to allocate memory!!!
#include<stdio.h>

int* new_integer(void);

int main(){
  // Get the address of an integer
  int *p;
  p = new_integer();

  printf("The value at the address of p is: %d\n", *p);
  return 0;
}

int* new_integer(void){
  int x = 10;
  return &x;
}
