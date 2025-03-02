import os
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory list to store tasks with completion status
tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    task_text = request.json.get('task')
    if task_text:
        tasks.append({'text': task_text, 'completed': False})
    return jsonify({'tasks': tasks})

@app.route('/delete/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks.pop(task_id)
    return jsonify({'tasks': tasks})

@app.route('/toggle/<int:task_id>', methods=['POST'])
def toggle_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks[task_id]['completed'] = not tasks[task_id]['completed']
    return jsonify({'tasks': tasks})

if __name__ == '__main__':
    app.run(debug=True)

# Uncomment below code to run the app on Heroku
# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5000))  # Use Heroku's port or 5000 locally
#     app.run(host='0.0.0.0', port=port, debug=True)