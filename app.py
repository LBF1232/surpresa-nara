from flask import Flask

app = Flask(_name_)

app.route("/inicio")
 def hello_word():
 	    return 'Hello Word'