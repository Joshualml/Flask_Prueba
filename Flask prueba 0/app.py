# Importar el paquete Flask
from flask import Flask, render_template

# Inicializamos la aplicacion
app = Flask(__name__)

# Ruta principal
@app.route('/')
def index():
    return render_template('index.html')

# Configuracion basica
if __name__ == '__main__':
    # Activamos debug y configuramos para que sea accesible desde cualquier dispositivo
    app.run(debug=True, host='0.0.0.0')
