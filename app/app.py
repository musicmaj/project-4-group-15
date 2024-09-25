from flask import Flask, render_template, jsonify
from sqlalchemy import func

app = Flask(__name__)

@app.route('/', methods=['GET'])
def landing():
    return render_template('index.html')

@app.route('/dashboard_1', methods=['GET'])
def dashboard_1():
    return render_template('dashboard_1.html')

@app.route('/dashboard_2', methods=['GET'])
def dashboard_2():
    return render_template('dashboard_2.html')

@app.route('/machine_learning', methods=['GET'])
def machine_learning():
    return render_template('machine_learning.html')

@app.route('/works_cited', methods=['GET'])
def works_cited():
    return render_template('works_cited.html')

@app.route('/aboutus', methods=['GET'])
def aboutus():
    return render_template('aboutus.html')



@app.route('/api/v1/data', methods=['GET'])
def get_data():
   # Read the CSV file
   data = pd.read_csv('data_engineering/jupyter_notebooks/Resources/cleaned_airbnb_data')

   # Convert DF to JSON
   data_json = data.to_json(orient='records')

   return jsonify(data_json)


@app.route('/api/v1/dashboard_1/<after>', methods=['GET'])



if __name__ == "__main__":
    app.run(debug=True)  