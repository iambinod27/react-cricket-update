const flagMap: Record<string, string> = {
  india: "🇮🇳",
  australia: "🇦🇺",
  england: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "new zealand": "🇳🇿",
  pakistan: "🇵🇰",
  "south africa": "🇿🇦",
  "sri lanka": "🇱🇰",
  bangladesh: "🇧🇩",
  "west indies": "🏴‍☠️", // no official flag, WI doesn't have one — placeholder
  afghanistan: "🇦🇫",
  zimbabwe: "🇿🇼",
  ireland: "🇮🇪",
};

export const getCountryFlag = (country?: string) =>
  country ? flagMap[country.toLowerCase()] ?? "🏏" : "🏏";