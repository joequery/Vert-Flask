# Contact page
from flask import (
 Blueprint, render_template, abort, request, flash   
)
from wtforms import Form, TextField, TextAreaField
from formencode.variabledecode import variable_encode
import smtplib
import validation 
from email.MIMEText import MIMEText


contact_page = Blueprint('contact_page', __name__, template_folder="templates")

class ContactForm(Form):
  name = TextField("Name: ")
  email = TextField("Email: ")
  phone = TextField("Phone: ")
  message = TextAreaField("Message: ")

def send_email(dataDict):
  msg = MIMEText('Hahahahaha')
  msg['Subject'] = 'Testing!'
  msg['From'] = "joseph@vertstudios.com"
  msg['To'] = "joseph@vertstudios.com"

  msg = msg.as_string()

  server = smtplib.SMTP('smtp.gmail.com',587) #port 465 or 587
  server.ehlo()
  server.starttls()
  server.ehlo()
  server.login('joseph@vertstudios.com','qqo2347')
  server.sendmail('joseph@vertstudios.com','joseph@vertstudios.com',msg)
  server.close()

  try:
    response = "thanks"
  except SMTPException:
    response = "error"

  return response



@contact_page.route('/contact', methods=['GET', 'POST'])
def contact():
  form = ContactForm(request.form)
  if request.method == "POST":

    # There are three differente responses: thanks, invalid, and error
    response = "thanks"

    # Use variable_encode to get form entries to a normal dict.
    dataDict = variable_encode(request.form)

    # If "AJAX" variable was passed via POST, this was an ajax request.
    isAjax = "AJAX" in dataDict.keys()

    # Get all invalid field entries.
    invalid = validation.invalid_fields(dataDict)

    # If we have any invalid entries at on, we respond with an invalid 
    # indicator. Otherwise, attempt to send the email.
    if invalid:
      response = "invalid"
    else:
    	response = send_email(dataDict)

    # Just return the response if this is AJAX: Do something with the response
    # with JavaScript instead of rendering the template.
    if isAjax:
      return response
    else:
      # Get information based on the response.
      info = render_template("form_response/%s.html"%response, invalid=invalid)

      # If the response was thanks, clear the form.
      if response == 'thanks':
        form = ContactForm()

      return render_template("contact.html", form=form, info=info)
  else:
    return render_template("contact.html", form=form)

