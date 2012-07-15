//Joseph McCullough
//Program: alphanumonly.cpp
//Description: Takes a string and creates another string that contains only the 
//letters and numbers of the first string.
//Visit www.mcculloughdesigns.com/blog for more C++ Goods!

#include <iostream>
#include <string>
using namespace std;

string alphaNumOnly(string);

const string SENTINEL = "0";//When entered as strToConvert, 
							//terminates program.

int main()
{
	string strToConvert;  //The string that will be converted to.
	string strConverted;  //strToConverted with only letters and numbers.

	cout << "***************************************************" << "\n"
		 << "AlphaNumOnly.exe"                     << "\n"
		 << "Removes blank spaces and punctuations from a string" << "\n"
		 << "Provided By McCullough Designs"      << "\n"
		 << "***************************************************";

	//Read in strToConvert
	cout << "\n\nEnter a String or enter 0 to exit: ";
	getline(cin, strToConvert);

	while (strToConvert != SENTINEL)
	{
		
		strConverted = alphaNumOnly(strToConvert);
		cout << "\nNew String: " << strConverted;

		//Read in strToConvert
		cout << "\n\nEnter a String or enter 0 to exit: ";
		getline(cin, strToConvert);

	}
	return 0;
}

/************ function alphaNumOnly *********************************\
Description: Used to isolate the alphanumeric characters of a string

Precondition: strToConvert is defined

Postcondition: Returns a string
/********************************************************************/

string alphaNumOnly(string strToConvert)
{
	string strConverted; //strToConvert with only alpha-numeric characters.

	for (unsigned int i=0; i<strToConvert.length();i++)
	{
	  if (isalnum(strToConvert[i])) //If current character is alpha-numeric
	   strConverted += strToConvert[i]; //Add the character to strConverted

	}

	return strConverted;

}