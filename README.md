# Project 4 - Angular
####it2810-webutvikling-h17-prosjekt-4-group-01
As project 4 is based around angular and a decent back-end, 
we decided that we wanted to work realistic data, 
and therefore we made a website about movies.
Authors of the projects: 
- Martin Lunde
- Christoffer Almankaas
- Petter Lohne
- Thayanan Tharmapalan
- Steffen Helgeland

### Table of contents:
1. [about](#About) 
2. [file structure](#FileStructure)
3. [setup](#Setup)

### About <a name="About"></a>

This web application is built with using the ["mean"](http://mean.io) stack, 
which means that we have evolved our product around **MongoDB**, **Express**, 
**Angular** and **NodeJS**.  
- MongoDB:  
    Serves as our database, and lives hand in hand with the plugin _mongoose_, 
    which enables us to use schemas and models to structure our database in a good 
    practise manner.
- Express:  
    Serves as our production server, serving our build and assets. In addition,
    the express service is in charge of serving our api that connects our front-end to
    our back-end. This is done through a RESTapi using the express.Router library.
- Angular:  
    Angular on the other hand, is the client sides worker, pushing and receiving requests
    to and from our api connecting to the database. We have chosen to use the
    _Angular-cli_ package to start off our repository, as it contains all the necessary
    tools to get a project going professionally with _TypeScript_.
- NodeJS:  
    Node's task is to handle our server side javascript, such that it does not need to
    be ran in a browser. This is perfect considering our heavy use of this language in
    the api and our scripts for fetching data from third-party api's. Node is also the 
    cornerstone for handling our test environment in _Karma-Jasmine_.