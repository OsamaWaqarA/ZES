from flask import Flask,render_template,request,jsonify

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/update",methods=['GET','POST'])
def update():
    data = request.get_json()
    want = data.get("want")
    if want == "all":
        return jsonify({'mute' : "True",'time' : 6,'volume': 50, 'pause' : "True", "full": "True"}) 

@app.route("/command",methods=['GET','POST'])
def command():
    data = request.get_json()
    mute = data.get("mute")
    timeing = data.get("time")
    volume = data.get("volume")
    pause = data.get("pause")
    full = data.get("full")

    with open("command.txt","r")as file:
        file .write(pause)
        file.write("/n")
        file.write(mute)
        file.write("/n")
        file.write(timeing)
        file.write("/n")
        file.write(volume)
        file.write("/n")
        file.write(full)

if __name__ == "__main__":
    app.run(host = "0.0.0.0",port = 8000,debug = True)