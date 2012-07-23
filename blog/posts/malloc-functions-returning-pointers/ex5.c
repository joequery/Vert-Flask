// Allocating memory with malloc
#include<stdio.h>
#include<stdlib.h> // required to use malloc

int* new_integer(void);

int main(){
  // Get the address of an integer
  int *p;
  p = new_integer();
  *p = 15;

  printf("The value at the address of p is: %d\n", *p);
  return 0;
}

int* new_integer(void){
  // malloc returns a pointer, so we need a pointer to int to store the
  // returned memory address.
  int *pointer = (int*)malloc(sizeof(int));
  return pointer;
}

