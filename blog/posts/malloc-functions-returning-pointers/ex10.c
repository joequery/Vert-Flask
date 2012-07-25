// Attempt to dereference a void pointer: This will fail to compile!
#include<stdio.h>

int main(){
  // Get the address of an integer
  int x = 10;
  void* vp = &x;

  printf("The value at the address of vp is: %d\n", *(int*)vp);
  return 0;
}


