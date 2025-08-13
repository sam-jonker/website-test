from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def about():
    return render_template('about.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/experience')
def experience():
    return render_template('experience.html')

@app.route('/download-resume')
def download_resume():
    return send_from_directory('static/downloads', 'Sam_Jonker_Resume.pdf', as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5001)))
