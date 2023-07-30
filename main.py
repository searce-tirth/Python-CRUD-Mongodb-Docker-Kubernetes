from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
import os

app = Flask(__name__)

# Connect to MongoDB Atlas
mongo_uri = os.environ.get('MONGO_URI')  # Replace with your MongoDB Atlas connection string
# mongo_uri = "mongodb+srv://tirth:@cluster0.4qezvaw.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client.get_database('mydatabase')   # Replace 'mydatabase' with your desired database name
collection = db.my_collection           # Replace 'my_collection' with your desired collection name


# Routes
@app.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    collection.insert_one(data)
    return jsonify({'message': 'Record created successfully'}), 201


@app.route('/read', methods=['GET'])
def read():
    data = list(collection.find({}, {'_id': 0}))
    return jsonify(data), 200


@app.route('/update/<string:id>', methods=['PUT'])
def update(id):
    data = request.get_json()
    collection.update_one({'id': id}, {'$set': data})
    return jsonify({'message': 'Record updated successfully'}), 200


@app.route('/delete/<string:id>', methods=['DELETE'])
def delete(id):
    print(id)
    collection.delete_one({'id': id})
    return jsonify({'message': 'Record deleted successfully'}), 200


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80 ,debug=True)
