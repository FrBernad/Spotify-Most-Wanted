from datetime import datetime


class Song:
    def __init__(self, title, uri, popularity, artist, co_artists, genre, artist_followers, release_date, tempo, album):
        self.popularity = popularity
        self.artist = artist
        self.co_artists = co_artists
        self.genre = genre
        self.artist_followers = artist_followers if \
            len(artist_followers) & artist_followers.replace('.', '', 1).isdigit() > 0 \
            else 0

        try:
            self.release_date = datetime.strptime(release_date, '%d/%m/%Y')
        except ValueError:
            try:
                self.release_date = datetime.strptime(release_date, '%Y')
            except ValueError:
                try:
                    self.release_date = datetime.strptime(release_date, '%Y-%m')
                except ValueError:
                    try:
                        self.release_date = datetime.strptime(release_date, '%Y-%m-%d')
                    except ValueError:
                        self.release_date = datetime.strptime("1999-11-24", '%Y-%m-%d')

        self.release_date = self.release_date.isoformat()

        if tempo.replace('.', '', 1).isdigit():
            self.tempo = tempo
        else:
            self.tempo = 0
        self.uri = uri
        self.album = album
        self.title = title
        self.countries = set()

    def add_country(self, country):
        self.countries.add(country)

    def __eq__(self, other):
        return isinstance(other, Song) and self.title == other.title

    def __hash__(self):
        return hash(self.title)

    def __str__(self):
        d_backslash = "\\\\"
        backslash = "\\"
        return f"""
                {{
                "title": "{self.title.replace('"', "'")}",
                "uri": "{self.uri}",
                "popularity": {self.popularity},
                "artist": "{self.artist.replace(backslash, d_backslash).replace("'", "").replace('"', "")}",
                "artist_followers": {self.artist_followers},
                "co_artists": {list(map(lambda a: a.replace("'", "")
                                        .replace('"', ""), self.co_artists))
            .__str__().replace(backslash, d_backslash).replace("'", '"')}, 
                "genre": "{self.genre}",
                "countries": {list(map(lambda a: a.replace("'", ""), self.countries)).__str__().replace("'", '"')},
                "album": "{self.album.replace('"', "'")}",
                "release_date": {{"$date":"{self.release_date}Z"}},
                "tempo": {self.tempo}
                }}
            """
