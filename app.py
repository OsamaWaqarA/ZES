from flask import Flask,render_template,request,jsonify, redirect

import os

import logging
logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/TV")
def TV():
    if os.path.exists(os.getcwd()+"/TV"+str(request.remote_addr)+".txt"):
        return render_template("TV.html")
    else:
        return redirect("/")

@app.route("/check",methods=['GET','POST'])
def check():
    data = request.get_json()
    cip = data.get("cip")
    watching = data.get("watching")
    newip = data.get("newip")
    contents = os.listdir(os.getcwd()+"/TV")
    if len(contents) == 0:
        return jsonify({'status':'success','cip': "",'watching':""})
    else:
        if len(contents) > 1:
            for content in contents:
                os.remove(os.getcwd()+"/TV/"+content)
            return jsonify({'status':'success','cip': "",'watching':""})
        else:
            with open(os.getcwd()+"/TV/"+contents[0], "r") as file:
                watching = file.readline().strip()
            cip = contents[0][0:-4]
            return jsonify({'status':'success','cip': cip,'watching':watching})



@app.route("/Big Boss")
def Big_Boss():
    return render_template("command.html")

@app.route("/update",methods=['GET','POST'])
def update():
    data = request.get_json()
    want = data.get("want")
    if want == "all":
        return jsonify({'mute' : "True",'time' : 6,'volume': 50, 'pause' : "True", "full": "True"}) 

@app.route("/command",methods=['GET','POST'])
def command():
    data = request.get_json()
    mute = str(data.get("mute").strip())
    volume = str(data.get("volume").strip())
    pause = str(data.get("pause").strip())
    full = str(data.get("full").strip())
    seek = str(data.get("seek").strip())


    with open("command.txt","w")as file:
        file.write(pause)
        file.write("\n")
        file.write(mute)
        file.write("\n")
        file.write(seek)

        file.write("\n")
        file.write(volume)
        file.write("\n")
        file.write(full)

    return jsonify({"status": "success"})

if __name__ == "__main__":
    app.run(host = "0.0.0.0",port = 8000,debug = True)