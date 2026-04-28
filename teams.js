                                                                                                                                                                                                                                                                                                                                                                                                              // University Basketball team/conference data.
//
// Edit this file when you want to add/remove conferences, rename teams, or tune
// team strength. Every team listed in CONFERENCES can optionally have a matching
// entry in TEAM_DATA under the same conference and team name.
//
// TEAM_DATA rating fields:
// - p: program prestige, shown as a 10-bar meter in team select
// - n: NIL budget in millions, shown as M/K in team select
// - o: roster overall, based on the final ranking curve supplied by rank bands

/* ═══════════════════════════════════════════
   TEAM + CONFERENCE DATA
═══════════════════════════════════════════ */
const CONFERENCES = {
  "ACC": [
    "Boston College",
    "California",
    "Clemson",
    "Duke",
    "Florida State",
    "Georgia Tech",
    "Louisville",
    "Miami (FL)",
    "North Carolina",
    "North Carolina State",
    "Notre Dame",
    "Pittsburgh",
    "SMU",
    "Stanford",
    "Syracuse",
    "Virginia",
    "Virginia Tech",
    "Wake Forest"
  ],
  "America East": [
    "Albany",
    "Binghamton",
    "Bryant",
    "Maine",
    "New Hampshire",
    "NJIT",
    "UMass-Lowell",
    "UMBC",
    "Vermont"
  ],
  "American": [
    "Charlotte",
    "East Carolina",
    "FAU",
    "Memphis",
    "North Texas",
    "Rice",
    "South Florida",
    "Temple",
    "Tulane",
    "Tulsa",
    "UAB",
    "UTSA",
    "Wichita State"
  ],
  "ASUN": [
    "Austin Peay",
    "Bellarmine",
    "Central Arkansas",
    "Eastern Kentucky",
    "FGCU",
    "Jacksonville",
    "Lipscomb",
    "North Alabama",
    "North Florida",
    "Queens",
    "Stetson",
    "West Georgia"
  ],
  "Atlantic 10": [
    "Davidson",
    "Dayton",
    "Duquesne",
    "Fordham",
    "George Mason",
    "George Washington",
    "La Salle",
    "Loyola-Chicago",
    "Rhode Island",
    "Richmond",
    "Saint Bonaventure",
    "Saint Joseph's",
    "Saint Louis",
    "VCU"
  ],
  "Big 12": [
    "Arizona",
    "Arizona State",
    "Baylor",
    "BYU",
    "Cincinnati",
    "Colorado",
    "Houston",
    "Iowa State",
    "Kansas",
    "Kansas State",
    "Oklahoma State",
    "TCU",
    "Texas Tech",
    "UCF",
    "Utah",
    "West Virginia"
  ],
  "Big East": [
    "Butler",
    "Connecticut",
    "Creighton",
    "DePaul",
    "Georgetown",
    "Marquette",
    "Providence",
    "Saint John's",
    "Seton Hall",
    "Villanova",
    "Xavier"
  ],
  "Big Sky": [
    "Eastern Washington",
    "Idaho",
    "Idaho State",
    "Montana",
    "Montana State",
    "Northern Arizona",
    "Northern Colorado",
    "Portland State",
    "Sacramento State",
    "Weber State"
  ],
  "Big South": [
    "Charleston Southern",
    "Gardner-Webb",
    "High Point",
    "Longwood",
    "Presbyterian College",
    "Radford",
    "South Carolina Upstate",
    "UNC Asheville",
    "Winthrop"
  ],
  "Big Ten": [
    "Illinois",
    "Indiana",
    "Iowa",
    "Maryland",
    "Michigan",
    "Michigan State",
    "Minnesota",
    "Nebraska",
    "Northwestern",
    "Ohio State",
    "Oregon",
    "Penn State",
    "Purdue",
    "Rutgers",
    "UCLA",
    "USC",
    "Washington",
    "Wisconsin"
  ],
  "Big West": [
    "Cal Poly",
    "Cal State Bakersfield",
    "Cal State Fullerton",
    "Cal State Northridge",
    "Hawaii",
    "Long Beach State",
    "UC Davis",
    "UC Irvine",
    "UC Riverside",
    "UC San Diego",
    "UC Santa Barbara"
  ],
  "Coastal Athletic": [
    "Campbell",
    "Charleston",
    "Drexel",
    "Elon",
    "Hampton",
    "Hofstra",
    "Monmouth",
    "North Carolina A&T",
    "Northeastern",
    "Stony Brook",
    "Towson",
    "UNCW",
    "William & Mary"
  ],
  "Conference USA": [
    "Delaware",
    "FIU",
    "Jacksonville State",
    "Kennesaw State",
    "Liberty",
    "Louisiana Tech",
    "Middle Tennessee",
    "Missouri State",
    "New Mexico State",
    "Sam Houston State",
    "UTEP",
    "Western Kentucky"
  ],
  "Horizon League": [
    "Cleveland State",
    "Detroit",
    "Green Bay",
    "IU Indianapolis",
    "Milwaukee",
    "Northern Kentucky",
    "Oakland",
    "Purdue Fort Wayne",
    "Robert Morris",
    "Wright State",
    "Youngstown State"
  ],
  "Ivy League": [
    "Brown",
    "Columbia",
    "Cornell",
    "Dartmouth",
    "Harvard",
    "Penn",
    "Princeton",
    "Yale"
  ],
  "MAAC": [
    "Canisius",
    "Fairfield",
    "Iona",
    "Manhattan",
    "Marist",
    "Merrimack",
    "Mount Saint Mary's",
    "Niagara",
    "Quinnipiac",
    "Rider",
    "Sacred Heart",
    "Saint Peter's",
    "Siena"
  ],
  "MEAC": [
    "Coppin State",
    "Delaware State",
    "Howard",
    "Maryland Eastern Shore",
    "Morgan State",
    "Norfolk State",
    "North Carolina Central",
    "South Carolina State"
  ],
  "Mid-American": [
    "Akron",
    "Ball State",
    "Bowling Green",
    "Buffalo",
    "Central Michigan",
    "Eastern Michigan",
    "Kent State",
    "Miami (OH)",
    "Northern Illinois",
    "Ohio",
    "Toledo",
    "UMass",
    "Western Michigan"
  ],
  "Missouri Valley": [
    "Belmont",
    "Bradley",
    "Drake",
    "Evansville",
    "Illinois State",
    "Indiana State",
    "Murray State",
    "Northern Iowa",
    "Southern Illinois",
    "UIC",
    "Valparaiso"
  ],
  "Mountain West": [
    "Air Force",
    "Boise State",
    "Colorado State",
    "Fresno State",
    "Grand Canyon",
    "Nevada",
    "New Mexico",
    "San Diego State",
    "San Jose State",
    "UNLV",
    "Utah State",
    "Wyoming"
  ],
  "NEC": [
    "Central Connecticut",
    "Chicago State",
    "Fairleigh Dickinson",
    "Le Moyne",
    "Long Island",
    "Mercyhurst",
    "New Haven",
    "Saint Francis (PA)",
    "Stonehill",
    "Wagner"
  ],
  "Ohio Valley": [
    "Eastern Illinois",
    "Lindenwood",
    "Little Rock",
    "Morehead State",
    "SIUE",
    "Southeast Missouri",
    "Southern Indiana",
    "Tennessee State",
    "Tennessee Tech",
    "Tennessee-Martin",
    "Western Illinois"
  ],
  "Patriot League": [
    "American",
    "Army",
    "Boston University",
    "Bucknell",
    "Colgate",
    "Holy Cross",
    "Lafayette",
    "Lehigh",
    "Loyola-Maryland",
    "Navy"
  ],
  "SEC": [
    "Alabama",
    "Arkansas",
    "Auburn",
    "Florida",
    "Georgia",
    "Kentucky",
    "LSU",
    "Mississippi State",
    "Missouri",
    "Oklahoma",
    "Ole Miss",
    "South Carolina",
    "Tennessee",
    "Texas",
    "Texas A&M",
    "Vanderbilt"
  ],
  "Southern": [
    "Chattanooga",
    "East Tennessee State",
    "Furman",
    "Mercer",
    "Samford",
    "The Citadel",
    "UNCG",
    "VMI",
    "Western Carolina",
    "Wofford"
  ],
  "Southland": [
    "East Texas A&M",
    "Houston Christian",
    "Incarnate Word",
    "Lamar",
    "McNeese",
    "New Orleans",
    "Nicholls",
    "Northwestern State",
    "Southeastern Louisiana",
    "Stephen F. Austin",
    "Texas A&M-Corpus Christi",
    "UTRGV"
  ],
  "Sun Belt": [
    "Appalachian State",
    "Arkansas State",
    "Coastal Carolina",
    "Georgia Southern",
    "Georgia State",
    "James Madison",
    "Louisiana",
    "Marshall",
    "Old Dominion",
    "South Alabama",
    "Southern Miss",
    "Texas State",
    "Troy",
    "ULM"
  ],
  "SWAC": [
    "Alabama A&M",
    "Alabama State",
    "Alcorn State",
    "Arkansas-Pine Bluff",
    "Bethune-Cookman",
    "Florida A&M",
    "Grambling State",
    "Jackson State",
    "Mississippi Valley State",
    "Prairie View A&M",
    "Southern",
    "Texas Southern"
  ],
  "Summit League": [
    "Denver",
    "North Dakota",
    "North Dakota State",
    "Omaha",
    "Oral Roberts",
    "Saint Thomas",
    "South Dakota",
    "South Dakota State",
    "UMKC"
  ],
  "West Coast": [
    "Gonzaga",
    "Loyola-Marymount",
    "Oregon State",
    "Pacific",
    "Pepperdine",
    "Portland",
    "Saint Mary's College",
    "San Diego",
    "San Francisco",
    "Santa Clara",
    "Seattle University",
    "Washington State"
  ],
  "Western Athletic": [
    "Abilene Christian",
    "California Baptist",
    "Southern Utah",
    "Tarleton State",
    "UTA",
    "Utah Tech",
    "Utah Valley"
  ]
};

const TEAM_DATA = {
  "ACC": {
    "Boston College": {
      "p": 79,
      "n": 8.5,
      "o": 74
    },
    "California": {
      "p": 72,
      "n": 7.5,
      "o": 80
    },
    "Clemson": {
      "p": 74,
      "n": 7.8,
      "o": 84
    },
    "Duke": {
      "p": 100,
      "n": 15,
      "o": 90
    },
    "Florida State": {
      "p": 76,
      "n": 8.1,
      "o": 80
    },
    "Georgia Tech": {
      "p": 72,
      "n": 7.5,
      "o": 73
    },
    "Louisville": {
      "p": 89,
      "n": 12,
      "o": 87
    },
    "Miami (FL)": {
      "p": 75,
      "n": 8.1,
      "o": 84
    },
    "North Carolina": {
      "p": 99,
      "n": 13.5,
      "o": 85
    },
    "North Carolina State": {
      "p": 77,
      "n": 8.2,
      "o": 84
    },
    "Notre Dame": {
      "p": 76,
      "n": 8.4,
      "o": 78
    },
    "Pittsburgh": {
      "p": 76,
      "n": 8.1,
      "o": 77
    },
    "SMU": {
      "p": 72,
      "n": 7.8,
      "o": 83
    },
    "Stanford": {
      "p": 75,
      "n": 8.1,
      "o": 80
    },
    "Syracuse": {
      "p": 84,
      "n": 9.6,
      "o": 79
    },
    "Virginia": {
      "p": 83,
      "n": 9.3,
      "o": 87
    },
    "Virginia Tech": {
      "p": 72,
      "n": 7.5,
      "o": 81
    },
    "Wake Forest": {
      "p": 75,
      "n": 7.9,
      "o": 80
    }
  },
  "America East": {
    "Albany": {
      "p": 30,
      "n": 0.6,
      "o": 64
    },
    "Binghamton": {
      "p": 33,
      "n": 0.65,
      "o": 60
    },
    "Bryant": {
      "p": 33,
      "n": 0.65,
      "o": 61
    },
    "Maine": {
      "p": 31,
      "n": 0.6,
      "o": 62
    },
    "New Hampshire": {
      "p": 30,
      "n": 0.6,
      "o": 62
    },
    "NJIT": {
      "p": 26,
      "n": 0.55,
      "o": 64
    },
    "UMass-Lowell": {
      "p": 27,
      "n": 0.55,
      "o": 64
    },
    "UMBC": {
      "p": 34,
      "n": 0.65,
      "o": 71
    },
    "Vermont": {
      "p": 58,
      "n": 1.5,
      "o": 70
    }
  },
  "American": {
    "Charlotte": {
      "p": 57,
      "n": 3.05,
      "o": 73
    },
    "East Carolina": {
      "p": 53,
      "n": 2.85,
      "o": 68
    },
    "FAU": {
      "p": 62,
      "n": 2.9,
      "o": 76
    },
    "Memphis": {
      "p": 82,
      "n": 5,
      "o": 76
    },
    "North Texas": {
      "p": 58,
      "n": 3.1,
      "o": 75
    },
    "Rice": {
      "p": 49,
      "n": 2.65,
      "o": 69
    },
    "South Florida": {
      "p": 50,
      "n": 2.7,
      "o": 82
    },
    "Temple": {
      "p": 68,
      "n": 3.6,
      "o": 74
    },
    "Tulane": {
      "p": 48,
      "n": 2.6,
      "o": 71
    },
    "Tulsa": {
      "p": 51,
      "n": 2.75,
      "o": 81
    },
    "UAB": {
      "p": 60,
      "n": 3.2,
      "o": 77
    },
    "UTSA": {
      "p": 56,
      "n": 3,
      "o": 62
    },
    "Wichita State": {
      "p": 70,
      "n": 3.4,
      "o": 80
    }
  },
  "ASUN": {
    "Austin Peay": {
      "p": 30,
      "n": 0.65,
      "o": 74
    },
    "Bellarmine": {
      "p": 34,
      "n": 0.65,
      "o": 67
    },
    "Central Arkansas": {
      "p": 30,
      "n": 0.65,
      "o": 74
    },
    "Eastern Kentucky": {
      "p": 32,
      "n": 0.65,
      "o": 66
    },
    "FGCU": {
      "p": 34,
      "n": 0.65,
      "o": 68
    },
    "Jacksonville": {
      "p": 37,
      "n": 0.7,
      "o": 66
    },
    "Lipscomb": {
      "p": 27,
      "n": 0.6,
      "o": 72
    },
    "North Alabama": {
      "p": 32,
      "n": 0.65,
      "o": 62
    },
    "North Florida": {
      "p": 33,
      "n": 0.65,
      "o": 62
    },
    "Queens": {
      "p": 36,
      "n": 0.7,
      "o": 72
    },
    "Stetson": {
      "p": 31,
      "n": 0.65,
      "o": 65
    },
    "West Georgia": {
      "p": 36,
      "n": 0.7,
      "o": 65
    }
  },
  "Atlantic 10": {
    "Davidson": {
      "p": 62,
      "n": 2.95,
      "o": 77
    },
    "Dayton": {
      "p": 72,
      "n": 4,
      "o": 80
    },
    "Duquesne": {
      "p": 56,
      "n": 2.65,
      "o": 76
    },
    "Fordham": {
      "p": 51,
      "n": 2.4,
      "o": 73
    },
    "George Mason": {
      "p": 60,
      "n": 2.85,
      "o": 78
    },
    "George Washington": {
      "p": 58,
      "n": 2.75,
      "o": 78
    },
    "La Salle": {
      "p": 59,
      "n": 2.8,
      "o": 69
    },
    "Loyola-Chicago": {
      "p": 63,
      "n": 3,
      "o": 67
    },
    "Rhode Island": {
      "p": 50,
      "n": 2.35,
      "o": 74
    },
    "Richmond": {
      "p": 60,
      "n": 2.85,
      "o": 74
    },
    "Saint Bonaventure": {
      "p": 60,
      "n": 2.85,
      "o": 75
    },
    "Saint Joseph's": {
      "p": 55,
      "n": 2.6,
      "o": 77
    },
    "Saint Louis": {
      "p": 63,
      "n": 3,
      "o": 84
    },
    "VCU": {
      "p": 70,
      "n": 3.5,
      "o": 82
    }
  },
  "Big 12": {
    "Arizona": {
      "p": 91,
      "n": 10.5,
      "o": 90
    },
    "Arizona State": {
      "p": 73,
      "n": 7.9,
      "o": 80
    },
    "Baylor": {
      "p": 86,
      "n": 9.9,
      "o": 82
    },
    "BYU": {
      "p": 78,
      "n": 13,
      "o": 85
    },
    "Cincinnati": {
      "p": 78,
      "n": 8.6,
      "o": 82
    },
    "Colorado": {
      "p": 72,
      "n": 7.7,
      "o": 79
    },
    "Houston": {
      "p": 88,
      "n": 10.5,
      "o": 89
    },
    "Iowa State": {
      "p": 82,
      "n": 9.7,
      "o": 89
    },
    "Kansas": {
      "p": 99,
      "n": 12.5,
      "o": 86
    },
    "Kansas State": {
      "p": 76,
      "n": 8.3,
      "o": 78
    },
    "Oklahoma State": {
      "p": 75,
      "n": 8.1,
      "o": 79
    },
    "TCU": {
      "p": 73,
      "n": 7.8,
      "o": 83
    },
    "Texas Tech": {
      "p": 81,
      "n": 11.5,
      "o": 87
    },
    "UCF": {
      "p": 75,
      "n": 8.1,
      "o": 81
    },
    "Utah": {
      "p": 73,
      "n": 7.8,
      "o": 75
    },
    "West Virginia": {
      "p": 76,
      "n": 8.5,
      "o": 81
    }
  },
  "Big East": {
    "Butler": {
      "p": 79,
      "n": 8.1,
      "o": 79
    },
    "Connecticut": {
      "p": 96,
      "n": 11,
      "o": 88
    },
    "Creighton": {
      "p": 78,
      "n": 8.3,
      "o": 79
    },
    "DePaul": {
      "p": 83,
      "n": 8.7,
      "o": 77
    },
    "Georgetown": {
      "p": 74,
      "n": 7.6,
      "o": 79
    },
    "Marquette": {
      "p": 82,
      "n": 8,
      "o": 78
    },
    "Providence": {
      "p": 78,
      "n": 8.1,
      "o": 79
    },
    "Saint John's": {
      "p": 80,
      "n": 10.5,
      "o": 88
    },
    "Seton Hall": {
      "p": 76,
      "n": 7.8,
      "o": 81
    },
    "Villanova": {
      "p": 88,
      "n": 8,
      "o": 84
    },
    "Xavier": {
      "p": 77,
      "n": 8,
      "o": 78
    }
  },
  "Big Sky": {
    "Eastern Washington": {
      "p": 42,
      "n": 0.7,
      "o": 71
    },
    "Idaho": {
      "p": 25,
      "n": 0.5,
      "o": 74
    },
    "Idaho State": {
      "p": 31,
      "n": 0.55,
      "o": 69
    },
    "Montana": {
      "p": 44,
      "n": 0.7,
      "o": 71
    },
    "Montana State": {
      "p": 43,
      "n": 0.7,
      "o": 75
    },
    "Northern Arizona": {
      "p": 33,
      "n": 0.6,
      "o": 65
    },
    "Northern Colorado": {
      "p": 29,
      "n": 0.55,
      "o": 74
    },
    "Portland State": {
      "p": 30,
      "n": 0.55,
      "o": 74
    },
    "Sacramento State": {
      "p": 33,
      "n": 0.6,
      "o": 68
    },
    "Weber State": {
      "p": 43,
      "n": 0.7,
      "o": 71
    }
  },
  "Big South": {
    "Charleston Southern": {
      "p": 30,
      "n": 0.5,
      "o": 69
    },
    "Gardner-Webb": {
      "p": 27,
      "n": 0.5,
      "o": 60
    },
    "High Point": {
      "p": 48,
      "n": 0.65,
      "o": 80
    },
    "Longwood": {
      "p": 29,
      "n": 0.5,
      "o": 68
    },
    "Presbyterian College": {
      "p": 25,
      "n": 0.45,
      "o": 68
    },
    "Radford": {
      "p": 26,
      "n": 0.45,
      "o": 68
    },
    "South Carolina Upstate": {
      "p": 25,
      "n": 0.45,
      "o": 65
    },
    "UNC Asheville": {
      "p": 34,
      "n": 0.55,
      "o": 69
    },
    "Winthrop": {
      "p": 25,
      "n": 0.45,
      "o": 76
    }
  },
  "Big Ten": {
    "Illinois": {
      "p": 83,
      "n": 9.3,
      "o": 89
    },
    "Indiana": {
      "p": 91,
      "n": 15,
      "o": 82
    },
    "Iowa": {
      "p": 76,
      "n": 8.7,
      "o": 85
    },
    "Maryland": {
      "p": 81,
      "n": 9.5,
      "o": 75
    },
    "Michigan": {
      "p": 84,
      "n": 11,
      "o": 90
    },
    "Michigan State": {
      "p": 90,
      "n": 10.5,
      "o": 88
    },
    "Minnesota": {
      "p": 72,
      "n": 7.9,
      "o": 79
    },
    "Nebraska": {
      "p": 73,
      "n": 8.1,
      "o": 88
    },
    "Northwestern": {
      "p": 70,
      "n": 7.6,
      "o": 80
    },
    "Ohio State": {
      "p": 80,
      "n": 9.8,
      "o": 84
    },
    "Oregon": {
      "p": 81,
      "n": 9.8,
      "o": 77
    },
    "Penn State": {
      "p": 71,
      "n": 7.7,
      "o": 75
    },
    "Purdue": {
      "p": 87,
      "n": 9.8,
      "o": 89
    },
    "Rutgers": {
      "p": 72,
      "n": 7.9,
      "o": 75
    },
    "UCLA": {
      "p": 96,
      "n": 9.5,
      "o": 84
    },
    "USC": {
      "p": 78,
      "n": 9.2,
      "o": 79
    },
    "Washington": {
      "p": 76,
      "n": 8.8,
      "o": 81
    },
    "Wisconsin": {
      "p": 80,
      "n": 9.4,
      "o": 85
    }
  },
  "Big West": {
    "Cal Poly": {
      "p": 38,
      "n": 0.8,
      "o": 70
    },
    "Cal State Bakersfield": {
      "p": 36,
      "n": 0.8,
      "o": 64
    },
    "Cal State Fullerton": {
      "p": 29,
      "n": 0.7,
      "o": 73
    },
    "Cal State Northridge": {
      "p": 32,
      "n": 0.7,
      "o": 72
    },
    "Hawaii": {
      "p": 47,
      "n": 0.95,
      "o": 77
    },
    "Long Beach State": {
      "p": 48,
      "n": 0.95,
      "o": 68
    },
    "UC Davis": {
      "p": 34,
      "n": 0.75,
      "o": 73
    },
    "UC Irvine": {
      "p": 52,
      "n": 1.4,
      "o": 77
    },
    "UC Riverside": {
      "p": 32,
      "n": 0.7,
      "o": 67
    },
    "UC San Diego": {
      "p": 50,
      "n": 0.95,
      "o": 76
    },
    "UC Santa Barbara": {
      "p": 49,
      "n": 0.95,
      "o": 75
    }
  },
  "Coastal Athletic": {
    "Campbell": {
      "p": 38,
      "n": 0.9,
      "o": 71
    },
    "Charleston": {
      "p": 57,
      "n": 1.2,
      "o": 74
    },
    "Drexel": {
      "p": 37,
      "n": 0.9,
      "o": 71
    },
    "Elon": {
      "p": 32,
      "n": 0.8,
      "o": 70
    },
    "Hampton": {
      "p": 31,
      "n": 0.8,
      "o": 68
    },
    "Hofstra": {
      "p": 31,
      "n": 0.8,
      "o": 79
    },
    "Monmouth": {
      "p": 38,
      "n": 0.9,
      "o": 73
    },
    "North Carolina A&T": {
      "p": 40,
      "n": 0.95,
      "o": 67
    },
    "Northeastern": {
      "p": 31,
      "n": 0.8,
      "o": 66
    },
    "Stony Brook": {
      "p": 34,
      "n": 0.85,
      "o": 69
    },
    "Towson": {
      "p": 31,
      "n": 0.8,
      "o": 74
    },
    "UNCW": {
      "p": 52,
      "n": 1.1,
      "o": 78
    },
    "William & Mary": {
      "p": 39,
      "n": 0.9,
      "o": 76
    }
  },
  "Conference USA": {
    "Delaware": {
      "p": 39,
      "n": 1.25,
      "o": 67
    },
    "FIU": {
      "p": 45,
      "n": 1.35,
      "o": 71
    },
    "Jacksonville State": {
      "p": 42,
      "n": 1.3,
      "o": 71
    },
    "Kennesaw State": {
      "p": 46,
      "n": 1.4,
      "o": 74
    },
    "Liberty": {
      "p": 61,
      "n": 2,
      "o": 77
    },
    "Louisiana Tech": {
      "p": 56,
      "n": 1.65,
      "o": 71
    },
    "Middle Tennessee": {
      "p": 47,
      "n": 1.4,
      "o": 74
    },
    "Missouri State": {
      "p": 44,
      "n": 1.35,
      "o": 71
    },
    "New Mexico State": {
      "p": 58,
      "n": 1.7,
      "o": 72
    },
    "Sam Houston State": {
      "p": 38,
      "n": 1.2,
      "o": 77
    },
    "UTEP": {
      "p": 47,
      "n": 1.4,
      "o": 68
    },
    "Western Kentucky": {
      "p": 62,
      "n": 1.75,
      "o": 74
    }
  },
  "Horizon League": {
    "Cleveland State": {
      "p": 46,
      "n": 1.85,
      "o": 65
    },
    "Detroit": {
      "p": 45,
      "n": 1.85,
      "o": 70
    },
    "Green Bay": {
      "p": 42,
      "n": 1.75,
      "o": 70
    },
    "IU Indianapolis": {
      "p": 35,
      "n": 1.55,
      "o": 65
    },
    "Milwaukee": {
      "p": 45,
      "n": 1.85,
      "o": 68
    },
    "Northern Kentucky": {
      "p": 47,
      "n": 1.9,
      "o": 72
    },
    "Oakland": {
      "p": 50,
      "n": 1.4,
      "o": 73
    },
    "Purdue Fort Wayne": {
      "p": 35,
      "n": 1.55,
      "o": 68
    },
    "Robert Morris": {
      "p": 35,
      "n": 1.55,
      "o": 75
    },
    "Wright State": {
      "p": 47,
      "n": 1.9,
      "o": 76
    },
    "Youngstown State": {
      "p": 39,
      "n": 1.65,
      "o": 70
    }
  },
  "Ivy League": {
    "Brown": {
      "p": 36,
      "n": 0.95,
      "o": 66
    },
    "Columbia": {
      "p": 42,
      "n": 1.05,
      "o": 72
    },
    "Cornell": {
      "p": 49,
      "n": 1.2,
      "o": 74
    },
    "Dartmouth": {
      "p": 39,
      "n": 1,
      "o": 68
    },
    "Harvard": {
      "p": 53,
      "n": 1.25,
      "o": 74
    },
    "Penn": {
      "p": 52,
      "n": 1.25,
      "o": 74
    },
    "Princeton": {
      "p": 56,
      "n": 1.7,
      "o": 68
    },
    "Yale": {
      "p": 54,
      "n": 1.4,
      "o": 80
    }
  },
  "MAAC": {
    "Canisius": {
      "p": 33,
      "n": 0.65,
      "o": 62
    },
    "Fairfield": {
      "p": 27,
      "n": 0.6,
      "o": 69
    },
    "Iona": {
      "p": 53,
      "n": 0.9,
      "o": 69
    },
    "Manhattan": {
      "p": 27,
      "n": 0.6,
      "o": 64
    },
    "Marist": {
      "p": 35,
      "n": 0.7,
      "o": 72
    },
    "Merrimack": {
      "p": 45,
      "n": 0.8,
      "o": 73
    },
    "Mount Saint Mary's": {
      "p": 35,
      "n": 0.7,
      "o": 67
    },
    "Niagara": {
      "p": 36,
      "n": 0.7,
      "o": 62
    },
    "Quinnipiac": {
      "p": 45,
      "n": 0.8,
      "o": 71
    },
    "Rider": {
      "p": 34,
      "n": 0.65,
      "o": 61
    },
    "Sacred Heart": {
      "p": 31,
      "n": 0.65,
      "o": 66
    },
    "Saint Peter's": {
      "p": 50,
      "n": 0.85,
      "o": 69
    },
    "Siena": {
      "p": 28,
      "n": 0.6,
      "o": 73
    }
  },
  "MEAC": {
    "Coppin State": {
      "p": 28,
      "n": 0.45,
      "o": 60
    },
    "Delaware State": {
      "p": 29,
      "n": 0.45,
      "o": 60
    },
    "Howard": {
      "p": 43,
      "n": 0.6,
      "o": 71
    },
    "Maryland Eastern Shore": {
      "p": 21,
      "n": 0.4,
      "o": 61
    },
    "Morgan State": {
      "p": 23,
      "n": 0.45,
      "o": 61
    },
    "Norfolk State": {
      "p": 45,
      "n": 0.6,
      "o": 65
    },
    "North Carolina Central": {
      "p": 29,
      "n": 0.45,
      "o": 62
    },
    "South Carolina State": {
      "p": 24,
      "n": 0.45,
      "o": 61
    }
  },
  "Mid-American": {
    "Akron": {
      "p": 55,
      "n": 1.4,
      "o": 81
    },
    "Ball State": {
      "p": 34,
      "n": 1.1,
      "o": 65
    },
    "Bowling Green": {
      "p": 42,
      "n": 1.25,
      "o": 74
    },
    "Buffalo": {
      "p": 44,
      "n": 1.3,
      "o": 71
    },
    "Central Michigan": {
      "p": 39,
      "n": 1.2,
      "o": 67
    },
    "Eastern Michigan": {
      "p": 37,
      "n": 1.15,
      "o": 69
    },
    "Kent State": {
      "p": 54,
      "n": 1.55,
      "o": 74
    },
    "Miami (OH)": {
      "p": 43,
      "n": 1.3,
      "o": 80
    },
    "Northern Illinois": {
      "p": 44,
      "n": 1.3,
      "o": 63
    },
    "Ohio": {
      "p": 54,
      "n": 1.55,
      "o": 69
    },
    "Toledo": {
      "p": 52,
      "n": 1.5,
      "o": 75
    },
    "UMass": {
      "p": 58,
      "n": 1.6,
      "o": 71
    },
    "Western Michigan": {
      "p": 37,
      "n": 1.15,
      "o": 67
    }
  },
  "Missouri Valley": {
    "Belmont": {
      "p": 56,
      "n": 1.7,
      "o": 80
    },
    "Bradley": {
      "p": 58,
      "n": 1.75,
      "o": 77
    },
    "Drake": {
      "p": 62,
      "n": 2,
      "o": 71
    },
    "Evansville": {
      "p": 44,
      "n": 1.35,
      "o": 65
    },
    "Illinois State": {
      "p": 45,
      "n": 1.4,
      "o": 78
    },
    "Indiana State": {
      "p": 55,
      "n": 1.65,
      "o": 71
    },
    "Murray State": {
      "p": 58,
      "n": 1.75,
      "o": 77
    },
    "Northern Iowa": {
      "p": 56,
      "n": 1.7,
      "o": 79
    },
    "Southern Illinois": {
      "p": 47,
      "n": 1.45,
      "o": 76
    },
    "UIC": {
      "p": 45,
      "n": 1.4,
      "o": 77
    },
    "Valparaiso": {
      "p": 48,
      "n": 1.5,
      "o": 74
    }
  },
  "Mountain West": {
    "Air Force": {
      "p": 61,
      "n": 2.95,
      "o": 61
    },
    "Boise State": {
      "p": 66,
      "n": 3.2,
      "o": 81
    },
    "Colorado State": {
      "p": 53,
      "n": 2.55,
      "o": 79
    },
    "Fresno State": {
      "p": 53,
      "n": 2.55,
      "o": 74
    },
    "Grand Canyon": {
      "p": 63,
      "n": 3.2,
      "o": 80
    },
    "Nevada": {
      "p": 65,
      "n": 3.15,
      "o": 80
    },
    "New Mexico": {
      "p": 70,
      "n": 3.4,
      "o": 82
    },
    "San Diego State": {
      "p": 78,
      "n": 4.5,
      "o": 82
    },
    "San Jose State": {
      "p": 56,
      "n": 2.7,
      "o": 69
    },
    "UNLV": {
      "p": 72,
      "n": 3.2,
      "o": 77
    },
    "Utah State": {
      "p": 66,
      "n": 3.2,
      "o": 86
    },
    "Wyoming": {
      "p": 62,
      "n": 3,
      "o": 78
    }
  },
  "NEC": {
    "Central Connecticut": {
      "p": 24,
      "n": 0.45,
      "o": 66
    },
    "Chicago State": {
      "p": 30,
      "n": 0.5,
      "o": 62
    },
    "Fairleigh Dickinson": {
      "p": 30,
      "n": 0.5,
      "o": 63
    },
    "Le Moyne": {
      "p": 23,
      "n": 0.45,
      "o": 66
    },
    "Long Island": {
      "p": 21,
      "n": 0.4,
      "o": 71
    },
    "Mercyhurst": {
      "p": 20,
      "n": 0.4,
      "o": 67
    },
    "New Haven": {
      "p": 23,
      "n": 0.45,
      "o": 64
    },
    "Saint Francis (PA)": {
      "p": 24,
      "n": 0.45,
      "o": 61
    },
    "Stonehill": {
      "p": 20,
      "n": 0.4,
      "o": 63
    },
    "Wagner": {
      "p": 27,
      "n": 0.45,
      "o": 65
    }
  },
  "Ohio Valley": {
    "Eastern Illinois": {
      "p": 30,
      "n": 0.55,
      "o": 64
    },
    "Lindenwood": {
      "p": 34,
      "n": 0.6,
      "o": 68
    },
    "Little Rock": {
      "p": 45,
      "n": 0.7,
      "o": 65
    },
    "Morehead State": {
      "p": 47,
      "n": 0.7,
      "o": 68
    },
    "SIUE": {
      "p": 27,
      "n": 0.5,
      "o": 68
    },
    "Southeast Missouri": {
      "p": 28,
      "n": 0.55,
      "o": 70
    },
    "Southern Indiana": {
      "p": 32,
      "n": 0.55,
      "o": 62
    },
    "Tennessee State": {
      "p": 34,
      "n": 0.6,
      "o": 73
    },
    "Tennessee Tech": {
      "p": 30,
      "n": 0.55,
      "o": 65
    },
    "Tennessee-Martin": {
      "p": 32,
      "n": 0.55,
      "o": 71
    },
    "Western Illinois": {
      "p": 30,
      "n": 0.55,
      "o": 60
    }
  },
  "Patriot League": {
    "American": {
      "p": 33,
      "n": 0.65,
      "o": 68
    },
    "Army": {
      "p": 41,
      "n": 0.7,
      "o": 63
    },
    "Boston University": {
      "p": 42,
      "n": 0.75,
      "o": 68
    },
    "Bucknell": {
      "p": 45,
      "n": 0.75,
      "o": 63
    },
    "Colgate": {
      "p": 48,
      "n": 0.8,
      "o": 70
    },
    "Holy Cross": {
      "p": 34,
      "n": 0.65,
      "o": 63
    },
    "Lafayette": {
      "p": 28,
      "n": 0.6,
      "o": 64
    },
    "Lehigh": {
      "p": 35,
      "n": 0.65,
      "o": 67
    },
    "Loyola-Maryland": {
      "p": 33,
      "n": 0.65,
      "o": 64
    },
    "Navy": {
      "p": 41,
      "n": 0.7,
      "o": 75
    }
  },
  "SEC": {
    "Alabama": {
      "p": 83,
      "n": 9.8,
      "o": 88
    },
    "Arkansas": {
      "p": 86,
      "n": 13,
      "o": 87
    },
    "Auburn": {
      "p": 82,
      "n": 9.6,
      "o": 83
    },
    "Florida": {
      "p": 84,
      "n": 9.8,
      "o": 89
    },
    "Georgia": {
      "p": 72,
      "n": 9.4,
      "o": 84
    },
    "Kentucky": {
      "p": 99,
      "n": 22,
      "o": 85
    },
    "LSU": {
      "p": 76,
      "n": 9.9,
      "o": 80
    },
    "Mississippi State": {
      "p": 72,
      "n": 9.2,
      "o": 77
    },
    "Missouri": {
      "p": 73,
      "n": 9.5,
      "o": 81
    },
    "Oklahoma": {
      "p": 78,
      "n": 9.9,
      "o": 82
    },
    "Ole Miss": {
      "p": 72,
      "n": 9.2,
      "o": 79
    },
    "South Carolina": {
      "p": 73,
      "n": 9.3,
      "o": 77
    },
    "Tennessee": {
      "p": 86,
      "n": 10.5,
      "o": 87
    },
    "Texas": {
      "p": 86,
      "n": 11,
      "o": 83
    },
    "Texas A&M": {
      "p": 76,
      "n": 9.9,
      "o": 82
    },
    "Vanderbilt": {
      "p": 71,
      "n": 9,
      "o": 88
    }
  },
  "Southern": {
    "Chattanooga": {
      "p": 50,
      "n": 0.9,
      "o": 66
    },
    "East Tennessee State": {
      "p": 51,
      "n": 0.9,
      "o": 75
    },
    "Furman": {
      "p": 51,
      "n": 0.9,
      "o": 72
    },
    "Mercer": {
      "p": 30,
      "n": 0.65,
      "o": 72
    },
    "Samford": {
      "p": 52,
      "n": 0.95,
      "o": 71
    },
    "The Citadel": {
      "p": 32,
      "n": 0.65,
      "o": 62
    },
    "UNCG": {
      "p": 33,
      "n": 0.7,
      "o": 66
    },
    "VMI": {
      "p": 34,
      "n": 0.7,
      "o": 61
    },
    "Western Carolina": {
      "p": 30,
      "n": 0.65,
      "o": 70
    },
    "Wofford": {
      "p": 30,
      "n": 0.65,
      "o": 68
    }
  },
  "Southland": {
    "East Texas A&M": {
      "p": 27,
      "n": 0.55,
      "o": 65
    },
    "Houston Christian": {
      "p": 25,
      "n": 0.5,
      "o": 66
    },
    "Incarnate Word": {
      "p": 32,
      "n": 0.6,
      "o": 67
    },
    "Lamar": {
      "p": 33,
      "n": 0.6,
      "o": 68
    },
    "McNeese": {
      "p": 54,
      "n": 1.6,
      "o": 81
    },
    "New Orleans": {
      "p": 33,
      "n": 0.6,
      "o": 71
    },
    "Nicholls": {
      "p": 27,
      "n": 0.55,
      "o": 68
    },
    "Northwestern State": {
      "p": 31,
      "n": 0.55,
      "o": 65
    },
    "Southeastern Louisiana": {
      "p": 30,
      "n": 0.55,
      "o": 66
    },
    "Stephen F. Austin": {
      "p": 50,
      "n": 0.75,
      "o": 79
    },
    "Texas A&M-Corpus Christi": {
      "p": 25,
      "n": 0.5,
      "o": 72
    },
    "UTRGV": {
      "p": 42,
      "n": 0.7,
      "o": 76
    }
  },
  "Sun Belt": {
    "Appalachian State": {
      "p": 34,
      "n": 1,
      "o": 72
    },
    "Arkansas State": {
      "p": 34,
      "n": 1,
      "o": 74
    },
    "Coastal Carolina": {
      "p": 34,
      "n": 1,
      "o": 70
    },
    "Georgia Southern": {
      "p": 39,
      "n": 1.1,
      "o": 70
    },
    "Georgia State": {
      "p": 37,
      "n": 1.1,
      "o": 65
    },
    "James Madison": {
      "p": 33,
      "n": 1,
      "o": 71
    },
    "Louisiana": {
      "p": 42,
      "n": 1.2,
      "o": 65
    },
    "Marshall": {
      "p": 39,
      "n": 1.1,
      "o": 73
    },
    "Old Dominion": {
      "p": 37,
      "n": 1.1,
      "o": 68
    },
    "South Alabama": {
      "p": 35,
      "n": 1.05,
      "o": 72
    },
    "Southern Miss": {
      "p": 35,
      "n": 1.05,
      "o": 71
    },
    "Texas State": {
      "p": 39,
      "n": 1.1,
      "o": 69
    },
    "Troy": {
      "p": 34,
      "n": 1,
      "o": 75
    },
    "ULM": {
      "p": 40,
      "n": 1.15,
      "o": 61
    }
  },
  "SWAC": {
    "Alabama A&M": {
      "p": 26,
      "n": 0.5,
      "o": 65
    },
    "Alabama State": {
      "p": 29,
      "n": 0.5,
      "o": 64
    },
    "Alcorn State": {
      "p": 31,
      "n": 0.55,
      "o": 61
    },
    "Arkansas-Pine Bluff": {
      "p": 29,
      "n": 0.5,
      "o": 65
    },
    "Bethune-Cookman": {
      "p": 32,
      "n": 0.55,
      "o": 68
    },
    "Florida A&M": {
      "p": 27,
      "n": 0.5,
      "o": 65
    },
    "Grambling State": {
      "p": 31,
      "n": 0.55,
      "o": 65
    },
    "Jackson State": {
      "p": 27,
      "n": 0.5,
      "o": 62
    },
    "Mississippi Valley State": {
      "p": 26,
      "n": 0.5,
      "o": 60
    },
    "Prairie View A&M": {
      "p": 30,
      "n": 0.5,
      "o": 65
    },
    "Southern": {
      "p": 32,
      "n": 0.55,
      "o": 67
    },
    "Texas Southern": {
      "p": 48,
      "n": 0.7,
      "o": 64
    }
  },
  "Summit League": {
    "Denver": {
      "p": 33,
      "n": 0.65,
      "o": 68
    },
    "North Dakota": {
      "p": 33,
      "n": 0.65,
      "o": 68
    },
    "North Dakota State": {
      "p": 47,
      "n": 0.85,
      "o": 77
    },
    "Omaha": {
      "p": 28,
      "n": 0.6,
      "o": 68
    },
    "Oral Roberts": {
      "p": 50,
      "n": 0.85,
      "o": 65
    },
    "Saint Thomas": {
      "p": 34,
      "n": 0.7,
      "o": 77
    },
    "South Dakota": {
      "p": 30,
      "n": 0.65,
      "o": 66
    },
    "South Dakota State": {
      "p": 51,
      "n": 1.2,
      "o": 71
    },
    "UMKC": {
      "p": 33,
      "n": 0.65,
      "o": 61
    }
  },
  "West Coast": {
    "Gonzaga": {
      "p": 88,
      "n": 8.5,
      "o": 88
    },
    "Loyola-Marymount": {
      "p": 50,
      "n": 2.25,
      "o": 72
    },
    "Oregon State": {
      "p": 66,
      "n": 3,
      "o": 73
    },
    "Pacific": {
      "p": 53,
      "n": 2.4,
      "o": 77
    },
    "Pepperdine": {
      "p": 50,
      "n": 2.25,
      "o": 67
    },
    "Portland": {
      "p": 48,
      "n": 2.2,
      "o": 70
    },
    "Saint Mary's College": {
      "p": 75,
      "n": 3.3,
      "o": 86
    },
    "San Diego": {
      "p": 55,
      "n": 2.5,
      "o": 69
    },
    "San Francisco": {
      "p": 62,
      "n": 2.8,
      "o": 76
    },
    "Santa Clara": {
      "p": 60,
      "n": 2.7,
      "o": 82
    },
    "Seattle University": {
      "p": 55,
      "n": 2.5,
      "o": 77
    },
    "Washington State": {
      "p": 67,
      "n": 3,
      "o": 74
    }
  },
  "Western Athletic": {
    "Abilene Christian": {
      "p": 45,
      "n": 0.8,
      "o": 68
    },
    "California Baptist": {
      "p": 31,
      "n": 0.65,
      "o": 78
    },
    "Southern Utah": {
      "p": 30,
      "n": 0.65,
      "o": 67
    },
    "Tarleton State": {
      "p": 42,
      "n": 0.75,
      "o": 70
    },
    "UTA": {
      "p": 30,
      "n": 0.65,
      "o": 74
    },
    "Utah Tech": {
      "p": 35,
      "n": 0.7,
      "o": 73
    },
    "Utah Valley": {
      "p": 46,
      "n": 0.8,
      "o": 79
    }
  }
};

const CONF_NAMES = Object.keys(CONFERENCES);

function prestigeBar(p) {
  const n = Math.round(p / 10);
  return '█'.repeat(n) + '░'.repeat(10 - n);
}

function formatNIL(m) {
  if (m >= 1) return '$' + (m === Math.floor(m) ? m : parseFloat(m.toFixed(1))) + 'M';
  return '$' + Math.round(m * 1000) + 'K';
}
