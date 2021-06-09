import os
import json
import requests
import flask

app = flask.Flask(__name__)

@app.route('/')
def index():
  return flask.redirect(flask.url_for('get/1529038340'), code=302)

@app.route('/<isbn>', methods=['GET'])
def get(isbn):
    d = requests.get('http://details:8080/api/details/' + isbn)
    details = d.json()
    r = requests.get('http://ratings:8080/api/ratings/' + isbn)
    ratings = {'rating': 'n/a'}
    if r.status_code < 300:
      ratings = r.json()
      
    return {
      'title': details.get('title'),
      'author': details.get('author'),
      'rating': ratings.get('rating'),
    }

@app.route('/<isbn>', methods=['POST'])
def rate(isbn):
  response = requests.post('http://ratings:8080/api/ratings/' + isbn, json={'rating': '5'})
  if response.status_code >= 300:
    return flask.jsonify(error=500, text='internal server error'), 500
  
  return ''

if __name__ == '__main__':
  print('Starting books service...')
  app.run(host='0.0.0.0', port=8080)