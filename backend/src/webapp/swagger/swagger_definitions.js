//TAGS
/**
 * @swagger
 *
 *  tags:
 *      name: Artists
 *      description: The artist managing API
 *
 */
/**
 * @swagger
 *
 *  tags:
 *      name: Albums
 *      description: The albums managing API
 */
/**
 * @swagger
 *
 *  tags:
 *      name: Songs
 *      description: The songs managing API
 */

/**
 * @swagger
 *
 *  tags:
 *      name: Countries
 *      description: The countries managing API
 */

//COMPONENTS
/**
 * @swagger
 * components:
 *  schemas:
 *      Song:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description: identifier id of the song
 *              title:
 *                  type: string
 *                  description: title of the song
 *              uri:
 *                  type: string
 *                  description: Url of the song in Spotify
 *              popularity:
 *                  type: number
 *                  description: The popularity score calculated taking into account both the number of days a song stayed in the Top200 and the position it stayed in every day, weighting more the top positions
 *              artist:
 *                  type: string
 *                  description: Name of the songs' artist
 *              artist_followers:
 *                  type: integer
 *                  description: The number of followers the artist has on Spotify on the 5th of November 2020
 *              co_artists:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: The name of artists that collaborated in the composition of the song
 *              genre:
 *                  type: string
 *                  description: The predominant genre of an artist according to Spotify’s classification
 *              countries:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: Countries where the song made into Top 200 chart. Global and 34 countries where Spotify operates
 *              album:
 *                  type: string
 *                  description: Whether the song was published as a single or as part of an album or compilation
 *              release_date:
 *                  type: string
 *                  description: Date on which the song was published
 *              tempo:
 *                  type: number
 *          example:
 *                  _id: "61b79f6aa019f5e2ff44c085"
 *                  title: "family"
 *                  uri: "https://open.spotify.com/track/3TKpJrY9q49Mj1JOsM9zGL"
 *                  popularity: 12312312
 *                  artist: "The Chainsmokers"
 *                  artist_followers: 0
 *                  co_artists: ["Kygo"]
 *                  genre: "dance pop"
 *                  countries: ["USA","UK","Austria"]
 *                  album: "World War Joy"
 *                  release_date: "2019-12-06T00:00:00.000Z"
 *                  tempo: 117.817
 *
 *
 */
/**
 * @swagger
 * components:
 *  schemas:
 *      AlbumSong:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: title of the song
 *              popularity:
 *                  type: number
 *                  description: The popularity score calculated taking into account both the number of days a song stayed in the Top200 and the position it stayed in every day, weighting more the top positions
 *              uri:
 *                  type: string
 *                  description: Url of the song in Spotify
 *              artists:
 *                  type: array
 *                  items:
 *                      type: string
 *                  description: artists that collaborated in the song
 *          example:
 *              title: "outta time"
 *              popularity: 8898998
 *              uri: "https://open.spotify.com/track/4SCnCPOUOUXUmCX2uHb3r7"
 *              artists: ["Bryson Tiller","Drake"]
 *
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Album:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: name of the album
 *                  example: "More Life"
 *              author:
 *                  type: string
 *                  description: the name of the artist who published the album
 *                  example: "Drake"
 *              popularity:
 *                  type: integer
 *                  description: the popularity of the artist who published the album
 *                  example: 19828829839
 *              songs:
 *                  type: array
 *                  description: songs of the album that get into the Top 200 charts.
 *                  items:
 *                      $ref: '#/components/schemas/AlbumSong'
 *
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Artist:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: name of the artist
 *                  example: "The Chainsmokers"
 *              popularity:
 *                  type: integer
 *                  description: the popularity of the artist
 *                  example: 181986198282
 *
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Genre:
 *          type: object
 *          properties:
 *              genre:
 *                  type: string
 *                  description: genre name
 *                  example: "dance pop"
 *              amount:
 *                  type: integer
 *                  description: the amount of songs of the gender that get into the Top 200 charts
 *                  example: 27
 *
 */
//ENDPOINTS
/**
 * @swagger
 * /artists:
 *   get:
 *     summary: Returns a list of most popular artists
 *     tags: [Artists]
 *     parameters:
 *        - name: genre
 *          in: query
 *          description: genre of the artist
 *          schema:
 *              type: string
 *              example: dance pop
 *        - name: country
 *          in: query
 *          description: country where the artist hit Top 200 chart.
 *          schema:
 *              type: string
 *              example: USA
 *        - name: page
 *          in: query
 *          description: number of page
 *          schema:
 *              type: integer
 *              example: 0
 *        - name: itemsPerPage
 *          in: query
 *          description: items per page number
 *          schema:
 *              type: integer
 *              example: 10
 *     responses:
 *      '200':
 *          description: Returns the list of most popular artists from spotify between 2018 and 2020.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Artist'
 */
/**
 * @swagger
 * /artists/relations:
 *   get:
 *     summary: Returns the nodes and relations of the requested artist. Simulating a Neo4j graph.
 *     tags: [Artists]
 *     parameters:
 *        - name: artist
 *          in: query
 *          description: name of the artist
 *          required: true
 *          schema:
 *              type: string
 *              example: Drake
 *        - name: size
 *          in: query
 *          description: the number of requested relations.
 *          schema:
 *              type: integer
 *              example: 10
 *     responses:
 *      '200':
 *          description: Returns the nodes and relations of the requested artist
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      example: {"nodes": [{"type": "node","id": "15795","labels": ["Song"],"properties": {"release_date": "2017-11-29T00:00Z","album": "Broken People (with Logic & Rag'n'Bone Man) [From Bright: The Album]","popularity": 145,"genre": "conscious hip hop","title": "broken people","url": "https://open.spotify.com/track/5rxPi0MiR4miNK0rCmk980"}  },  {"type": "node","id": "8331","labels": ["Song"],"properties": {"release_date": "2018-09-28T00:00Z","album": "YSIV","popularity": 23,"genre": "conscious hip hop","title": "the adventures of stoney bob","url": "https://open.spotify.com/track/5xE8cBcKRjKEDdJwmh1ixN"}  },  {"type": "node","id": "12","labels": ["Artist"],"properties": {"followers": 5004777,"name": "Logic"}  },  {"type": "node","id": "3480","labels": ["Artist"],"properties": {"followers": 1258651,"name": "RagnBone Man"}  },  {"type": "node","id": "3075","labels": ["Artist"],"properties": {"followers": 0,"name": "Big Lenbo"}  }  ],  "rels": [  {"id": "18437","type": "relationship","label": "MAIN_ARTIST","start": {"id": "12","labels": ["Artist"]},"end": {"id": "15795","labels": ["Song"]}  },  {"id": "9941","type": "relationship","label": "MAIN_ARTIST","start": {"id": "12","labels": ["Artist"]},"end": {"id": "8331","labels": ["Song"]}  },  {"id": "18438","type": "relationship","label": "CO_ARTIST","start": {"id": "3480","labels": ["Artist"]},"end": {"id": "15795","labels": ["Song"]}  },  {"id": "9944","type": "relationship","label": "CO_ARTIST","start": {"id": "3075","labels": ["Artist"]},"end": {"id": "8331","labels": ["Song"]}  }  ]  }

 */
/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Returns a list of most popular songs
 *     tags: [Songs]
 *     parameters:
 *        - name: artist
 *          in: query
 *          description: name of the artist
 *          schema:
 *              type: string
 *              example: The Chainsmokers
 *        - name: genre
 *          in: query
 *          description: genre of the song
 *          schema:
 *              type: string
 *              example: dance pop
 *        - name: country
 *          in: query
 *          description: country where the artist hit Top 200 chart.
 *          schema:
 *              type: string
 *              example: USA
 *        - name: page
 *          in: query
 *          description: number of page
 *          schema:
 *              type: integer
 *              example: 0
 *        - name: itemsPerPage
 *          in: query
 *          description: items per page number
 *          schema:
 *              type: integer
 *              example: 10
 *     responses:
 *      '200':
 *          description: Returns the list of most popular artists from spotify between 2018 and 2020.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Song'
 */

/**
 * @swagger
 * /songs/genres:
 *   get:
 *     summary: Returns a list of most popular songs
 *     tags: [Songs]
 *     responses:
 *      '200':
 *          description: Returns the list of the most popular genres on Spotify.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Genre'
 */

/**
 * @swagger
 * /albums:
 *   get:
 *     summary: Returns a list of most popular albums
 *     tags: [Albums]
 *     parameters:
 *        - name: artist
 *          in: query
 *          description: the artist's name
 *          schema:
 *              type: string
 *              example: Ariana Grande
 *        - name: genre
 *          in: query
 *          description: genre of the artist who published the album
 *          schema:
 *              type: string
 *              example: dance pop
 *        - name: country
 *          in: query
 *          description: country where the album songs hit Top 200 chart.
 *          schema:
 *              type: string
 *              example: USA
 *        - name: page
 *          in: query
 *          description: number of page
 *          schema:
 *              type: integer
 *              example: 0
 *        - name: itemsPerPage
 *          in: query
 *          description: items per page number
 *          schema:
 *              type: integer
 *              example: 10
 *     responses:
 *      '200':
 *          description: Returns the list of most popular albums from spotify between 2018 and 2020.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Album'
 */

/**
 * @swagger
 * /countries:
 *   get:
 *     summary: Returns a list of the 35 + 1 (Global) countries were Spotify Operates
 *     tags: [Countries]
 *     responses:
 *      '200':
 *          description: Returns the list of countries + global.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      example: [{"name":"Argentina"},{"name":"USA"},{"name":"Global"}]
 */