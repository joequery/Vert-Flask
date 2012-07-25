// Attempt to dereference a void pointer: This will fail to compile!
#include<stdio.h>
#include<stdlib.h> 

void* new_integer(void);

int main(){
  // Get the address of an integer
  int *p = new_integer();

  // Even though new_integer() returns a void pointer, it's implicitly 
  // converted to int* in the assignment above. p is a pointer to int,
  // not a void pointer, so it can safely be dereferenced. 
  *p = 15;

  printf("The value at the address of p is: %d\n", *p);

  float x = 10;
  printf("x: %.2f\n", x);
  return 0;
}

void* new_integer(void){
  // malloc returns a pointer, so we need a pointer to int to store the
  // returned memory address.
  void* pointer = malloc(sizeof(int));
  return pointer;
}
