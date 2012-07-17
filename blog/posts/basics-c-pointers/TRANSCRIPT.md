Basics of C Pointers (Transcript)
=================================


What is a pointer, and why are they important?
----------------------------------------------

pointer == memory address
pointer variable == variable that holds a memory address

Things pointers make easy:

* Allowing a function to "modify a variable"
* Dynamic memory allocation
* Representation of abstract structures

How do I declare a pointer variable?
---------------------------

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
    printf("Size of a pointer to int: %ld\n", sizeof(p));
    printf("Size of int: %ld\n", sizeof(*p));


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


How can I use pointers with structures?
---------------------------------------
