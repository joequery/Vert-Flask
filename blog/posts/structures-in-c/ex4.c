// Using typedef
#include<stdio.h>

typedef struct product{
  char *label;
  int value;
} product_t;

int main(){
  product_t cookie; // Was formerly struct product cookie
  cookie.label = "wonderful cookie";
  cookie.value = 1;

  printf("The %s is $%d\n", cookie.label, cookie.value);
  return 0;
}

