// Using structures in C
#include<stdio.h>

// Struct declaration
struct person{
  char *name;
  int age;
  char gender;
};

void print_person(struct person);

int main(){

  // Declaring a variable of type `struct person`
  struct person someguy;
  someguy.name = "Joseph";
  someguy.age = 21;
  someguy.gender = 'M';

  // Print person information
  print_person(someguy);

  return 0;
}

// Print a person's information
void print_person(struct person p){
  printf("Name: %s\n", p.name);
  printf("Age: %d\n", p.age);
  printf("Gender: %c\n", p.gender);
}
