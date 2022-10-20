from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://postgres:abc123@localhost/RABapp_Task"
db = SQLAlchemy(app)

class Table1(db.Model):
    __tablename__ = 'table1'
    task_id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    description = db.Column(db.Text())
    created_on = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self) -> str:
        return f"Event: {self.description}"

    def __init__(self, description) -> None:
        self.description=description

@app.route("/")
def hello():
    return "hi"


if __name__ == "__main__":
    app.run()
