export const mapCountryToCode = (country): string => {
  switch (country) {
    case "Frankrike": return "FRA";
    case "Italia": return "ITA";
    case "Spania": return "ESP";
    case "USA": return "USA";
    case "Portugal": return "PRT";
    case "Sør-Afrika": return "ZAF";
    case "Australia": return "AUS";
    case "Tyskland": return "DEU";
    case "Argentina": return "ARG";
    case "Østerrike": return "AUT";
    case "Chile": return "CHL";
    case "New Zealand": return "NZL";
    case "Libanon": return "LBN";
    case "Hellas": return "GRC";
    case "Makedonia": return "MKD";
    case "Moldova": return "MDA";
    case "Canada": return "CAN";
    case "Bulgaria": return "BGR";
    case "Israel": return "ISR";
    case "Ungarn": return "HUN";
    case "Sveits": return "CHE";
    case "Tsjekkia": return "CZE";
    case "Uruguay": return "URY";
    case "Brasil": return "BRA";
    case "Georgia": return "GEO";
    case "Romania": return "ROU";
    case "England": return "GBR";
    case "Bosnia-Herceg.": return "BIH";
    case "Norge": return "NOR";
    case "Slovenia": return "SVN";

    default: return "ATA";
  }
}