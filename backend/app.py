from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask import current_app
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://postgres:abc123@localhost/RABapp_Task"

db = SQLAlchemy(app)
with app.app_context():
    print(current_app.name)
    db.init_app(app)

CORS(app, support_credentials=True)


class Movements(db.Model):
    __tablename__ = "movements"
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    company = db.Column(db.Text())
    reason = db.Column(db.Text())
    species = db.Column(db.Text())
    origin_premise_id = db.Column(db.Text())
    dest_premise_id = db.Column(db.Text())
    moved_count = db.Column(db.Integer)
    start_date = db.Column(db.DateTime)

    def __repr__(self) -> str:
        return f"Movements: {self.id}"

    def __init__(
        self,
        company,
        reason,
        species,
        origin_premise_id,
        dest_premise_id,
        moved_count,
        start_date,
    ) -> None:
        self.company = company
        self.reason = reason
        self.species = species
        self.origin_premise_id = origin_premise_id
        self.dest_premise_id = dest_premise_id
        self.moved_count = moved_count
        self.start_date = start_date


class Population(db.Model):
    __tablename__ = "population"
    id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
    address = db.Column(db.Text())
    city = db.Column(db.Text())
    name = db.Column(db.Text())
    state = db.Column(db.Text())
    lat = db.Column(db.Numeric(10, 5))
    lon = db.Column(db.Numeric(10, 5))
    premise_id = db.Column(db.Text())
    postalcode = db.Column(db.Integer)
    total_animal_count = db.Column(db.Integer)

    def __init__(self, address) -> None:
        self.address = address

    def __repr__(self) -> str:
        return f"Population: {self.id}"


def format_popu(event):
    return {
        "id": event.id,
        "address": event.address,
        "city": event.city,
        "name": event.name,
        "state": event.state,
        "lat": event.lat,
        "lon": event.lon,
        "premise_id": event.premise_id,
        "postalcode": event.postalcode,
        "total_animal_count": event.total_animal_count,
    }


def format_move(event):
    return {
        "id": event.id,
        "company": event.company,
        "reason": event.reason,
        "species": event.species,
        "origin_premise_id": event.origin_premise_id,
        "dest_premise_id": event.dest_premise_id,
        "moved_count": event.moved_count,
        "start_date": event.start_date,
    }


@app.route("/")
def hello():
    return "hi"


# create an event
@app.route("/events", methods=["POST"])
def create_event():
    address = request.json["address"]
    # id = request.json["id"]
    event = Population(address)
    db.session.add(event)
    db.session.commit()
    return format_popu(event)


# get all events
@app.route("/events", methods=["GET"])
def get_events():
    events = Population.query.order_by(Population.id.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_popu(event))
    return {"events": event_list}


# get an event by id
@app.route("/events/<id>", methods=["GET"])
def get_event(id):
    event = Population.query.filter_by(id=id).one()
    return {"event": format_popu(event)}


# delete event
@app.route("/events/<id>", methods=["DELETE"])
@cross_origin(supports_credentials=True)
def delete_event(id):
    event = Population.query.filter_by(id=id).one()
    db.session.delete(event)
    db.session.commit()
    return f"Event {id:{id}} deleted!"


# edit total_animal_count in population table
@app.route("/events/<premise_id>", methods=["PUT"])
def edit_event(premise_id):
    event = Population.query.filter_by(premise_id=premise_id)
    event1=event.first()
    count = int(request.json["count"])+event1.total_animal_count
    event.update(dict(total_animal_count=count))
    db.session.commit()
    return {"event": format_popu(event.one())}


@app.route("/movements", methods=["GET"])
@cross_origin(supports_credentials=True)
def get_movements():
    events = Movements.query.order_by(Movements.id.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_move(event))
    return {"events": event_list}


# create an event
@app.route("/movements", methods=["POST"])
def create_movement():
    company = request.json["company"]
    reason = request.json["reason"]
    species = request.json["species"]
    origin_premise_id = request.json["origin_premise_id"]
    dest_premise_id = request.json["dest_premise_id"]
    moved_count = request.json["moved_count"]
    start_date = request.json["start_date"]
    event = Movements(
        company,
        reason,
        species,
        origin_premise_id,
        dest_premise_id,
        moved_count,
        start_date,
    )
    db.session.add(event)
    db.session.commit()
    return format_move(event)


if __name__ == "__main__":
    app.run(debug=True)
