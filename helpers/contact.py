# Contact page
from wtforms import Form, validators, TextField

class ContactForm(Form):
  name = TextField("Full Name")
  email = TextField("Email")
  phone = TextField("Phone")
  message = TextField("Message")
