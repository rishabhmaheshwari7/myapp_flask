import os

from flask import Flask
from flask import render_template
from flask import request
from flask import redirect

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import null

project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "myapp.db"))

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = database_file
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    designation = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return "<id: {}> , name:{}, designation:{} ".format(self.id,self.name,self.designation)

class Dept(db.Model):
    d_id = db.Column(db.Integer, primary_key=True)
    d_name=db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"d_id : {self.d_id}, d_name: {self.d_name}" 


@app.route("/")
def landing():
    return render_template('landing.html')


@app.route("/home", methods=["GET", "POST", "DELETE"])
def home():
    employees = None
    if request.method=='POST':
        try:
            p_name = request.form.get("name")
            p_post = request.form.get("designation")
            person =Employee(name=p_name, designation= p_post)
            db.session.add(person)
            db.session.commit()
        except Exception as e:
            print("Failed to add employee")
            print(e)
    employees = Employee.query.all()
    departments= ['a','b','c','d'] #and paas this to render
    return render_template("home.html", employees=employees,departments=departments)

@app.route("/update", methods=["POST"])
def update():
    try:
        name_to_update = request.form.get("name")
        id_to_update = request.form.get("id")
        person = Employee.query.filter_by(id=id_to_update).first()
        person.name = name_to_update
        db.session.commit()
    except Exception as e:
        print("Couldn't update name")
        print(e)
    return redirect("/home")


@app.route("/delete", methods=["POST"])
def delete():
    p_id = request.form.get("id")
    employee = Employee.query.filter_by(id=p_id).first()
    db.session.delete(employee)
    db.session.commit()
    return redirect("/home")


#----------
@app.route("/dept", methods=['GET','POST'])
def depts():
    departments = None
    if request.form:
        try:
            p_name = request.form.get("department")
            dept =Dept(d_name=p_name)
            db.session.add(dept)
            db.session.commit()
        except Exception as e:
            print("Failed to add dept")
            print(e)
    departments = Dept.query.all()
    for dept in departments:
        print(dept)
    return render_template("dept.html", departments=departments)

@app.route("/updatedept", methods=["POST"])
def updatedept():
    try:
        name_to_update = request.form.get("d_name")
        id_to_update = request.form.get("d_id")

        print(name_to_update,id_to_update)
        dept_name = Dept.query.filter_by(d_id=id_to_update).first()
        dept_name.d_name = name_to_update
        db.session.commit()
    except Exception as e:
        print("Couldn't update name")
        print(e)
    return redirect("/dept")


@app.route("/deletedept", methods=["POST"])
def deletedept():
    print("delete callde of dept")
    p_id = request.form.get("d_id")
    dept_to_be_deleted = Dept.query.filter_by(d_id=p_id).first()
    db.session.delete(dept_to_be_deleted)
    db.session.commit()
    return redirect("/dept")


if __name__ == "__main__":
    db.create_all()
    app.run(host='0.0.0.0', port=8087, debug=True)
