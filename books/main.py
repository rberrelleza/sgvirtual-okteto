import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    msg = 'Hello World!'
    return msg

if __name__ == '__main__':
  print('Starting books service...')
  app.run(host='0.0.0.0', port=8080)