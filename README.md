# Authors
- [Francisco Bernad](https://github.com/FrBernad)
- [Roberto Catalán](https://github.com/rcatalan98)
- [Joaquín Legammare](https://github.com/JoacoLega)

# Database Popualtion
1. Download **[Spotify HUGE database - daily charts over 3 years](https://www.kaggle.com/pepepython/spotify-huge-database-daily-charts-over-3-years?select=Final+database.csv)** dataset from Kaggle.
2. Extract both csv files inside datests/raw-data folder.
3. Run **csv_to_json_array.py** script inside the **population-scripts** folder to transform the csv data to json array. This will generate a file named **database.json**.
4. Run ```pip install neo4j``` to install the neo4j driver.
5. Install the apoc library to your neo4j instance.
5. Run **neo_import.py** script inside the **population-scripts** folder to populate Neo4J database. You ***MUST*** have a Neo4J instance running on localhost with the default port and no authorization.
6. Run ```mongoimport --db spotify --collection songs --type json --file population-scripts/database.json --jsonArray``` on your desired shell to populate MongoDB database. You ***MUST*** have a MongoDB instance running on localhost with the default port and no authorization.



