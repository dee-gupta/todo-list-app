from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory list to store tasks (for simplicity)
tasks = []

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/add', methods=['POST'])
def add_task():
    task = request.json.get('task')
    if task:
        tasks.append(task)
    return jsonify({'tasks': tasks})

@app.route('/delete/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    if 0 <= task_id < len(tasks):
        tasks.pop(task_id)
    return jsonify({'tasks': tasks})

if __name__ == '__main__':
    app.run(debug=True)