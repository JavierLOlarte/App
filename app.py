from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import os

app = Flask(__name__)
CORS(app)

# Ruta donde quieres ejecutar el comando
project_path = r"C:\Proyecto\ultima\SWO.Kotlin"

@app.route('/execute', methods=['POST'])
def execute_command():
    data = request.json
    command = data.get("command")
    
    if not command:
        return jsonify(error="No se recibió un comando"), 400

    print(f"📢 Ejecutando comando en la ruta: {project_path}")
    print(f"📢 Comando a ejecutar: {command}")

    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, check=True, cwd=project_path)
        print(f"✅ Salida: {result.stdout}")
        print(f"⚠️ Error (si hay): {result.stderr}")
        return jsonify(output=result.stdout, error=result.stderr)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error ejecutando el comando: {e.stderr}")
        return jsonify(error=e.stderr), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
