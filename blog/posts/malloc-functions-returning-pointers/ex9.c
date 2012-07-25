// Demonstrate a simple function that returns a void pointer
#include<stdio.h>

void* return_me(int*);

int main(){
  int x = 5;

  // p holds the memory address of the integer x.
  int *p = &x;
  printf("p: %p\n", p);

  p = return_me(p);
  printf("p: %p\n", p);

  return 0;
}

/*
 * A very simple function: Just returns the pointer passed to it!
 */
void* return_me(int *pointer){
  return pointer;
}

