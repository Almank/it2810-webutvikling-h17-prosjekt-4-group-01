# Project 4 - Angular
### it2810-webutvikling-h17-prosjekt-4-group-01
Welcome to our repository! To read further about our project in detail, 
please visit our [**wiki**](https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-01/wiki/Project-4---Wiki)  
The wiki also serves as [**documentation**](https://github.com/IT2810/it2810-webutvikling-h17-prosjekt-4-group-01/wiki/Project-4---Wiki)!

**Authors of the projects:**
- Martin Lunde
- Christoffer Almankaas
- Petter Lohne
- Thayanan Tharmapalan
- Steffen Helgeland

### Table of contents:
1. [Running Website Locally](#Local)
2. [The Projects Tests](#Tests)

### Running Website Locally <a name="Local"></a>
To run the website locally, you have to make sure you have the following dependencies
installed on your computer.
```
- Node 8.5 or newer
- MongoDB
```
Then you can proceed to cloning the project, and installing the dependencies inside
the `/website` folder using `npm install`.

When all dependencies are finished downloading, your ready to run the initial script
to fill your database with data from the omdbApi. All you have to do, is to run 
the `omdb-transfer.js` script using `node`.

Finally to make the website available locally, you have to build a distribution and 
serve it. Proceed with the following commands inside the `/website` folder.  
- `ng build`
- `node server.js`

You may now visit your local website on `localhost:8084`.

### The Projects Tests <a name="Tests"></a>

If you would like to run through the projects tests, you have to make sure that you have
installed all dependencies using `npm install` first.

To proceed running the tests, use the command: `npm test`  
Karma will now launch the testing environment, and you have to wait a couple of seconds
until the browser opens and runs the tests.  

After all tests have completed, you will have a nice overview over all the tests ran, including
descriptive information if any of the tests fail to success.

#### Test Structure

The testing environment consists of the packages `Jasmine` and `Karma`.
These ensure that we have a structured environment, and can easily write more tests underway
the project.  

All test files are located in the `/src` folder, and have the file ending `.spec.ts`.  
You may think that the tests are scattered around the repository, but in good old fashioned
angular style, they are not. They are actually bundled together with its parent component, such
that you always will know where to find the bug/error that broke the test upon failure.

Current test files and their location:
```
- api.component.spec.ts           (/src)
- app.component.spec.ts           (/src/app)
- auth.component.spec.ts          (/src/app/auth)
- header.component.spec.ts        (/src/app/header)
- movie-details.component.spec.ts (/src/app/movie-view/movie-details)
- movie-list.component.spec.ts    (/src/app/movie-view/movie-list)
- profile.component.spec.ts       (/src/app/profile)
- search-bar.component.spec.ts    (/src/app/search-bar)
```
