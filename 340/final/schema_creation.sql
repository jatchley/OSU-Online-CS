-- CREATE TABLES
DROP TABLE IF EXISTS `Invoice`;
DROP TABLE IF EXISTS `Aircraft`;
DROP TABLE IF EXISTS `AircraftModel`;
DROP TABLE IF EXISTS `Operator`;
DROP TABLE IF EXISTS `AirportFeeRule`;
DROP TABLE IF EXISTS `FeeRule`;
DROP TABLE IF EXISTS `Airport`;

CREATE TABLE Airport (
  Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  AirportCode VARCHAR(4) UNIQUE NOT NULL,
  FullName VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Operator (
  Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  FirstName VARCHAR(255) NOT NULL,
  LastName VARCHAR(255) NOT NULL,
  UNIQUE KEY FullName (FirstName, LastName)
);

CREATE TABLE AircraftModel (
  Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  ModelCode VARCHAR(10) UNIQUE NOT NULL,
  LandingWeight INT NOT NULL,
  TakeoffWeight INT NOT NULL
);

CREATE TABLE Aircraft (
  Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  TailNumber VARCHAR(10) UNIQUE NOT NULL,
  ModelId INT,
  OperatorId INT,
  CONSTRAINT `fk_aircraft_aircraftmodel_id` FOREIGN KEY (ModelId) REFERENCES AircraftModel (Id),
  CONSTRAINT `fk_aircraft_operator_id` FOREIGN KEY (OperatorId) REFERENCES Operator (Id)
);

CREATE TABLE Invoice (
  Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  InvoiceDate DATE NOT NULL,
  Amount NUMERIC(15,2) NOT NULL,
  OperatorId INT,
  AirportId INT,
  CONSTRAINT `fk_invoice_operator_id` FOREIGN KEY (OperatorId) REFERENCES Operator (Id),
  CONSTRAINT `fk_invoice_airport_id` FOREIGN KEY (AirportId) REFERENCES Airport (Id),
  UNIQUE KEY OperatorAirportDate (OperatorId, AirportId, InvoiceDate)
);

CREATE TABLE FeeRule (
  Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Name VARCHAR(255) UNIQUE NOT NULL,
  Price NUMERIC(15,2) NOT NULL
);

CREATE TABLE AirportFeeRule (
  AirportId INT,
  FeeRuleId INT,  
  CONSTRAINT `fk_airportfeerule_airport_id` FOREIGN KEY (AirportId) references Airport (Id),
  CONSTRAINT `fk_airportfeerule_feerule_id` FOREIGN KEY (FeeRuleId) REFERENCES FeeRule (Id)
);

-- INITIAL RECORDS
insert into Airport 
(
	AirportCode, 
	FullName
) 
VALUES 
(
	'KTRK',
    'Truckee-Tahoe Airport'
),
(
	'KDAL',
    'Dallas Love Field Airport'
),
(
	'KIAD',
    'Washington Dulles International Airport'
);


insert into Operator 
(
	FirstName, 
	LastName
) 
VALUES 
(
	'Sean',
    'Ford'
),
(
	'Harrison',
    'Connery'
),
(
	'George',
    'Spielberg'
),
(
	'Steven',
    'Lucas'
);

insert into AircraftModel 
(
	ModelCode,
    LandingWeight,
    TakeoffWeight
)
VALUES
(
	'C150',
    5000,
    6000
),
(
	'F500',
    10000,
    10000
),
(
	'D340',
    25000,
    25500
),
(
	'AC500',
    1000,
    1100
),
(
	'SKS20',
    7500,
    7800
);

INSERT INTO Aircraft
(
	TailNumber,
    ModelId,
    OperatorId
)
VALUES 
(
	'N8540K',
    (select Id from AircraftModel where ModelCode = 'C150'),
    (select Id from Operator where FirstName = 'Sean')
),
(
	'N98505',
    (select Id from AircraftModel where ModelCode = 'C150'),
    (select Id from Operator where FirstName = 'Harrison')
),
(
	'N4512J',
    (select Id from AircraftModel where ModelCode = 'SKS20'),
    (select Id from Operator where FirstName = 'Sean')
),
(
	'N67404',
    (select Id from AircraftModel where ModelCode = 'F500'),
    (select Id from Operator where FirstName = 'George')
),
(
	'N998HU',
    (select Id from AircraftModel where ModelCode = 'AC500'),
    (select Id from Operator where FirstName = 'Steven')
),
(
	'N7954Y',
    (select Id from AircraftModel where ModelCode = 'C150'),
    (select Id from Operator where FirstName = 'Steven')
),
(
	'N74QW4',
    (select Id from AircraftModel where ModelCode = 'D340'),
    (select Id from Operator where FirstName = 'Harrison')
);

INSERT INTO Invoice
(
	InvoiceDate,
    Amount,
    OperatorId,
    AirportId
)
VALUES
(
	'2017-05-01',
    20.00,
    (select Id from Operator where FirstName = 'Steven'),
    (select Id from Airport where AirportCode = 'KTRK')
),
(
	'2017-05-01',
    40.00,
    (select Id from Operator where FirstName = 'George'),
    (select Id from Airport where AirportCode = 'KTRK')
),
(
	'2017-03-01',
    100.00,
    (select Id from Operator where FirstName = 'Steven'),
    (select Id from Airport where AirportCode = 'KIAD')
),
(
	'2017-01-01',
    60.00,
    (select Id from Operator where FirstName = 'Harrison'),
    (select Id from Airport where AirportCode = 'KDAL')
);

insert into FeeRule 
(
	Name,
    Price
)
VALUES
(
	'Landing Weight Over 5000 lbs',
    20.00
),
(
	'Landing Weight Over 10000 lbs',
    50.00
),
(
	'Landing Weight Over 20000 lbs',
    100.00
);

insert into AirportFeeRule 
(
	AirportId,
    FeeRuleId
)
VALUES
(
	(select Id from Airport where AirportCode = 'KDAL'),
	(select Id from FeeRule where Name = 'Landing Weight Over 5000 lbs')
),
(
	(select Id from Airport where AirportCode = 'KDAL'),
	(select Id from FeeRule where Name = 'Landing Weight Over 10000 lbs')
),
(
	(select Id from Airport where AirportCode = 'KDAL'),
	(select Id from FeeRule where Name = 'Landing Weight Over 20000 lbs')
),
(
	(select Id from Airport where AirportCode = 'KTRK'),
	(select Id from FeeRule where Name = 'Landing Weight Over 10000 lbs')
),
(
	(select Id from Airport where AirportCode = 'KIAD'),
	(select Id from FeeRule where Name = 'Landing Weight Over 20000 lbs')
);