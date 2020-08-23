class AnimeGateway {
  async getAnimes({ query, limit, page }) {
    const animes = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&limit=${limit}&page=${page}`)
      .then(res => res.json())
    return animes;
  }
}

export default AnimeGateway;