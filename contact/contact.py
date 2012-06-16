# Contact page
from flask import (
 Blueprint, render_template, abort, request, flash   
)
from wtforms import Form, TextField, TextAreaField
from formencode.variabledecode import variable_encode
import validation 

contact_page = Blueprint('contact_page', __name__, template_folder="templates")

class ContactForm(Form):
  name = TextField("Name: ")
  email = TextField("Email: ")
  phone = TextField("Phone: ")
  message = TextAreaField("Message: ")


@contact_page.route('/contact', methods=['GET', 'POST'])
def contact():
  form = ContactForm(request.form)
  if request.method == "POST":

    # There are three differente responses: thanks, invalid, and error
    response = "thanks"

    # Use variable_encode to get to a normal dict.
    dataDict = variable_encode(request.form)

    # Flag to determine if this is an AJAX request or a non-js request
    isAjax = False 

    # Validate the form fields
    invalid = validation.invalid_fields(dataDict)

    if invalid:
      response = "invalid"

    if "AJAX" in dataDict.keys() and dataDict["AJAX"].lower() == 'true':
      isAjax = True

    if isAjax:
      return response
    else:
      if invalid:
        for invalidMsg in invalid:
          flash(invalidMsg)
      return render_template("contact.html", form=form)

    #print(dataDict)
    #return "thanks"
  else:
    return render_template("contact.html", form=form)

