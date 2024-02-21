from flask import Flask, send_file

app = Flask("app")

@app.route("/")
def index():
    return send_file("./index.html", "text/html")

@app.route("/<path:path>")
def file(path):
    return send_file(path)

app.run("127.0.0.1", 7777, True)