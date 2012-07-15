//Joseph McCullough
//Program: capEachWord.cpp
//Description: Takes a string and capitalizes each word of the string.
//Visit www.mcculloughdesigns.com/blog for more C++ Goods!

#include <iostream>
#include <string>
using namespace std;

void lowerCase(string&);
void capEachWord(string&);

const string SENTINEL = "0";//When entered as strToConvert, 
							//terminates program.

int main()
{
	string strToConvert;  //The string that will be converted.

	cout << "***********************************" << "\n"
		 << "CapEachWord.exe"                     << "\n"
		 << "Capitalizes every word in a string." << "\n"
		 << "Provided By McCullough Designs"      << "\n"
		 << "***********************************";

	//Read in strToConvert
	cout << "\n\nEnter a String or enter 0 to exit: ";
	getline(cin, strToConvert);

	while (strToConvert != SENTINEL)
	{
		capEachWord(strToConvert);
		cout << "\nNew String: " << strToConvert;

		//Read in strToConvert
		cout << "\n\nEnter a String or enter 0 to exit: ";
		getline(cin, strToConvert);

	}
	return 0;
}


/****** function capEachWord *****
Description: converts the first letter of a word to a capital letter

PARAMETERS
	strToConvert: the string being manipulated

Precondition:
	strToConvert: undefined

	HEADERS
	#include <string> 

Postcondition:
	Returns the string with the first letter of every word capitalized.  */

void capEachWord(string& strToConvert)
{
	//Identifies if the current word has been capitalized. 
	//Set to false by default. 
	bool thisWordCapped = false;
	//Turn all letters lowercase
	lowerCase(strToConvert);

	for (unsigned int i=0; i<strToConvert.length();i++)
	{
	   //At a space or punctuation mark, the current word has ended. 
	   //We are now on a new word that has not yet been capitalized, 
	   //so thisWordCapped is set to false.
		if ((ispunct(strToConvert[i])) || (isspace(strToConvert[i])))
			thisWordCapped = false;

	   //If current word has not been capitalized AND the current character
	   //is a letter, uppercase the letter. The word is now capitalized, so
	   //thisWordCapped is set to true, and will not be set to false until
	   //a space or punctuation is found.
		if ((thisWordCapped==false)	&& (isalpha(strToConvert[i])))
		{				
			strToConvert[i]=toupper(strToConvert[i]);
			thisWordCapped = true;	
		}
			
	}

}
/****** function lowerCase *****
Description: makes all the characters of a string lowercase

PARAMETERS
	strToConvert: the string being manipulated

Precondition:
	strToConvert: undefined

	HEADERS
	#include <string> 

Postcondition:
	Returns the string all lowercase */

void lowerCase(string& strToConvert) 
{
   for(unsigned int i=0;i<strToConvert.length();i++)
   {
      strToConvert[i] = tolower(strToConvert[i]);
   }
}
