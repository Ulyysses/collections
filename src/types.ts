export interface ICollection {
  _id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
}

export interface IItem {
  _id: string;
  collectionId: string;
  name: string;
  tags: string[];
  description?: string;
}

export enum CollectibleType {
  Coins = "Coins",
  EnvelopesAndStamps = "Envelopes and Stamps",
  Postcards = "Postcards",
  Books = "Books",
  Photographs = "Photographs",
  PaintingsAndArt = "Paintings and Art",
  PorcelainFigurines = "Porcelain Figurines",
  ModelCars = "Model Cars",
  Dolls = "Dolls",
  SportsCards = "Sports Cards",
  VinylRecords = "Vinyl Records",
  EventTickets = "Event Tickets",
  FootballScarves = "Football Scarves",
  NumismaticSets = "Numismatic Sets",
  VintageClothing = "Vintage Clothing",
  Badges = "Badges",
  Watches = "Watches",
  AntiqueToys = "Antique Toys",
  PerfumeBottles = "Perfume Bottles",
  Birdhouses = "Birdhouses",
  CupsAndTeaSets = "Cups and Tea Sets",
  Stickers = "Stickers",
  PorcelainDishware = "Porcelain Dishware",
  GemstonesAndMinerals = "Gemstones and Minerals",
  MoviePosters = "Movie Posters",
  CollectibleKnives = "Collectible Knives",
  Maps = "Maps",
  Banknotes = "Banknotes",
  MilitaryMemorabilia = "Military Memorabilia",
  Magnets = "Magnets",
}
