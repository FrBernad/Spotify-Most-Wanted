export class Song {
  constructor(
    public album: string,
    public artist: string,
    public artist_followers: number,
    public co_artists: string[],
    public countries: string[],
    public genre: string,
    public popularity: number,
    public release_date: string,
    public tempo: number,
    public title: string,
    public uri: string,
    public _id: string,
  ) {
  }

}
