export interface URLS {
  serverURL: URL;
  clientURL: URL;
  displayURL: URL;
  clientPort: string | undefined;
  serverPort: string | undefined;
  displayPort: string | undefined;
}

export interface Match {
  playerID: string;
  playerCredentials: string;
  imageURL?: string;
}

export interface MatchData {
  playerID: string;
  playerCredentials: string;
  matchID: string;
}
