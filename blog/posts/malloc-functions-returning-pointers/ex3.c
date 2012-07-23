// This program contains a simple function that returns a pointer to float.
#include<stdio.h>

float* return_biggest(float*, float*);

int main(){
  float x = 10.0;
  float y = 20.0;

  // Get the address of the variable with the largest value.
  float *p = return_biggest(&x, &y);

  printf("(x) addr: %p, val: %.2f \n", &x, x);
  printf("(y) addr: %p, val: %.2f \n", &y, y);
  printf("The address of the biggest: %p\n", p);
  printf("The value of the biggest: %.2f\n", *p);
  return 0;
}

/*
 * Returns the address of the float variable with the largest value.
 */
float* return_biggest(float *p1, float *p2){
  // biggest is a pointer to float: it will hold the memory address of a
  // floating point variable.
  float *biggest;
  if (*p1 > *p2){
    // biggest is assigned the memory address of the float associated with 
    // the address p1
    biggest = p1;
  }
  else{
    // biggest is assigned the memory address of the float associated with 
    // the address p2
    biggest = p2;
  }

  // return the memory address of the larger float variable
  return biggest;
}
