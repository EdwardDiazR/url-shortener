interface Link {
  id: number;
  urlTitle: string;
  shortUrl: string;
  longUrl: string;
  visitedTimes: number;
  lastTimeVisited: Date;
}

interface CreateLinkDto {
  Url: string;
  Title: string;
  UserId: any | null;
}

export { Link, CreateLinkDto };
