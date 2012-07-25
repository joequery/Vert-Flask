// Be evil with void pointers
#include<stdio.h>

int main(){
  // Initialize a floating point
  float x = 10;

  // Initialize a void pointer to the address of a float, which is perfectly OK
  void *vp = &x;

  // Initialize a pointer to int to the address stored in vp, which is
  // perfectly legal since the void pointer vp is implicitely converted to a
  // pointer to int.
  int *p = vp;

  printf("The address of x: %p\n", &x);
  printf("The address of p: %p\n", p);
  printf("The value of *p: %d\n", *p);

  *p = 15;
  printf("The value of *p after deref-assignment: %d\n", *p);
  printf("The value of x: %.2f\n", x);

  return 0;
}
