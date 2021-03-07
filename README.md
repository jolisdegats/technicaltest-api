<h1>Technical test</h1>
<br/>


<h3>Install the project</h3>
Clone this repository :
<code>git clone https://github.com/jolisdegats/technicaltest-api</code>

Run <code>npm install</code> to install dependencies

Add a .env file in the root folder with the following info :
<code>PORT=5000
NODE_ENV=development
MONGODB_URI="mongodb://localhost/technicaltest"
</code>

To start the project, run <code>npm run start</code>
Default port is 5000.

To launch the tests, run <code>npm run test</code>

<br/>
<h3>Routes</h3>

<h4>Stations</h4>

<code>POST /station/create</code><br/>
Create a new station.<br/>
Requires an object : {name : "xxxx"}<br/>
(name is required and must be > 3 characters)<br/>

<code>GET /stations</code><br/>
Get all stattions<br/>

<code>GET /station/:id</code><br/>
Get one station by its id<br/>

<code>POST /station</code><br/>
Update a station<br/>
Requires an object {id : ObjectId, name : "xxxNewName"}<br/>
(id and name are required. Else will return 400 error "Missing parameter")<br/>

<code>DELETE /station/delete</code><br/>
Delete a station<br/>
Requires an object {station_id : ObjectId}<br/>
Also replace "station" key for all cars in this station to null<br/>

<br/>
<h4>Cars</h4>

<code>POST /car/create</code><br/>
Create a new car<br/>
Requires an object : {name : "xxxx", "station" : ObjectId, available : bool}<br/>
(name is required and must be > 3 characters. Default values for station and available are null and false)<br/>

<code>GET /cars</code><br/>
Get all cars<br/>

<code>GET /car/:id</code><br/>
Get car by its id<br/>

<code>POST /car</code><br/>
Update a car<br/>
Requires an object : {id : ObjectId, name : "xxxx", station_id : ObjectId, available : bool}<br/>
(id is required. Else will return 400 error "Missing parameter")<br/>

<code>DELETE /car/delete</code><br/>
Delete a car<br/>
Require an object : {car_id : ObjectId}<br/>
Also remove car from station<br/>

<br/>
<h4>Issues I spotted with my code so far and various comments:</h4>
<li>* Delete route for car does not check if station exists. Should have a if(station) after looking for station.</li>
<li>* Update car route does not save car in the new station and does not remove it from previous station. Should have added push and pull actions on cars arrays.</li>
<li>* On test env connects to two database (local and local-test). Should have added a if/else for NODE_ENV === "test" + create blank database with dummy data. Couldn't create Update and Delete routes tests as I couldn't get the ObjectIds of elements in the db.</li>
<li>* Inconsistencies in my variables names (sometimes called station_id or car_id or just id).</li>
<li>* Wish I would have more experience with tests. I feel like I lost way too much much time on them.</li>
<li>* Forgot to add this "routes index" in my README.md before sending the test. I thought it could help you navigate more easily through my project though so I added it afterwards!</li>
