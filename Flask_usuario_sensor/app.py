from flask import Flask, render_template, request, redirect, url_for, session
from flask_mysqldb import MySQL
import MySQLdb.cursors
import random

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Configuración de MySQL
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'presion_prueba1'

mysql = MySQL(app)

@app.route('/')
def index():
    if 'loggedin' in session:
        return redirect(url_for('sensor'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s AND password = %s', (username, password,))
        account = cursor.fetchone()
        if account:
            session['loggedin'] = True
            session['id'] = account['id']
            session['username'] = account['username']
            return redirect(url_for('sensor'))
        else:
            return 'Incorrect username/password!'
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST' and 'username' in request.form and 'password' in request.form:
        username = request.form['username']
        password = request.form['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('INSERT INTO users (username, password) VALUES (%s, %s)', (username, password))
        mysql.connection.commit()
        return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/sensor')
def sensor():
    if 'loggedin' in session:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT value1, value2 FROM sensor_readings WHERE user_id = %s ORDER BY id DESC LIMIT 10', (session['id'],))
        readings = cursor.fetchall()
        return render_template('sensor.html', username=session['username'], readings=readings)
    return redirect(url_for('login'))

@app.route('/generate-data', methods=['POST'])
def generate_data():
    if 'loggedin' in session:
        value1 = random.uniform(10.0, 100.0)
        value2 = random.uniform(10.0, 100.0)
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO sensor_readings (user_id, value1, value2) VALUES (%s, %s, %s)',
                       (session['id'], value1, value2))
        mysql.connection.commit()
        return redirect(url_for('sensor'))
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
