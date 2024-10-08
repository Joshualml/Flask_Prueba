from flask import Flask, jsonify, render_template
import random  

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/sensor-data')
def sensor_data():
    
    pressure = random.uniform(10.0, 100.0)
    return jsonify(pressure=pressure)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
