# Contact page
from wtforms import Form, TextField, TextAreaField
import re

class ContactForm(Form):
  name = TextField("Name: ")
  email = TextField("Email: ")
  phone = TextField("Phone: ")
  message = TextAreaField("Message: ")

# Form validation. 
def validate_email(email):
  message = "Email: myemail@gmail.com"
  emailpattern = r"^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,4}$"
  match = bool(re.match(emailpattern, email))
  return (match, message)

def validate_phone(phone):
  message = "Phone: (903) 555-5555"
  phonepattern = r"^(1\s*[-\/\.]?)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT])[-.:]?\s*(\d+))*$"
  match = bool(re.match(phonepattern, phone))
  return (match, message)

def validate_name(name):
  message = "Name: John Smith"
  namepattern = r"[-a-zA-Z0-9.'\s]+"
  match = bool(re.match(namepattern, name))
  return (match, message)

def validate_msg(msg):
  message = "Message: No HTML or BB Code"
  html = r"<([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>.*?<\/\1>"
  bbcode = r"\[([a-zA-Z][a-zA-Z0-9]*)\b[^\]]*\].*?\[\/\1\]"
  match = not (bool(re.search(html, msg)) or bool(re.search(bbcode, msg)))
  return (match, message)

# Pass in a dataDict with the form key/value pairs. Returns a list of error
# messages for invalid fields, return boolean False if form is valid.
def invalid_fields(dataDict):
  fields = {
    "name": validate_name,
    "phone": validate_phone,
    "email": validate_email,
    "message": validate_msg
  }

  # Invalid flag. As we come across invalid fields we append invalid messages.
  invalid = []

  for field, validator in fields.items():
    valid = validator(dataDict[field])
    if(not valid[0]):
    	invalid.append(valid[1])

  # If there are no invalid items, return False. Otherwise, return their
  # error messages.
  if len(invalid) == 0:
  	return False
  else:
  	return invalid
