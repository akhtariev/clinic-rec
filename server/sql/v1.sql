
CREATE TABLE Specialty(
  name VARCHAR(30) PRIMARY KEY DEFAULT 'Undetermined'
);
INSERT INTO Specialty VALUES 
('Cardiology'),
('Neurology'),
('Pediatrics'),
('Dermatology'),
('Gynecology');

CREATE TABLE Medical_History(
    id CHAR(36), 
    guardian_name VARCHAR(20), 
    height INTEGER, 
    weight INTEGER,
    date_created Date, 
    PRIMARY KEY(id) 
);
INSERT INTO Medical_History
 (id, guardian_name, height, weight, date_created)
VALUES
  ('0001', 'Hazra Imran', 190, 90, '1998-11-15'),
  ('0002', 'Chuck Norris', 189, 89, '1980-05-30'),
  ('0003', 'Vladimir Putin', 188, 88, '1950-12-12'),
  ('0004', 'Jeff Bezos', 187, 87, '1940-03-04'),
  ('0005', 'Bernie Sanders', 186, 69, '1995-09-14');

CREATE TABLE Patient(
    id CHAR(36) UNIQUE, -- because of  ERROR:  there is no unique constraint matching given keys for referenced table "patient"
    mid CHAR(36) NOT NULL , 
    email VARCHAR(20),
    password VARCHAR(20),
    full_name VARCHAR(20),
    profile_picture_url VARCHAR(40),
    PRIMARY KEY(id, mid), 
    FOREIGN KEY(mid) REFERENCES Medical_History(id)
);
INSERT INTO Patient VALUES
  ('0001', '0001', 'roman@akhtariev.ca', 'MyTAIsTheBest', 'Roman Akhtariev', 'https://google.com/images/roman'),
  ('0002', '0002', 'james@bond.ca', 'triple0777', 'James Bond', 'https://google.com/images/bond'),
  ('0003', '0003', 'donald@trump.us', 'buildThatWall', 'Donald Trump', 'https://google.com/images/trump'),
  ('0004', '0004', 'bill@gates.com', 'microsoft', 'Bill', 'https://google.com/images/gates'),
  ('0005', '0005', 'jb@ubc.ca', 'Baaaby', 'Justin Bieber', 'https://google.com/images/bieber');
  
CREATE TABLE ClinicLocation (
postal_code CHAR(7) PRIMARY KEY, 
city VARCHAR(20));
INSERT INTO ClinicLocation VALUES('V6T 1Z4', 'Vancouver');
INSERT INTO ClinicLocation VALUES('V6T AB3', 'Richmond');
INSERT INTO ClinicLocation VALUES('V6T AB4', 'Burnaby');
INSERT INTO ClinicLocation VALUES('V6T AB5','Vancouver');
INSERT INTO ClinicLocation VALUES('V6T WA4','Vancouver');

CREATE TABLE Clinic (
id CHAR(36) PRIMARY KEY,
name VARCHAR(30), 
opening_time VARCHAR(10) ,
closing_time VARCHAR(10),
days_open VARCHAR(14),
postal_code CHAR(7),
FOREIGN KEY(postal_code) REFERENCES ClinicLocation(postal_code)
);

INSERT INTO Clinic VALUES('0001', 'ClinicA', '9:00', '18:00', 'Mon-Fri','V6T 1Z4'); 
INSERT INTO Clinic VALUES('0002', 'ClinicB', '8:00', '17:00', 'Mon-Fri','V6T AB3');
INSERT INTO Clinic VALUES('0003', 'ClinicC', '8:00', '17:00', 'Mon-Fri','V6T AB4');
INSERT INTO Clinic VALUES('0004', 'ClinicD', '8:00', '16:00', 'Mon-Fri','V6T AB5');
INSERT INTO Clinic VALUES('0005', 'ClinicE', '8:00', '15:00', 'Mon-Fri','V6T WA4');

CREATE TABLE Doctor(
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(36),
    password VARCHAR(36),
    full_name VARCHAR(36),
    profile_picture_url VARCHAR(40),
    bio VARCHAR(50),
    clinic_id CHAR(36) NOT NULL,
    FOREIGN KEY(clinic_id) REFERENCES CLINIC ON DELETE SET DEFAULT
);

INSERT INTO Doctor VALUES 
('1000', 'max.brown@gmail.com', 'maxbrown1000', 'Max Brown', 'https://google.com/images/maxbrown', '', '0001'),
('1001', 'alex.smith@gmail.com', 'alexsmith1001','Alex Smith', 'https://google.com/images/alexsmith', '', '0002'),
('1002', 'mary.davis@gmail.com', 'marydavis1002','Mary Davis', 'https://google.com/images/marydavis', '', '0003'),
('1003', 'eliza.jones@gmail.com', 'elizajones1003','Eliza Jones', 'https://google.com/images/elizajones', '', '0004'),
('1004', 'jane.miller@gmail.com', 'janemiller1004','Jane Miller', 'https://google.com/images/janemiller', '', '0005');

CREATE TABLE Rating(
    id CHAR(36) PRIMARY KEY,
    description VARCHAR(255),
    stars INTEGER,
    did CHAR(36) NOT NULL,
    FOREIGN KEY(did) REFERENCES Doctor(id) ON DELETE CASCADE
);

INSERT INTO Rating VALUES
('1000', 'Great', 5, '1000'),
('1001', 'Very good', 5, '1001'),
('1002', 'Good', 4, '1001'),
('1003', '', 1, '1001'),
('1004', 'Good', 4, '1003');

CREATE TABLE Specializes(
  name VARCHAR(30) DEFAULT 'Undetermined',
  did CHAR(36),
  years_of_experience INTEGER,
  PRIMARY KEY(name, did),
  FOREIGN KEY(name) REFERENCES Specialty(name),
  FOREIGN KEY(did) REFERENCES Doctor(id)
);

INSERT INTO Specializes VALUES ('Cardiology', '1000', 16);
INSERT INTO Specializes VALUES ('Neurology', '1001', 18);
INSERT INTO Specializes VALUES ('Pediatrics', '1002', 19);
INSERT INTO Specializes VALUES ('Dermatology', '1003', 18);
INSERT INTO Specializes VALUES ('Gynecology', '1004', 17);

CREATE TABLE Bill ( 
bill_id CHAR(36) PRIMARY KEY, 
amount INTEGER, 
overdue_charge INTEGER, 
created_date DATE, 
due_date DATE,
paid_date DATE,
clinic_id CHAR(36) NOT NULL, 
patient_id CHAR(36)  NOT NULL, 
FOREIGN KEY(clinic_id) REFERENCES Clinic(id),
FOREIGN KEY(patient_id) REFERENCES Patient(id)); 

INSERT INTO Bill VALUES
('0001', 250, 0, '2019-10-10', '2019-11-1', '2019-10-29', '0001', '0002'),
('0002', 300, 0, '2020-01-01', '2020-03-02', '2020-01-02', '0002', '0001'), 
('0003', 110, 0, '2019-10-10', '2019-11-1', '2019-10-27', '0003', '0003'), 
('0004', 112, 0, '2019-10-10', '2019-11-1', '2019-10-11', '0004', '0005'), 
('0005', 76, 10, '2020-03-01', '2020-03-05', '2020-03-06', '0005', '0004');

CREATE TABLE Allergies(
    name VARCHAR(30),
    mid CHAR(36), 
    date DATE,
    comments VARCHAR(255),
    PRIMARY KEY(name, date, mid), 
    FOREIGN KEY(mid) REFERENCES Medical_History(id) ON DELETE CASCADE);

INSERT INTO Allergies VALUES
  ('Hillary Clinton Allergy', '0003', '2010-11-15', 'May kill if gets out of hand'),
  ('Nasal Allergy', '0005', '2018-12-03', 'Difficulty breathing during congestion'),
  ('Pollen Allergy', '0005', '2005-03-09', 'Aggravates in spring'),
  ('Peanut Allergy', '0004', '2000-11-02', 'Becomes red when eats'),
  ('Asthma', '0001', '2020-05-03', 'Difficulty breathing at night');
  
CREATE TABLE Surgeries(
    name VARCHAR(30), 
    mid CHAR(36), 
    date DATE, 
    comments VARCHAR(255),
    PRIMARY KEY(name, date, mid),
    FOREIGN KEY (mid) REFERENCES Medical_History(id) ON DELETE CASCADE
); 

INSERT INTO Surgeries VALUES 
('Liver surgery', '0001', '2005-05-01', 'No side effects - surgery successful'),
('Kidney extraction', '0002', '2018-10-04', 'Successful'),
('Tumour extraction', '0003', '2020-05-08', 'Needs follow up'),
('Plastic surgery', '0005', '2004-05-10', 'Skin'),
('Plastic surgery', '0005', '2014-06-01','Lips');

CREATE TABLE Prescription (
    id CHAR(36) PRIMARY KEY,
    comments VARCHAR(256),
    did CHAR(36),
FOREIGN KEY(did) REFERENCES Doctor(id)
);

INSERT INTO Prescription VALUES
('2000', 'Take your medicine', '1000'),
('2001', 'Do Yoga', '1001'),
('2002', 'Take 10 days rest', '1003'),
('2003', 'Go to the gym', '1002'),
('2004', '14 days quarantine you have covid-19', '1004');


CREATE TABLE DoctorRoom(
  did CHAR(36) PRIMARY KEY,
  room_no VARCHAR(36)
);

INSERT INTO DoctorRoom VALUES
('1000', '234'),
('1001', '938'),
('1002', '123'), 
('1003', '032'),
('1004', '1111'); 

CREATE TABLE PrescriptionForAppointment(
did CHAR(36) NOT NULL, 
patient_id CHAR(36) NOT NULL,
date DATE, 
start_time TIMESTAMP, 
prescription_id CHAR(36), 
PRIMARY KEY(did, patient_id, date, start_time),
FOREIGN KEY(prescription_id) REFERENCES Prescription(id),
FOREIGN KEY(did) REFERENCES Doctor(id)
);

INSERT INTO PrescriptionForAppointment VALUES 
('1000', '0001', '2020-05-03', '2020-05-03 15:00', '2000'),
('1001', '0002', '2020-05-03', '2020-05-03 15:00', '2001'),
('1002', '0003', '2020-05-03', '2020-05-03 15:00', '2002'),
('1003', '0004', '2020-05-03', '2020-05-03 15:00', '2003'),
('1004', '0005', '2020-05-03', '2020-05-03 15:00', '2004');

CREATE TABLE Appointment(
  id CHAR(36) PRIMARY KEY,
  doctor_id CHAR(36),
  patient_id CHAR(36),
  start_time TIMESTAMP, 
  end_time TIMESTAMP,
  date Date,
  comments VARCHAR(255),
  FOREIGN KEY(doctor_id) REFERENCES DoctorRoom(did),
  FOREIGN KEY(doctor_id) REFERENCES Doctor(id),
  FOREIGN KEY(patient_id) REFERENCES Patient(id),
  FOREIGN KEY(doctor_id, patient_id, date, start_time) REFERENCES    PrescriptionForAppointment(did, patient_id, date, start_time)
);

INSERT INTO Appointment 
VALUES
('1000001', '1000', '0001', '2020-05-03 15:00', '2020-05-03 15:00', '2020-05-03', 'Urgent'),
('1000002', '1001', '0002', '2020-05-03 15:00', '2020-05-03 15:00', '2020-05-03', 'Picking up prescription'),
('1000003', '1002', '0003', '2020-05-03 15:00', '2020-05-03 15:00', '2020-05-03', 'STD found'), 
('1000004', '1003', '0004', '2020-05-03 15:00', '2020-05-03 15:00', '2020-05-03', 'Wants to remove kidney'),
('1000005', '1004', '0005', '2020-05-03 15:00', '2020-05-03 15:00', '2020-05-03', 'Super urgent'); 

CREATE TABLE Medicine (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(30),
    ingredients VARCHAR(255)
);

INSERT INTO Medicine VALUES ('9000', 'Ibuprofen', 'propionic acid'),
('9001', 'Aspirin', 'salicylate'),
('9002', 'Penicillin', 'penicillium mold'),
('9003', 'Insulin', 'insulin'),
('9004', 'Paracetamol', 'phenol');

CREATE TABLE PrescriptionConsistsOfMedicine (
    prescription_ID CHAR(36),
    medicine_ID CHAR(36),
    dosage INTEGER, 
    PRIMARY KEY(prescription_ID, medicine_ID),
    FOREIGN KEY(prescription_ID) REFERENCES Prescription(id) ON DELETE CASCADE,
    FOREIGN KEY(medicine_ID) REFERENCES Medicine(id));

INSERT INTO PrescriptionConsistsOfMedicine VALUES
('2000', '9000', 20),
('2001', '9001', 100),
('2002', '9002', 2000),
('2003', '9003', 90),
('2004', '9004', 25);
