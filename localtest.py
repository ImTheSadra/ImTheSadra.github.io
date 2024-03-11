from flask import Flask, send_file
import sys

app = Flask("app")

@app.route("/")
def index():
    return send_file("./index.html", "text/html")

@app.route("/<path:path>")
def file(path):
    return send_file(path)

ip = "127.0.0.1"
if "--ip" in sys.argv:
    ip = sys.argv[sys.argv.index("--ip")+1]
port = "80"
if "--port" in sys.argv:
    port = sys.argv[sys.argv.index("--port")+1]

try:app.run(ip, int(port), True)
except:app.run(ip, 7777, True)