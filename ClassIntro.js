// Time to write your first JavaScript for Earth Engine
// One of the ways to comment out code is by putting two forward slashes //


print('Hello World!');

//Basic JavaScript data types

//Strings
//Using variables to store objects and primitives helps code readability. 
//For example, a variable that stores a string object is defined by single ' or double "

// Use single (or double) quotes to make a string.
var AgroModel = 'GEE Lecture';
// Use parentheses to pass arguments to functions.
print(AgroModel);

//Numbers
// Store a number in a variable.
var LectureNumber = 1;

print(AgroModel+':'+ LectureNumber);

//Lists
//Define lists with square brackets []. A list of numbers, for example:
// Use square brackets [] to make a list.

var listOfClass = [1, 6, 15, 22, 30];
print('Class Dates:', listOfClass);

//Objects
//Objects in JavaScript are dictionaries of key: value pairs
//Make an object (or dictionary) using curly brackets {}

var student = {
  name: 'Sid',
  Age: 20,
  Reseach: ['GIS', 'Climate Change', 'Remote Sensing']
};


print('Dictionary:', student);
// Access dictionary items using square brackets.
print('Print name:', student['name']);
// Access dictionary items using dot notation.
print('Print Research:', student.Research);

//Functions
//Functions are another way to improve code readability and reusability by grouping sets of operations
//Define a function with the function keyword
//Function names start with a letter and have a pair of parentheses at the end. 
//Functions often take parameters which tell the function what to do. 
//These parameters go inside the parentheses (). The set of statements making up the function go inside curly brackets.
//The return keyword indicates what the function output is

var myFunction = function(parameter1, parameter2, parameter3) {
  statement;
  statement;
  statement;
  return statement;
};

// The reflect function takes a single parameter: element.
var reflect = function(element) {
  // Return the argument.
  return element;
};
print('Class will not end', reflect('After This'));

//built-in Earth Engine functions
var aString = ee.Algorithms.String(42);

print(aString)

//////// Checkpoint 1


//Lets put JavaScript objects and primitives into Earth Engine containers for sending to the server and processing at Google

//Earth Engine Objects

//Strings
//For example, define a string, then put it into the ee.String() container to be sent to Earth Engine:
// Define a string, then put it into an EE container.

var aString = 'To the cloud!';
var eeString = ee.String(aString);
print('Where to?', eeString);

// Define a string that exists on the server.
var serverString = ee.String('This is on the server.');
print('String on the server:', serverString);

//Numbers
//Use ee.Number() to create number objects on the server
// Define a number that exists on the server.
var serverNumber = ee.Number(Math.E);
print('e=', serverNumber);

//Methods on Earth Engine objects
//created an Earth Engine object, you have to use Earth Engine methods to process it

// Use a built-in function to perform an operation on the number.
var logE = serverNumber.log();
print('log(e)=', logE);

//List
// Make a sequence the easy way!
var Lecture = ee.List.sequence(1,14);
print('Date:', Lecture);


//Since the ee.List objects only exist on the server, 
//use Earth Engine provided functions to interact with them. 
//For example, to get something out of the list, use the get() method of the ee.List object:

// Use a method on an ee.List to extract a value.
var value = Lecture.get(5);
print('Date of 6 class:', value);

//Creating Vizsualization parameter
var vis = {
  min: 0,
  max: 0.10,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

print(vis.max)

//Date
// Define a date in Earth Engine.
var date = ee.Date('2015-12-31');
print('Date:', date);

// Get the current time using the JavaScript Date.now() method.
var now = Date.now();
print('Milliseconds since January 1, 1970', now);

// Initialize an ee.Date object.
var eeNow = ee.Date(now);
print('Now:', eeNow);


/////// Checkpoint 2