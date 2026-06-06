import os
from flask import Flask, request, jsonify
from API.agent import Agent

app = Flask(__name__, static_folder='../Frontend', static_url_path='')

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/analyze', methods=['POST'])
def analyze_code():
    data = request.get_json()
    
    if not data or 'code' not in data:
        return jsonify({'error': 'Brak kodu do analizy.'}), 400
    
    source_code = data.get('code')
    language = data.get('language', 'Python')

    if not source_code.strip():
        return jsonify({'error': 'Wklejony kod jest pusty.'}), 400

    agent = Agent(language)
    report_markdown = agent.analyze_code(source_code)
    
    return jsonify({
        'success': True,
        'report': report_markdown
    })


if __name__ == '__main__':
    if not os.environ.get("KEY"):
        print("Zmienna środowiskowa KEY nie jest ustawiona")
    
    app.run(debug=True, port=5000)