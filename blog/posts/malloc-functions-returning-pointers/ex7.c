// Void pointers
#include<stdio.h>

int main(){
  int x = 10;
  float y = 20.0;

  void *p = &x;
  printf("p: %p\n", p);

  p = &y;
  printf("p: %p\n", p);
  return 0;
}

