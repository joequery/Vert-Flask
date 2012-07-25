// Void pointers are assignable to any pointers
#include<stdio.h>

int main(){
	// Initialize an integer
  int x = 10;

  // Declare pointers to int and float
  int *pint;
  float *pfloat;

  // Initialize a void pointer to the memory address of the integer x
  void* vp = &x;

  // Since void pointers are assignable to any pointer, the following are both
  // legal (but legal doesn't always mean smart or safe!).
  pint = vp;
  pfloat = vp;

  // This makes sense because pint is a pointer to int, and vp holds the
  // memory address of an integer.
  printf("*pint: %d\n", *pint);

  // But this doesn't make sense because pfloat is a pointer to float, but
  // vp holds the memory address of an integer.
  *pfloat = 10.0;
  printf("*pfloat: %f\n", *pfloat);

  // Now our data has been corrupted. Lesson learned: Just because void
  // pointers are legally assignable to everything doesn't mean you're safe!
  printf("*pint: %d\n", *pint);

  return 0;
}


