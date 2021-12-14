import csv

from song_utils import Song

input_CSV = open("../raw-data/Final database.csv", 'r', encoding="UTF-8")

output_json_array = open("database.json", "w", encoding="UTF-8")

songs: Song = {}

try:
    reader = csv.DictReader(input_CSV, delimiter=',')
    for row in reader:
        title = row["Title"]
        country = row["Country"]
        uri = row["Uri"]
        popularity = len(row["Popularity"])
        artists = row["Artist"].split(" - ")
        artist = artists[0]
        co_artists = []
        if len(artists) > 1:
            co_artists = artists[1:]
        genre = row["Genre"]
        artist_followers = row["Artist_followers"]
        album = row["Album"]
        tempo = row["tempo"]
        release_date = row["Release_date"]

        song = songs.get(title)
        if song:
            song.add_country(country)
            song.popularity += popularity
        else:
            songs[title] = Song(title, uri, popularity, artist,
                                co_artists, genre, artist_followers,
                                release_date, tempo, album)
finally:

    input_CSV.close()
    json_array = f'[{",".join(list(map(lambda s: s.__str__(), songs.values())))}]'
    output_json_array.write(json_array)
    output_json_array.close()
