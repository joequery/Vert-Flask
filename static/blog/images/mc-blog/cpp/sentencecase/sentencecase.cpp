//Joseph McCullough
//Program: sentencecase.cpp
//Description: Converts a string to sentence case.
//Visit http://www.mcculloughdesigns.com for more C++ Goods

#include <iostream>
#include <string>
using namespace std;

void sentenceCase(string&);
void lowerCase(string&);
bool isSentencePunc(char);

const string SENTINEL = "0";//When entered as strToConvert, 
							//terminates program.

int main()
{
	string strToConvert;    //The string that will be converted
	
	cout << "***************************************************" << "\n"
		 << "SentenceCase.exe"                     << "\n"
		 << "Converts Strings to Sentence Case" << "\n"
		 << "Provided By McCullough Designs"      << "\n"
		 << "***************************************************";

	//Read in strToConvert
	cout << "\n\nEnter a String or enter 0 to exit: ";
	getline(cin, strToConvert);

	while (strToConvert != SENTINEL)
	{
		sentenceCase(strToConvert);
		cout << "New String: " << strToConvert;
		
		//Read in strToConvert
		cout << "\n\nEnter a String or enter 0 to exit: ";
		getline(cin, strToConvert);

	}
	return 0;
}

/****** function sentenceCase *****
Description: Converts a string so that the first letter of the first word
of a sentence is capitalized.

PARAMETERS
	strToConvert: the string being manipulated

Precondition:
	strToConvert: undefined

	HEADERS
	#include <string> 

Postcondition:
	Returns the manipulated string by reference */

void sentenceCase(string& strToConvert)
{
	//Identifies if the sentence has been capitalized. Set to false by default. 
	bool thisSentenceCapped = false;
	lowerCase(strToConvert);  //Lowercase the string before processing.

	for (unsigned int i=0; i<strToConvert.length();i++)
	{
		//At a punctuation mark, the next sentence has not been manipulated
		//yet to have its first letter capitalized, so thisSentenceCapped is false.
		if (isSentencePunc(strToConvert[i]))
			thisSentenceCapped = false;

		if ((thisSentenceCapped==false)	&& (isalpha(strToConvert[i])))
		{				
			strToConvert[i]=toupper(strToConvert[i]);
			thisSentenceCapped = true;	
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

/****** function isSentencePunc *****
Description: Checks to see if a character is a punctuation mark used to denote
the end of a sentence. (! . ?)

PARAMETERS
	character: The character being tested

Precondition:
	character: defined

Postcondition:
	Returns boolean value of true if the character is ! . or ? */

bool isSentencePunc(char character)
{
	switch(character)
	{
		case '!':
		case '.':
		case '?':
			return true;		
		default:
			return false;
	}
}