# Contact page
from wtforms import Form, validators, TextField, TextAreaField

class ContactForm(Form):
  name = TextField("Name: ")
  email = TextField("Email: ")
  phone = TextField("Phone: ")
  message = TextAreaField("Message: ")
