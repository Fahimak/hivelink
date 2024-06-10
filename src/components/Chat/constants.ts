export const mentioningConstants = {
  startSymbol: "@",
  endSymbol: "#",
  matchSearchUserForMentionRegExp: /(^@)([\d\w]*)($)/g,
  splitStringRegExp: /[\n\s]/gm,
  searchMentionUserInMessageRegExp: /(@)(.*?)(#)/,
  searchSymbolsRegExp: /[^\d\w]/gm,
};
