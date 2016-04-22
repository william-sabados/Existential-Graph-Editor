# Existential-Graph-Editor
Web-based EG editor.
GENERAL USAGE NOTES
--------------------
-This is a project done by Jason Thomas, Telly Polychroniades & DR.William Sabados
-SMAP 
-Semester Spring 2016
-----------------------------------------------------

Instructions for Creating project (Step by Step)
--------------------------------------------------------------

1. npm init
2. npm install express --save
3. npm install ejs --save
4. create server page:

var express = require('express');
var app = express();
var path = require('path');

var port = process.env.PORT;

app.set('view engine', 'ejs');
app.set('views' , path.resolve(__dirname,'DemoGUI', 'client', 'views'));

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/', function(req, res){
    res.render('index.ejs');
    
});

app.listen(port, function(){
    console.log('SERVER RUNNING... PORT: ' + port);
})

5.npm install -g bower
6. bower init
7. bower install angular --save
8. bower install bootstrap --save
bower install fabric --save
9. npm install -g bower-binstaller
10. set path in bower.jason file ("path": "DemoGUI/client/lib"):

{
  "name": "eg_editor",
  "description": "existential graph editor for SMAP",
  "main": "server.js",
  "authors": [
    "Jason Thomas"
  ],
  "license": "ISC",
  "homepage": "https://github.com/william-sabados/Existential-Graph-Editor",
  "dependencies": {
    "fabric.js": "fabric#^1.6.0",
    "angular": "^1.5.4",
    "bootstrap": "^3.3.6"
  },
  "install": {
    "path": "DemoGUI/client/lib"
  },
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ]
}

11.bower-installer
12.open bower_components folder and copy bootstrap icon files and bootstrap.css      
   file, paste into bootstrap folder (which is inside the client-->lib folder) 
13.delete bower_components folder
14.Note:If you use the bootstrapp.css, be sure to change the:

<!-- Bootstrap core CSS -->
<!--<link href="" rel=""> -->

Tag to the right path, folder, file....

================================================================================
