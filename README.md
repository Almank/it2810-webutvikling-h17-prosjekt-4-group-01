# Project 4 - Angular
### it2810-webutvikling-h17-prosjekt-4-group-01
Welcome to our repository! To read further about our project in detail, 
please visit our [**wiki**](https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-01/wiki/Project-4-Documentation)
which also serves as our documentation!

If you are evaluating the project, you might want to check out the
[**Evaluation section**](https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-01/wiki/Evalueringskriterie-rettet-dokumentasjon) of our wiki. 

**Authors of the projects:**
- Martin Lunde
- Christoffer Almankaas
- Petter Lohne
- Thayanan Tharmapalan
- Steffen Helgeland

### Running Website Locally <a name="Local"></a>
To run the website locally, you have to make sure you have the following dependencies
installed on your computer.
```
- Node 8.5 or newer
- MongoDB
```
Then you can proceed to cloning the project, and installing the dependencies inside
the `/website` folder using:  
`npm install`.

When all dependencies are finished downloading, you are ready to run the initial script
to fill your database with data from the omdbApi. (This requires that you have a [mongoDB](https://docs.mongodb.com/manual/installation/) running beforehand) All you have to do then, is to run 
the omdb-transfer script using:  
`node omdb-transfer.js`

Finally to make the website available locally, you have to build a distribution and 
serve it. Proceed with the following commands inside the `/website` folder.  
- `npm run build`
- `node server.js`

You may now visit your local website on `localhost:8084`.

### The Projects Tests
If you would like to run through the projects tests, you have to make sure that you have
installed all dependencies using `npm install` first.
To proceed running the tests, use the commands:
 - Front-end tests: `npm run-script test`
 - Back-end tests: `npm run-script test-backend`
 - End-to-End tests: `npm run-script e2e`
