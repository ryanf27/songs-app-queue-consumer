const { Pool } = require("pg");

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistName(playlistId) {
    const query = {
      text: "SELECT name FROM playlists WHERE id = $1",
      values: [playlistId],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistService;
