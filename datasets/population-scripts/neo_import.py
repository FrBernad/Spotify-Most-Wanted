import json
import sys
import os

from neo4j import GraphDatabase


class NeoController:

    def __init__(self, uri, user, password):

        if user == "":
            self.driver = GraphDatabase.driver(uri)
        else:
            self.driver = GraphDatabase.driver(uri, auth=(user, password))

        with self.driver.session() as session:
            session.write_transaction(self._flush_db)

    def close(self):
        self.driver.close()

    def parse_song(self, song):
        with self.driver.session() as session:
            session.write_transaction(self._create_song_node, song)
            session.write_transaction(self._create_artists_nodes, song)

    @staticmethod
    def _flush_db(tx):
        tx.run("MATCH (n) "
               "DETACH DELETE n ")

    @staticmethod
    def _create_song_node(tx, song):
        tx.run("MERGE (song:Song "
               "{title: $title, url: $url, "
               "genre: $genre, popularity:$popularity,"
               "album: $album, release_date: datetime($release_date)})",
               title=song["title"], url=song["uri"],
               genre=song["genre"], popularity=song["popularity"],
               album=song["album"], release_date=song["release_date"]["$date"]
               )

    @staticmethod
    def _create_artists_nodes(tx, song):
        title = song["title"]
        artist = song["artist"]
        co_artists = song["co_artists"]

        followers = song["artist_followers"]

        tx.run("MATCH (song:Song {title: $title}) "
               "MERGE (artist:Artist {name: $name}) "
               "ON CREATE "
               "SET artist.followers = $followers "
               "FOREACH (i in CASE WHEN artist.followers = 0 THEN [1] ELSE [] END | "
               "SET artist.followers = $followers) "
               "MERGE (artist)-[r:MAIN_ARTIST]->(song) "
               , title=title, name=artist, followers=followers)

        for co_artist in co_artists:
            tx.run("MATCH (song:Song {title: $title}) "
                   "MERGE (artist:Artist {name: $name}) "
                   "ON CREATE "
                   "SET artist.followers = $followers "
                   "MERGE (artist)-[r:CO_ARTIST]->(song)", title=title, name=co_artist, followers=0)


if __name__ == "__main__":

    with open("./database.json", 'r', encoding="ISO-8859-1") as input_json:

        mode = sys.argv[1]

        if mode == "prod":
            user = os.environ['NEO4J_DATABASE_USER']
            password = os.environ['NEO4J_DATABASE_PASSWORD']
            uri = os.environ['NEO4J_URI']
            controller = NeoController(uri, user, password)
        elif mode == "dev":
            controller = NeoController("bolt://localhost:7687", "", "")
        else:
            print("Invalid mode")
            exit(0)

        json_array = json.load(input_json)

        count = 0

        for item in json_array:
            controller.parse_song(item)
            count = count + 1
            if count % 1000 == 0:
                print("imported %d items" % count)

        controller.close()
