// Attempt to dereference a void pointer: This will fail to compile!
#include<stdio.h>
#include<stdlib.h> 

void* new_integer(void);

int main(){
  // Get the address of an integer
  int *p = new_integer();
  *p = 15;

  printf("The value at the address of vp is: %d\n", *(int*)vp);
  return 0;
}

void* new_integer(void){
  // malloc returns a pointer, so we need a pointer to int to store the
  // returned memory address.
  void* pointer = malloc(sizeof(int));
  return pointer;
}
