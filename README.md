# Project 4 - Angular
###it2810-webutvikling-h17-prosjekt-4-group-01
As project 4 is based around angular and a decent back-end, 
we decided that we wanted to work with realistic data, 
and therefore made a website about movies.  

**Authors of the projects:**
- Martin Lunde
- Christoffer Almankaas
- Petter Lohne
- Thayanan Tharmapalan
- Steffen Helgeland

### Table of contents:
1. [About](#About) 
2. [Goal](#Goal)
3. [Project Structure](#ProjectStructure)
4. [Dependencies](#Dependencies)
5. [Data Structure](#DataStructure)


### About <a name="About"></a>

This web application is built using the ["mean"](http://mean.io) stack, 
which means that we have evolved our product around **MongoDB**, **Express**, 
**Angular** and **NodeJS**.  
- MongoDB:  
    Serves as our database, and lives hand in hand with the plugin _mongoose_, 
    which enables us to use schemas and models to structure our database in a good 
    practice manner.  
    The data stored here consist of easily manipulable json objects that we have 
    downloaded through the _omdb_ api for movies. We have then filtered all the
    information we wanted through the _omdb-transfer.js_ script, and loaded those
    chosen movies into our database. A full list of movie titles can be found in the
    mentioned file.
- Express:  
    Serves as our production server, serving our build and assets. In addition,
    the express service is in charge of serving our api that connects our front-end to
    our back-end. This is done through a RESTapi using the express.Router library.
- Angular:  
    Angular on the other hand, is the client sides worker, pushing and receiving requests
    to and from our api connecting to the database. We have chosen to use the
    _Angular-cli_ package to start off our repository, as it contains all the necessary
    tools needed to get a project going professionally with _TypeScript_.
- NodeJS:  
    Node's task is to handle our server side javascript, such that it does not need to
    be ran in a browser. This is perfect considering our heavy use of this language in
    the api and our scripts for fetching data from third-party api's. Node is also the 
    cornerstone for handling our test environment in _Karma-Jasmine_.
    
### Our Goal <a name="Goal"></a>
The goal of our project is first and foremost to satisfy all the given requirements, 
and beyond. We want to be able to apply the mean stack in a good manner, and program a 
steady but dynamic and appealing front-end in addition to flexible and secure back-end.  
The plan is to implement a mongo database of movies and users with an express/node API
connecting us to the front-end requesting and pushing data.

On the angular client side, we want to create a main page with a visually appealing data
model, in addition to a search and filterable list of content, and a "my page"
containg all of your latest search history and other statistics. 
    
### Project Structure <a name="ProjectStructure"></a>

- `./` - The root of our repository is just there to keep our repository name equal it. 
It also contains our Readme and .gitignore.
- `/website` - Contains our src folder and all supporting configurations etc.
    - `e2e` - Contains our end-to-end tests.
    - `src` - the home of our source code. (and some typescript configs)
        - `app` - the angular components building our page  
        - `assets` - all of our assets
        - `environments` - development and production environment variables for
        building the distribution.
        
### Dependencies <a name="Dependencies"></a>


### Data Structure <a name="DataStructure"></a>
As mentioned earlier, our data consists of two types of models created through mongoose schemas.
These are the _User_model_ and the _Movie_model_, which ensures us that all data is stored,
validated correctly and easily accessible.

The User_model also has extra security on the backend side, hashing all passwords through the 
dependency _bcrypt_, such that all passwords are stored as
encrypted strings.

All user indentities are also protected using JasonWebTokens such that communication towards
the api's critical user data is secure in case of data requests from unkown clients.

User_model:  
```
{
    _id:           {type: String},
    username:      {type: String, required: true},
    password:      {type: String, required: true},
    searchHistory: {type: Array,  default: []},
    favorites:     {type: Array,  default: []}
}
```

Movie_model:
```
{ 
  title:    {type: String, default: "undefined"},
  year:     {type: Number, default: 0},
  runtime:  {type: String, default: 'undefined'},
  genre:    {type: Array,  default: 'undefined'},
  director: {type: Array,  default: 'undefined'},
  actors:   {type: Array,  default: 'undefined'},
  plot:     {type: String, default: 'undefined'},
  poster:   {type: String, default: 'undefined'},
  readMore: {type: String, default: "undefined"},
}
```

<!-- 
Gruppene legger ut dokumentasjon/beskrivelse/skisse av det systemet de planlegger 
å implementere innen 8/11 på GitHub repositoriet for prosjekt 4.  
Beskriv applikasjonen, data, database, moduler og komponenter dere vurderer å bruke 
- og den overordnede arkitetkuren til systemet. 
Dere kan også beskrive elementer dere ikke helt vet hvordan skal løses. 
     
Vi har ikke noe formelt krav til omfanget av dette, 
men det skal være nok til å vise at dere har lest oppgaveteksten, 
har tenkt igjennom hvordan dere vil løse oppgaven og/eller identifisert utfordringer 
som dere må jobbe med. 
1 side med tekst og tegninger bør holde for de fleste.
-->    