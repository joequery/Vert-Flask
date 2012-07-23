// Using malloc to allocate memory for a structure
#include<stdio.h>
#include<stdlib.h>

// Create a 'rectangle' structure.
typedef struct{
  int height;
  int width;
} rec_t;

rec_t* new_rectangle(void);

int main(){
  // Declare a pointer to a rectangle structure. `ptr` will hold the memory
  // address of a structure.
  rec_t *ptr;
  ptr = new_rectangle();

  // Now that ptr has the memory address of a rectangle structure, we can
  // perform operations on *ptr just like we would any other structure.
  // In this case, assignment.
  rec_t rectangle = *ptr;

  rectangle.width = 10;
  rectangle.height = 10;

  // Display the dimensions.
  printf("The height: %d\nThe width: %d\n", rectangle.width, rectangle.height);

  return 0;
}

rec_t* new_rectangle(void){
  // Allocate the exact right amount of memory for a rectangle structure,
  // calculated by sizeof(rec_t). Return the memory address to `p`.
  rec_t *p = malloc(sizeof *p);
  return p;
}
