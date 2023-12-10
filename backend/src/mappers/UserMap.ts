import Mapper from "./Mapper";
import User from "../db/models";

class UserMap extends Mapper<typeof User> {
  // public static toDomain (raw: any): typeof User {
  //   const vinylOrError = User.create({
  //     albumName: AlbumName.create(raw.album_name).getValue(),
  //     artistName: ArtistName.create(raw.artist_name).getValue(),
  //     tracks: raw.TrackList.map((t) => TrackMap.toDomain(t))
  //   }, new UniqueEntityID(raw.vinyl_id));
  //   return vinylOrError.isSuccess ? vinylOrError.getValue() : null;
  // }
  // public static toPersistence (vinyl: Vinyl): any {
  //   return {
  //     album_name: vinyl.albumName.value,
  //     artist_name: vinyl.artistName.value
  //   }
  // }
  // public static toDTO (vinyl: Vinyl): VinylDTO {
  //   return {
  //     albumName: vinyl.albumName.value,
  //     label: vinyl.Label.name.value,
  //     country: vinyl.Label.country.value
  //     yearReleased: vinyl.yearReleased.value,
  //     genres: vinyl.Genres.map((g) => g.name),
  //     artistName: vinyl.aristName.value,
  //     trackList: vinyl.tracks.map((t) => TrackMap.toDTO(t))
  //   }
  // }
}
