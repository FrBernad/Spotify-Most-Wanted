![alt spotify logo](frontend/src/assets/images/spotify-most-wanted-logo.png)

## Authors
- [Francisco Bernad](https://github.com/FrBernad)
- [Roberto Catalán](https://github.com/rcatalan98)
- [Joaquín Legammare](https://github.com/JLegammare)

## What is Spotify Most Wanted?
**Spotify Most Wanted** is a project based on a ***huge Spotify database*** which contains all the songs in 
Spotify's Daily Top 200 charts in 35+1 (global) countries around the world for a period of over 3 years (2017-2020).
The idea behind the project is to showcase the most wanted ***songs***, ***albums*** and ***artists*** of the last 
three years. The project exposes an ***API*** based on ***Express.js***, and a frontend to visualize the information built on ***Angular***.
It makes use of two different databases: ***Neo4J*** and ***MongoDB***, and takes advantage of each one for optimal queries.
You can have a preview of the project [here](http://spotifymostwanted.herokuapp.com/).

## What can you do?
There are two ways of using the application:
1. Consume the ***Express API*** directly via your preferred way (the ***API docs*** can be found on the */api/docs* path).
2. Use the ***Angular*** project we provide to ***visualize*** and ***query*** information.

### MongoDB
Our ***MongoDB*** database exposes the following functionalities:
1. Search Spotify's most popular ***songs*** from the Top 200 daily chart of the last three years filtering by:
    - Artist.
    - Genre.
    - Country.

2. Search Spotify's most popular ***albums*** from the Top 200 daily chart of the last three years filtering by:
    - Artist.
    - Genre.
    - Country.

3. Search Spotify's most popular ***artists*** of the last three years filtering by:
    - Genre.
    - Country.

### Neo4J
Pass in an artist and discover the ***collaborations*** he has made in the last three years. 
Visualize the information with a ***graph*** via our ***Angular*** application.

## Local Execution Steps

### Database Popualtion
1. Download **[Spotify HUGE database - daily charts over 3 years](https://www.kaggle.com/pepepython/spotify-huge-database-daily-charts-over-3-years?select=Final+database.csv)** dataset from Kaggle.
2. Extract both csv files inside **datests/raw-data** folder.
3. Run **csv_to_json_array.py** script inside the **population-scripts** folder to transform the csv data to json array. This will generate a file named **database.json**.
4. Run ```pip install neo4j``` to install the neo4j driver.
5. Install the **[apoc library](https://neo4j.com/labs/apoc/4.1/installation/)** in your neo4j instance.
5. Run ```python3 neo_import.py dev``` inside the **population-scripts** folder to populate Neo4J database. Wait until the script end up running. You ***MUST*** have a Neo4J instance running on localhost with the default port and no authorization.
6. Run ```mongoimport --db spotify --collection songs --type json --file population-scripts/database.json --jsonArray``` on your desired shell to populate MongoDB database. You ***MUST*** have a MongoDB instance running on localhost with the default port and no authorization.

### Project Execution
1. Run ```npm install``` inside the *backend* and *frontend* folders.
2. Start the backend by running ```npm run dev``` in the backend directory. This will start the ***Express*** server 
on *http://localhost:3000*.
3. Start the front end by running ```ng serve``` in the frontend directory. This will start the ***Angular*** application on *http://localhost:4200*.

