// Using structures in C
#include<stdio.h>

// Struct declaration
typedef struct person{
  char *name;
  int age;
  char gender;
} person_t;

void print_person(person_t);

int main(){

  // Declaring a variable of type `person_t`
  person_t someguy;
  someguy.name = "Joseph";
  someguy.age = 21;
  someguy.gender = 'M';

  // Print person information
  print_person(someguy);

  return 0;
}

// Print a person's information
void print_person(person_t p){
  printf("Name: %s\n", p.name);
  printf("Age: %d\n", p.age);
  printf("Gender: %c\n", p.gender);
}

