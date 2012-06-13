# Contact page
from wtforms import Form, TextField, TextAreaField
import re

# Regex patterns
Regex = {
  "mailstrings": "(content\-type|mime\-version|multipart\/mixed|Content\-Transfer\-Encoding|bcc|cc|to|headers):",
  "html": r"<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>.*?<\/\1>",
  "bbcode": r"\[([a-zA-Z][a-zA-Z0-9]*)\b[^\]]*\].*?\[\/\1\]",
  "phone": r"(1\s*[-\/\.]?)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT])[-.:]?\s*(\d+))*",
  "name": r"[-a-zA-Z0-9.'\s]+"
}

class ContactForm(Form):
  name = TextField("Name: ")
  email = TextField("Email: ")
  phone = TextField("Phone: ")
  message = TextAreaField("Message: ")

# Form validation. 
def validate_email(email):
  message = u"Email: myemail@gmail.com"
  emailpattern = r"^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4}$"
  match = re.match(email, emailpattern)
  return (match, message)

# Pass in a dataDict with the form key/value pairs. Returns a list of error
# messages for invalid fields, return boolean False if form is valid.
#def invalid_form(dataDict):

