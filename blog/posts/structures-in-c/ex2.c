#include<stdio.h>

struct product{
  char *label;
  int value;
};

int main(){

  struct product cookie;
  cookie.label = "wonderful cookie";
  cookie.value = 1;

  printf("The %s is $%d\n", cookie.label, cookie.value);

  return 0;
}

