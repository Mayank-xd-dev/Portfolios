from flask import Flask, render_template, request, send_file
from rembg import remove
import os
from io import BytesIO

app = Flask(__name__)

# Folder to store uploaded files
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Route to render the main page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle image upload and background removal
@app.route('/remove_background', methods=['POST'])
def remove_background():
    if 'file' not in request.files:
        return "No file part", 400

    file = request.files['file']
    if file.filename == '':
        return "No selected file", 400

    # Read the uploaded file
    input_data = file.read()

    # Remove the background
    output_data = remove(input_data)

    # Save the result to a BytesIO object
    output_image = BytesIO(output_data)

    # Send the file to the user
    return send_file(output_image, mimetype='image/png', as_attachment=True, download_name='output.png')

if __name__ == '__main__':
    app.run(debug=True)
