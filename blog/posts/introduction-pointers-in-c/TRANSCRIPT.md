Basics of C Pointers (Transcript)
=================================

What is a pointer, and why are they important?
----------------------------------------------

pointer == memory address
pointer variable == variable that holds a memory address


    int x = 10; 

The value 10 is stored in memory. We need to be able to reliably retrieve that
value, so 10 is stored at a specific address. This address is equal to &x.
To get the value at an address, we can use *. So *(&x) == x

Things pointers make easy:

* Allowing a function to "modify a variable"
* Dynamic memory allocation
* Representation of abstract structures

How do I declare a pointer variable?
---------------------------

`int *p` means "p will hold the memory address of an integer"

When using * as part of a declaration, it indicates a pointer variable. When
using * in an expression, it gets the value at an address (dereferencing).


    int x = 10;
    int *p = &x;
    printf("p is a memory address. See? %p\n", p);

    -----

    int x = 10;
    int *p;
    p = &x;
    printf("p is a memory address. See? %p\n", p);

    -----

    int x = 10;
    int *p = &x;

    // %ld represents a long int for printf
    printf("Size of a pointer to int: %lu\n", sizeof(p));
    printf("Size of int: %lu\n", sizeof(*p));


What does it mean to 'dereference' a pointer?
---------------------------------------------

    "Retrieve the value p is pointing at"
    "The value associated with the memory address p"

    int x = 10;
    int *p = &x;
    *p = 20;
    printf("The value is: %d\n", *p);

    // THIS IS WRONG
    int *p;
    *p = 10;


How do I handle pointers inside a function?
-------------------------------------------

    void changevalue(int*);

    int main(){
      int x = 10;
      printf("The value of x is: %d\n", x);
      changevalue(&x);
      printf("The value of x is: %d\n", x);
      return 0;
    }

    void changevalue(int *p){
      *p = 15;
    }



How can I use pointers with structures?
---------------------------------------

    // Rectangle structure
    typedef struct{
      int width;
      int height;
    } rect_t;

    int get_area(rect_t);
    void change_dimensions(rect_t*, int, int);

    int main(){
      rect_t rect;
      rect.width = 10;
      rect.height = 5;
      printf("The area of the rect is: %d\n", get_area(rect));
      change_dimensions(&rect, 4,3);
      printf("The area of the rect is: %d\n", get_area(rect));
      return 0;
    }

    int get_area(rect_t rect){
      return rect.width * rect.height;
    }

    void change_dimensions(rect_t *rect, int newWidth, int newHeight){
      (*rect).width = newWidth;
      (*rect).height = newHeight;
    }

