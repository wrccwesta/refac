export const siteConfig = {
  name: "bet/4k",
  url: process.env.NEXT_PUBLIC_APP_URL,
  ogImage: "/og.jpg",
  description:
    "Bet4k",
  links: {
    twitter: "https://twitter.com/bet4k",
    github: "https://github.com/bet4k",
  },
}

export type SiteConfig = typeof siteConfig


export const gameRows = [
  {
    gameKey: "new",
    header: "New Games",
    subHeader: "Try out these new games",
  },
  {
    gameKey: "popular",
    header: "Popular Games",
    subHeader: "Our most popular games",
  },
]

export type GameRows = typeof gameRows