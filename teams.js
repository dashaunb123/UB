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
  "Conference 1": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13",
    "Team 14",
    "Team 15",
    "Team 16",
    "Team 17",
    "Team 18"
  ],
  "Conference 2": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9"
  ],
  "Conference 3": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13"
  ],
  "Conference 4": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12"
  ],
  "Conference 5": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13",
    "Team 14"
  ],
  "Conference 6": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13",
    "Team 14",
    "Team 15",
    "Team 16"
  ],
  "Conference 7": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11"
  ],
  "Conference 8": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10"
  ],
  "Conference 9": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9"
  ],
  "Conference 10": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13",
    "Team 14",
    "Team 15",
    "Team 16",
    "Team 17",
    "Team 18"
  ],
  "Conference 11": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11"
  ],
  "Conference 12": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13"
  ],
  "Conference 13": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12"
  ],
  "Conference 14": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11"
  ],
  "Conference 15": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8"
  ],
  "Conference 16": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13"
  ],
  "Conference 17": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8"
  ],
  "Conference 18": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13"
  ],
  "Conference 19": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11"
  ],
  "Conference 20": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12"
  ],
  "Conference 21": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10"
  ],
  "Conference 22": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11"
  ],
  "Conference 23": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10"
  ],
  "Conference 24": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13",
    "Team 14",
    "Team 15",
    "Team 16"
  ],
  "Conference 25": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10"
  ],
  "Conference 26": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12"
  ],
  "Conference 27": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12",
    "Team 13",
    "Team 14"
  ],
  "Conference 28": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12"
  ],
  "Conference 29": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9"
  ],
  "Conference 30": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7",
    "Team 8",
    "Team 9",
    "Team 10",
    "Team 11",
    "Team 12"
  ],
  "Conference 31": [
    "Team 1",
    "Team 2",
    "Team 3",
    "Team 4",
    "Team 5",
    "Team 6",
    "Team 7"
  ]
};

const TEAM_DATA = {
  "Conference 1": {
    "Team 1": {
      "p": 79,
      "n": 8.5,
      "o": 76
    },
    "Team 2": {
      "p": 72,
      "n": 7.5,
      "o": 84
    },
    "Team 3": {
      "p": 74,
      "n": 7.8,
      "o": 87
    },
    "Team 4": {
      "p": 100,
      "n": 15,
      "o": 99
    },
    "Team 5": {
      "p": 76,
      "n": 8.1,
      "o": 85
    },
    "Team 6": {
      "p": 72,
      "n": 7.5,
      "o": 73
    },
    "Team 7": {
      "p": 89,
      "n": 12,
      "o": 93
    },
    "Team 8": {
      "p": 75,
      "n": 8.1,
      "o": 87
    },
    "Team 9": {
      "p": 99,
      "n": 13.5,
      "o": 94
    },
    "Team 10": {
      "p": 77,
      "n": 8.2,
      "o": 88
    },
    "Team 11": {
      "p": 76,
      "n": 8.4,
      "o": 81
    },
    "Team 12": {
      "p": 76,
      "n": 8.1,
      "o": 79
    },
    "Team 13": {
      "p": 72,
      "n": 7.8,
      "o": 87
    },
    "Team 14": {
      "p": 75,
      "n": 8.1,
      "o": 85
    },
    "Team 15": {
      "p": 84,
      "n": 9.6,
      "o": 82
    },
    "Team 16": {
      "p": 83,
      "n": 9.3,
      "o": 92
    },
    "Team 17": {
      "p": 72,
      "n": 7.5,
      "o": 84
    },
    "Team 18": {
      "p": 75,
      "n": 7.9,
      "o": 85
    }
  },
  "Conference 2": {
    "Team 1": {
      "p": 30,
      "n": 0.6,
      "o": 62
    },
    "Team 2": {
      "p": 33,
      "n": 0.65,
      "o": 60
    },
    "Team 3": {
      "p": 33,
      "n": 0.65,
      "o": 60
    },
    "Team 4": {
      "p": 31,
      "n": 0.6,
      "o": 61
    },
    "Team 5": {
      "p": 30,
      "n": 0.6,
      "o": 61
    },
    "Team 6": {
      "p": 26,
      "n": 0.55,
      "o": 61
    },
    "Team 7": {
      "p": 27,
      "n": 0.55,
      "o": 61
    },
    "Team 8": {
      "p": 34,
      "n": 0.65,
      "o": 69
    },
    "Team 9": {
      "p": 58,
      "n": 1.5,
      "o": 70
    }
  },
  "Conference 3": {
    "Team 1": {
      "p": 57,
      "n": 3.05,
      "o": 73
    },
    "Team 2": {
      "p": 53,
      "n": 2.85,
      "o": 68
    },
    "Team 3": {
      "p": 62,
      "n": 2.9,
      "o": 79
    },
    "Team 4": {
      "p": 82,
      "n": 5,
      "o": 79
    },
    "Team 5": {
      "p": 58,
      "n": 3.1,
      "o": 75
    },
    "Team 6": {
      "p": 49,
      "n": 2.65,
      "o": 68
    },
    "Team 7": {
      "p": 50,
      "n": 2.7,
      "o": 86
    },
    "Team 8": {
      "p": 68,
      "n": 3.6,
      "o": 76
    },
    "Team 9": {
      "p": 48,
      "n": 2.6,
      "o": 70
    },
    "Team 10": {
      "p": 51,
      "n": 2.75,
      "o": 83
    },
    "Team 11": {
      "p": 60,
      "n": 3.2,
      "o": 78
    },
    "Team 12": {
      "p": 56,
      "n": 3,
      "o": 61
    },
    "Team 13": {
      "p": 70,
      "n": 3.4,
      "o": 84
    }
  },
  "Conference 4": {
    "Team 1": {
      "p": 30,
      "n": 0.65,
      "o": 71
    },
    "Team 2": {
      "p": 34,
      "n": 0.65,
      "o": 65
    },
    "Team 3": {
      "p": 30,
      "n": 0.65,
      "o": 71
    },
    "Team 4": {
      "p": 32,
      "n": 0.65,
      "o": 64
    },
    "Team 5": {
      "p": 34,
      "n": 0.65,
      "o": 66
    },
    "Team 6": {
      "p": 37,
      "n": 0.7,
      "o": 64
    },
    "Team 7": {
      "p": 27,
      "n": 0.6,
      "o": 68
    },
    "Team 8": {
      "p": 32,
      "n": 0.65,
      "o": 61
    },
    "Team 9": {
      "p": 33,
      "n": 0.65,
      "o": 61
    },
    "Team 10": {
      "p": 36,
      "n": 0.7,
      "o": 72
    },
    "Team 11": {
      "p": 31,
      "n": 0.65,
      "o": 62
    },
    "Team 12": {
      "p": 36,
      "n": 0.7,
      "o": 63
    }
  },
  "Conference 5": {
    "Team 1": {
      "p": 62,
      "n": 2.95,
      "o": 79
    },
    "Team 2": {
      "p": 72,
      "n": 4,
      "o": 84
    },
    "Team 3": {
      "p": 56,
      "n": 2.65,
      "o": 78
    },
    "Team 4": {
      "p": 51,
      "n": 2.4,
      "o": 73
    },
    "Team 5": {
      "p": 60,
      "n": 2.85,
      "o": 80
    },
    "Team 6": {
      "p": 58,
      "n": 2.75,
      "o": 80
    },
    "Team 7": {
      "p": 59,
      "n": 2.8,
      "o": 68
    },
    "Team 8": {
      "p": 63,
      "n": 3,
      "o": 65
    },
    "Team 9": {
      "p": 50,
      "n": 2.35,
      "o": 75
    },
    "Team 10": {
      "p": 60,
      "n": 2.85,
      "o": 76
    },
    "Team 11": {
      "p": 60,
      "n": 2.85,
      "o": 76
    },
    "Team 12": {
      "p": 55,
      "n": 2.6,
      "o": 78
    },
    "Team 13": {
      "p": 63,
      "n": 3,
      "o": 86
    },
    "Team 14": {
      "p": 70,
      "n": 3.5,
      "o": 86
    }
  },
  "Conference 6": {
    "Team 1": {
      "p": 91,
      "n": 10.5,
      "o": 99
    },
    "Team 2": {
      "p": 73,
      "n": 7.9,
      "o": 84
    },
    "Team 3": {
      "p": 86,
      "n": 9.9,
      "o": 89
    },
    "Team 4": {
      "p": 78,
      "n": 13,
      "o": 91
    },
    "Team 5": {
      "p": 78,
      "n": 8.6,
      "o": 88
    },
    "Team 6": {
      "p": 72,
      "n": 7.7,
      "o": 81
    },
    "Team 7": {
      "p": 88,
      "n": 10.5,
      "o": 99
    },
    "Team 8": {
      "p": 82,
      "n": 9.7,
      "o": 96
    },
    "Team 9": {
      "p": 99,
      "n": 12.5,
      "o": 94
    },
    "Team 10": {
      "p": 76,
      "n": 8.3,
      "o": 81
    },
    "Team 11": {
      "p": 75,
      "n": 8.1,
      "o": 81
    },
    "Team 12": {
      "p": 73,
      "n": 7.8,
      "o": 87
    },
    "Team 13": {
      "p": 81,
      "n": 11.5,
      "o": 92
    },
    "Team 14": {
      "p": 75,
      "n": 8.1,
      "o": 85
    },
    "Team 15": {
      "p": 73,
      "n": 7.8,
      "o": 76
    },
    "Team 16": {
      "p": 76,
      "n": 8.5,
      "o": 85
    }
  },
  "Conference 7": {
    "Team 1": {
      "p": 79,
      "n": 8.1,
      "o": 82
    },
    "Team 2": {
      "p": 96,
      "n": 11,
      "o": 98
    },
    "Team 3": {
      "p": 78,
      "n": 8.3,
      "o": 82
    },
    "Team 4": {
      "p": 83,
      "n": 8.7,
      "o": 79
    },
    "Team 5": {
      "p": 74,
      "n": 7.6,
      "o": 81
    },
    "Team 6": {
      "p": 82,
      "n": 8,
      "o": 82
    },
    "Team 7": {
      "p": 78,
      "n": 8.1,
      "o": 81
    },
    "Team 8": {
      "p": 80,
      "n": 10.5,
      "o": 96
    },
    "Team 9": {
      "p": 76,
      "n": 7.8,
      "o": 85
    },
    "Team 10": {
      "p": 88,
      "n": 8,
      "o": 93
    },
    "Team 11": {
      "p": 77,
      "n": 8,
      "o": 81
    }
  },
  "Conference 8": {
    "Team 1": {
      "p": 42,
      "n": 0.7,
      "o": 69
    },
    "Team 2": {
      "p": 25,
      "n": 0.5,
      "o": 71
    },
    "Team 3": {
      "p": 31,
      "n": 0.55,
      "o": 66
    },
    "Team 4": {
      "p": 44,
      "n": 0.7,
      "o": 69
    },
    "Team 5": {
      "p": 43,
      "n": 0.7,
      "o": 74
    },
    "Team 6": {
      "p": 33,
      "n": 0.6,
      "o": 63
    },
    "Team 7": {
      "p": 29,
      "n": 0.55,
      "o": 71
    },
    "Team 8": {
      "p": 30,
      "n": 0.55,
      "o": 71
    },
    "Team 9": {
      "p": 33,
      "n": 0.6,
      "o": 65
    },
    "Team 10": {
      "p": 43,
      "n": 0.7,
      "o": 69
    }
  },
  "Conference 9": {
    "Team 1": {
      "p": 30,
      "n": 0.5,
      "o": 66
    },
    "Team 2": {
      "p": 27,
      "n": 0.5,
      "o": 60
    },
    "Team 3": {
      "p": 48,
      "n": 0.65,
      "o": 82
    },
    "Team 4": {
      "p": 29,
      "n": 0.5,
      "o": 65
    },
    "Team 5": {
      "p": 25,
      "n": 0.45,
      "o": 64
    },
    "Team 6": {
      "p": 26,
      "n": 0.45,
      "o": 64
    },
    "Team 7": {
      "p": 25,
      "n": 0.45,
      "o": 62
    },
    "Team 8": {
      "p": 34,
      "n": 0.55,
      "o": 67
    },
    "Team 9": {
      "p": 25,
      "n": 0.45,
      "o": 77
    }
  },
  "Conference 10": {
    "Team 1": {
      "p": 83,
      "n": 9.3,
      "o": 96
    },
    "Team 2": {
      "p": 91,
      "n": 15,
      "o": 90
    },
    "Team 3": {
      "p": 76,
      "n": 8.7,
      "o": 91
    },
    "Team 4": {
      "p": 81,
      "n": 9.5,
      "o": 76
    },
    "Team 5": {
      "p": 84,
      "n": 11,
      "o": 99
    },
    "Team 6": {
      "p": 90,
      "n": 10.5,
      "o": 98
    },
    "Team 7": {
      "p": 72,
      "n": 7.9,
      "o": 81
    },
    "Team 8": {
      "p": 73,
      "n": 8.1,
      "o": 95
    },
    "Team 9": {
      "p": 70,
      "n": 7.6,
      "o": 84
    },
    "Team 10": {
      "p": 80,
      "n": 9.8,
      "o": 89
    },
    "Team 11": {
      "p": 81,
      "n": 9.8,
      "o": 79
    },
    "Team 12": {
      "p": 71,
      "n": 7.7,
      "o": 76
    },
    "Team 13": {
      "p": 87,
      "n": 9.8,
      "o": 99
    },
    "Team 14": {
      "p": 72,
      "n": 7.9,
      "o": 76
    },
    "Team 15": {
      "p": 96,
      "n": 9.5,
      "o": 94
    },
    "Team 16": {
      "p": 78,
      "n": 9.2,
      "o": 82
    },
    "Team 17": {
      "p": 76,
      "n": 8.8,
      "o": 85
    },
    "Team 18": {
      "p": 80,
      "n": 9.4,
      "o": 91
    }
  },
  "Conference 11": {
    "Team 1": {
      "p": 38,
      "n": 0.8,
      "o": 67
    },
    "Team 2": {
      "p": 36,
      "n": 0.8,
      "o": 62
    },
    "Team 3": {
      "p": 29,
      "n": 0.7,
      "o": 71
    },
    "Team 4": {
      "p": 32,
      "n": 0.7,
      "o": 71
    },
    "Team 5": {
      "p": 47,
      "n": 0.95,
      "o": 77
    },
    "Team 6": {
      "p": 48,
      "n": 0.95,
      "o": 68
    },
    "Team 7": {
      "p": 34,
      "n": 0.75,
      "o": 72
    },
    "Team 8": {
      "p": 52,
      "n": 1.4,
      "o": 78
    },
    "Team 9": {
      "p": 32,
      "n": 0.7,
      "o": 64
    },
    "Team 10": {
      "p": 50,
      "n": 0.95,
      "o": 78
    },
    "Team 11": {
      "p": 49,
      "n": 0.95,
      "o": 74
    }
  },
  "Conference 12": {
    "Team 1": {
      "p": 38,
      "n": 0.9,
      "o": 69
    },
    "Team 2": {
      "p": 57,
      "n": 1.2,
      "o": 75
    },
    "Team 3": {
      "p": 37,
      "n": 0.9,
      "o": 69
    },
    "Team 4": {
      "p": 32,
      "n": 0.8,
      "o": 67
    },
    "Team 5": {
      "p": 31,
      "n": 0.8,
      "o": 65
    },
    "Team 6": {
      "p": 31,
      "n": 0.8,
      "o": 80
    },
    "Team 7": {
      "p": 38,
      "n": 0.9,
      "o": 72
    },
    "Team 8": {
      "p": 40,
      "n": 0.95,
      "o": 65
    },
    "Team 9": {
      "p": 31,
      "n": 0.8,
      "o": 63
    },
    "Team 10": {
      "p": 34,
      "n": 0.85,
      "o": 67
    },
    "Team 11": {
      "p": 31,
      "n": 0.8,
      "o": 71
    },
    "Team 12": {
      "p": 52,
      "n": 1.1,
      "o": 80
    },
    "Team 13": {
      "p": 39,
      "n": 0.9,
      "o": 77
    }
  },
  "Conference 13": {
    "Team 1": {
      "p": 39,
      "n": 1.25,
      "o": 65
    },
    "Team 2": {
      "p": 45,
      "n": 1.35,
      "o": 69
    },
    "Team 3": {
      "p": 42,
      "n": 1.3,
      "o": 69
    },
    "Team 4": {
      "p": 46,
      "n": 1.4,
      "o": 74
    },
    "Team 5": {
      "p": 61,
      "n": 2,
      "o": 78
    },
    "Team 6": {
      "p": 56,
      "n": 1.65,
      "o": 70
    },
    "Team 7": {
      "p": 47,
      "n": 1.4,
      "o": 74
    },
    "Team 8": {
      "p": 44,
      "n": 1.35,
      "o": 69
    },
    "Team 9": {
      "p": 58,
      "n": 1.7,
      "o": 73
    },
    "Team 10": {
      "p": 38,
      "n": 1.2,
      "o": 77
    },
    "Team 11": {
      "p": 47,
      "n": 1.4,
      "o": 67
    },
    "Team 12": {
      "p": 62,
      "n": 1.75,
      "o": 76
    }
  },
  "Conference 14": {
    "Team 1": {
      "p": 46,
      "n": 1.85,
      "o": 63
    },
    "Team 2": {
      "p": 45,
      "n": 1.85,
      "o": 67
    },
    "Team 3": {
      "p": 42,
      "n": 1.75,
      "o": 67
    },
    "Team 4": {
      "p": 35,
      "n": 1.55,
      "o": 63
    },
    "Team 5": {
      "p": 45,
      "n": 1.85,
      "o": 67
    },
    "Team 6": {
      "p": 47,
      "n": 1.9,
      "o": 73
    },
    "Team 7": {
      "p": 50,
      "n": 1.4,
      "o": 73
    },
    "Team 8": {
      "p": 35,
      "n": 1.55,
      "o": 66
    },
    "Team 9": {
      "p": 35,
      "n": 1.55,
      "o": 74
    },
    "Team 10": {
      "p": 47,
      "n": 1.9,
      "o": 77
    },
    "Team 11": {
      "p": 39,
      "n": 1.65,
      "o": 67
    }
  },
  "Conference 15": {
    "Team 1": {
      "p": 36,
      "n": 0.95,
      "o": 64
    },
    "Team 2": {
      "p": 42,
      "n": 1.05,
      "o": 72
    },
    "Team 3": {
      "p": 49,
      "n": 1.2,
      "o": 75
    },
    "Team 4": {
      "p": 39,
      "n": 1,
      "o": 66
    },
    "Team 5": {
      "p": 53,
      "n": 1.25,
      "o": 75
    },
    "Team 6": {
      "p": 52,
      "n": 1.25,
      "o": 75
    },
    "Team 7": {
      "p": 56,
      "n": 1.7,
      "o": 68
    },
    "Team 8": {
      "p": 54,
      "n": 1.4,
      "o": 83
    }
  },
  "Conference 16": {
    "Team 1": {
      "p": 33,
      "n": 0.65,
      "o": 61
    },
    "Team 2": {
      "p": 27,
      "n": 0.6,
      "o": 66
    },
    "Team 3": {
      "p": 53,
      "n": 0.9,
      "o": 68
    },
    "Team 4": {
      "p": 27,
      "n": 0.6,
      "o": 61
    },
    "Team 5": {
      "p": 35,
      "n": 0.7,
      "o": 72
    },
    "Team 6": {
      "p": 45,
      "n": 0.8,
      "o": 73
    },
    "Team 7": {
      "p": 35,
      "n": 0.7,
      "o": 65
    },
    "Team 8": {
      "p": 36,
      "n": 0.7,
      "o": 61
    },
    "Team 9": {
      "p": 45,
      "n": 0.8,
      "o": 69
    },
    "Team 10": {
      "p": 34,
      "n": 0.65,
      "o": 60
    },
    "Team 11": {
      "p": 31,
      "n": 0.65,
      "o": 63
    },
    "Team 12": {
      "p": 50,
      "n": 0.85,
      "o": 68
    },
    "Team 13": {
      "p": 28,
      "n": 0.6,
      "o": 71
    }
  },
  "Conference 17": {
    "Team 1": {
      "p": 28,
      "n": 0.45,
      "o": 60
    },
    "Team 2": {
      "p": 29,
      "n": 0.45,
      "o": 60
    },
    "Team 3": {
      "p": 43,
      "n": 0.6,
      "o": 69
    },
    "Team 4": {
      "p": 21,
      "n": 0.4,
      "o": 60
    },
    "Team 5": {
      "p": 23,
      "n": 0.45,
      "o": 60
    },
    "Team 6": {
      "p": 45,
      "n": 0.6,
      "o": 63
    },
    "Team 7": {
      "p": 29,
      "n": 0.45,
      "o": 60
    },
    "Team 8": {
      "p": 24,
      "n": 0.45,
      "o": 60
    }
  },
  "Conference 18": {
    "Team 1": {
      "p": 55,
      "n": 1.4,
      "o": 83
    },
    "Team 2": {
      "p": 34,
      "n": 1.1,
      "o": 63
    },
    "Team 3": {
      "p": 42,
      "n": 1.25,
      "o": 74
    },
    "Team 4": {
      "p": 44,
      "n": 1.3,
      "o": 69
    },
    "Team 5": {
      "p": 39,
      "n": 1.2,
      "o": 65
    },
    "Team 6": {
      "p": 37,
      "n": 1.15,
      "o": 67
    },
    "Team 7": {
      "p": 54,
      "n": 1.55,
      "o": 75
    },
    "Team 8": {
      "p": 43,
      "n": 1.3,
      "o": 82
    },
    "Team 9": {
      "p": 44,
      "n": 1.3,
      "o": 61
    },
    "Team 10": {
      "p": 54,
      "n": 1.55,
      "o": 68
    },
    "Team 11": {
      "p": 52,
      "n": 1.5,
      "o": 75
    },
    "Team 12": {
      "p": 58,
      "n": 1.6,
      "o": 70
    },
    "Team 13": {
      "p": 37,
      "n": 1.15,
      "o": 65
    }
  },
  "Conference 19": {
    "Team 1": {
      "p": 56,
      "n": 1.7,
      "o": 83
    },
    "Team 2": {
      "p": 58,
      "n": 1.75,
      "o": 78
    },
    "Team 3": {
      "p": 62,
      "n": 2,
      "o": 70
    },
    "Team 4": {
      "p": 44,
      "n": 1.35,
      "o": 63
    },
    "Team 5": {
      "p": 45,
      "n": 1.4,
      "o": 80
    },
    "Team 6": {
      "p": 55,
      "n": 1.65,
      "o": 70
    },
    "Team 7": {
      "p": 58,
      "n": 1.75,
      "o": 78
    },
    "Team 8": {
      "p": 56,
      "n": 1.7,
      "o": 80
    },
    "Team 9": {
      "p": 47,
      "n": 1.45,
      "o": 77
    },
    "Team 10": {
      "p": 45,
      "n": 1.4,
      "o": 77
    },
    "Team 11": {
      "p": 48,
      "n": 1.5,
      "o": 74
    }
  },
  "Conference 20": {
    "Team 1": {
      "p": 61,
      "n": 2.95,
      "o": 60
    },
    "Team 2": {
      "p": 66,
      "n": 3.2,
      "o": 83
    },
    "Team 3": {
      "p": 53,
      "n": 2.55,
      "o": 80
    },
    "Team 4": {
      "p": 53,
      "n": 2.55,
      "o": 75
    },
    "Team 5": {
      "p": 63,
      "n": 3.2,
      "o": 83
    },
    "Team 6": {
      "p": 65,
      "n": 3.15,
      "o": 83
    },
    "Team 7": {
      "p": 70,
      "n": 3.4,
      "o": 86
    },
    "Team 8": {
      "p": 78,
      "n": 4.5,
      "o": 88
    },
    "Team 9": {
      "p": 56,
      "n": 2.7,
      "o": 68
    },
    "Team 10": {
      "p": 72,
      "n": 3.2,
      "o": 79
    },
    "Team 11": {
      "p": 66,
      "n": 3.2,
      "o": 90
    },
    "Team 12": {
      "p": 62,
      "n": 3,
      "o": 81
    }
  },
  "Conference 21": {
    "Team 1": {
      "p": 24,
      "n": 0.45,
      "o": 63
    },
    "Team 2": {
      "p": 30,
      "n": 0.5,
      "o": 60
    },
    "Team 3": {
      "p": 30,
      "n": 0.5,
      "o": 61
    },
    "Team 4": {
      "p": 23,
      "n": 0.45,
      "o": 63
    },
    "Team 5": {
      "p": 21,
      "n": 0.4,
      "o": 68
    },
    "Team 6": {
      "p": 20,
      "n": 0.4,
      "o": 64
    },
    "Team 7": {
      "p": 23,
      "n": 0.45,
      "o": 61
    },
    "Team 8": {
      "p": 24,
      "n": 0.45,
      "o": 60
    },
    "Team 9": {
      "p": 20,
      "n": 0.4,
      "o": 61
    },
    "Team 10": {
      "p": 27,
      "n": 0.45,
      "o": 62
    }
  },
  "Conference 22": {
    "Team 1": {
      "p": 30,
      "n": 0.55,
      "o": 62
    },
    "Team 2": {
      "p": 34,
      "n": 0.6,
      "o": 66
    },
    "Team 3": {
      "p": 45,
      "n": 0.7,
      "o": 63
    },
    "Team 4": {
      "p": 47,
      "n": 0.7,
      "o": 67
    },
    "Team 5": {
      "p": 27,
      "n": 0.5,
      "o": 64
    },
    "Team 6": {
      "p": 28,
      "n": 0.55,
      "o": 66
    },
    "Team 7": {
      "p": 32,
      "n": 0.55,
      "o": 61
    },
    "Team 8": {
      "p": 34,
      "n": 0.6,
      "o": 72
    },
    "Team 9": {
      "p": 30,
      "n": 0.55,
      "o": 62
    },
    "Team 10": {
      "p": 32,
      "n": 0.55,
      "o": 68
    },
    "Team 11": {
      "p": 30,
      "n": 0.55,
      "o": 60
    }
  },
  "Conference 23": {
    "Team 1": {
      "p": 33,
      "n": 0.65,
      "o": 66
    },
    "Team 2": {
      "p": 41,
      "n": 0.7,
      "o": 61
    },
    "Team 3": {
      "p": 42,
      "n": 0.75,
      "o": 66
    },
    "Team 4": {
      "p": 45,
      "n": 0.75,
      "o": 61
    },
    "Team 5": {
      "p": 48,
      "n": 0.8,
      "o": 70
    },
    "Team 6": {
      "p": 34,
      "n": 0.65,
      "o": 61
    },
    "Team 7": {
      "p": 28,
      "n": 0.6,
      "o": 61
    },
    "Team 8": {
      "p": 35,
      "n": 0.65,
      "o": 65
    },
    "Team 9": {
      "p": 33,
      "n": 0.65,
      "o": 62
    },
    "Team 10": {
      "p": 41,
      "n": 0.7,
      "o": 74
    }
  },
  "Conference 24": {
    "Team 1": {
      "p": 83,
      "n": 9.8,
      "o": 97
    },
    "Team 2": {
      "p": 86,
      "n": 13,
      "o": 93
    },
    "Team 3": {
      "p": 82,
      "n": 9.6,
      "o": 89
    },
    "Team 4": {
      "p": 84,
      "n": 9.8,
      "o": 97
    },
    "Team 5": {
      "p": 72,
      "n": 9.4,
      "o": 87
    },
    "Team 6": {
      "p": 99,
      "n": 22,
      "o": 94
    },
    "Team 7": {
      "p": 76,
      "n": 9.9,
      "o": 85
    },
    "Team 8": {
      "p": 72,
      "n": 9.2,
      "o": 79
    },
    "Team 9": {
      "p": 73,
      "n": 9.5,
      "o": 84
    },
    "Team 10": {
      "p": 78,
      "n": 9.9,
      "o": 88
    },
    "Team 11": {
      "p": 72,
      "n": 9.2,
      "o": 81
    },
    "Team 12": {
      "p": 73,
      "n": 9.3,
      "o": 79
    },
    "Team 13": {
      "p": 86,
      "n": 10.5,
      "o": 92
    },
    "Team 14": {
      "p": 86,
      "n": 11,
      "o": 90
    },
    "Team 15": {
      "p": 76,
      "n": 9.9,
      "o": 88
    },
    "Team 16": {
      "p": 71,
      "n": 9,
      "o": 95
    }
  },
  "Conference 25": {
    "Team 1": {
      "p": 50,
      "n": 0.9,
      "o": 64
    },
    "Team 2": {
      "p": 51,
      "n": 0.9,
      "o": 75
    },
    "Team 3": {
      "p": 51,
      "n": 0.9,
      "o": 73
    },
    "Team 4": {
      "p": 30,
      "n": 0.65,
      "o": 68
    },
    "Team 5": {
      "p": 52,
      "n": 0.95,
      "o": 70
    },
    "Team 6": {
      "p": 32,
      "n": 0.65,
      "o": 61
    },
    "Team 7": {
      "p": 33,
      "n": 0.7,
      "o": 64
    },
    "Team 8": {
      "p": 34,
      "n": 0.7,
      "o": 60
    },
    "Team 9": {
      "p": 30,
      "n": 0.65,
      "o": 66
    },
    "Team 10": {
      "p": 30,
      "n": 0.65,
      "o": 65
    }
  },
  "Conference 26": {
    "Team 1": {
      "p": 27,
      "n": 0.55,
      "o": 62
    },
    "Team 2": {
      "p": 25,
      "n": 0.5,
      "o": 63
    },
    "Team 3": {
      "p": 32,
      "n": 0.6,
      "o": 64
    },
    "Team 4": {
      "p": 33,
      "n": 0.6,
      "o": 65
    },
    "Team 5": {
      "p": 54,
      "n": 1.6,
      "o": 83
    },
    "Team 6": {
      "p": 33,
      "n": 0.6,
      "o": 69
    },
    "Team 7": {
      "p": 27,
      "n": 0.55,
      "o": 64
    },
    "Team 8": {
      "p": 31,
      "n": 0.55,
      "o": 62
    },
    "Team 9": {
      "p": 30,
      "n": 0.55,
      "o": 63
    },
    "Team 10": {
      "p": 50,
      "n": 0.75,
      "o": 80
    },
    "Team 11": {
      "p": 25,
      "n": 0.5,
      "o": 68
    },
    "Team 12": {
      "p": 42,
      "n": 0.7,
      "o": 77
    }
  },
  "Conference 27": {
    "Team 1": {
      "p": 34,
      "n": 1,
      "o": 72
    },
    "Team 2": {
      "p": 34,
      "n": 1,
      "o": 74
    },
    "Team 3": {
      "p": 34,
      "n": 1,
      "o": 67
    },
    "Team 4": {
      "p": 39,
      "n": 1.1,
      "o": 67
    },
    "Team 5": {
      "p": 37,
      "n": 1.1,
      "o": 63
    },
    "Team 6": {
      "p": 33,
      "n": 1,
      "o": 69
    },
    "Team 7": {
      "p": 42,
      "n": 1.2,
      "o": 63
    },
    "Team 8": {
      "p": 39,
      "n": 1.1,
      "o": 72
    },
    "Team 9": {
      "p": 37,
      "n": 1.1,
      "o": 66
    },
    "Team 10": {
      "p": 35,
      "n": 1.05,
      "o": 72
    },
    "Team 11": {
      "p": 35,
      "n": 1.05,
      "o": 69
    },
    "Team 12": {
      "p": 39,
      "n": 1.1,
      "o": 67
    },
    "Team 13": {
      "p": 34,
      "n": 1,
      "o": 74
    },
    "Team 14": {
      "p": 40,
      "n": 1.15,
      "o": 60
    }
  },
  "Conference 28": {
    "Team 1": {
      "p": 26,
      "n": 0.5,
      "o": 62
    },
    "Team 2": {
      "p": 29,
      "n": 0.5,
      "o": 62
    },
    "Team 3": {
      "p": 31,
      "n": 0.55,
      "o": 60
    },
    "Team 4": {
      "p": 29,
      "n": 0.5,
      "o": 62
    },
    "Team 5": {
      "p": 32,
      "n": 0.55,
      "o": 65
    },
    "Team 6": {
      "p": 27,
      "n": 0.5,
      "o": 62
    },
    "Team 7": {
      "p": 31,
      "n": 0.55,
      "o": 62
    },
    "Team 8": {
      "p": 27,
      "n": 0.5,
      "o": 60
    },
    "Team 9": {
      "p": 26,
      "n": 0.5,
      "o": 60
    },
    "Team 10": {
      "p": 30,
      "n": 0.5,
      "o": 62
    },
    "Team 11": {
      "p": 32,
      "n": 0.55,
      "o": 64
    },
    "Team 12": {
      "p": 48,
      "n": 0.7,
      "o": 62
    }
  },
  "Conference 29": {
    "Team 1": {
      "p": 33,
      "n": 0.65,
      "o": 66
    },
    "Team 2": {
      "p": 33,
      "n": 0.65,
      "o": 66
    },
    "Team 3": {
      "p": 47,
      "n": 0.85,
      "o": 77
    },
    "Team 4": {
      "p": 28,
      "n": 0.6,
      "o": 64
    },
    "Team 5": {
      "p": 50,
      "n": 0.85,
      "o": 63
    },
    "Team 6": {
      "p": 34,
      "n": 0.7,
      "o": 77
    },
    "Team 7": {
      "p": 30,
      "n": 0.65,
      "o": 63
    },
    "Team 8": {
      "p": 51,
      "n": 1.2,
      "o": 70
    },
    "Team 9": {
      "p": 33,
      "n": 0.65,
      "o": 60
    }
  },
  "Conference 30": {
    "Team 1": {
      "p": 88,
      "n": 8.5,
      "o": 98
    },
    "Team 2": {
      "p": 50,
      "n": 2.25,
      "o": 73
    },
    "Team 3": {
      "p": 66,
      "n": 3,
      "o": 73
    },
    "Team 4": {
      "p": 53,
      "n": 2.4,
      "o": 78
    },
    "Team 5": {
      "p": 50,
      "n": 2.25,
      "o": 65
    },
    "Team 6": {
      "p": 48,
      "n": 2.2,
      "o": 70
    },
    "Team 7": {
      "p": 75,
      "n": 3.3,
      "o": 91
    },
    "Team 8": {
      "p": 55,
      "n": 2.5,
      "o": 68
    },
    "Team 9": {
      "p": 62,
      "n": 2.8,
      "o": 79
    },
    "Team 10": {
      "p": 60,
      "n": 2.7,
      "o": 86
    },
    "Team 11": {
      "p": 55,
      "n": 2.5,
      "o": 78
    },
    "Team 12": {
      "p": 67,
      "n": 3,
      "o": 76
    }
  },
  "Conference 31": {
    "Team 1": {
      "p": 45,
      "n": 0.8,
      "o": 66
    },
    "Team 2": {
      "p": 31,
      "n": 0.65,
      "o": 80
    },
    "Team 3": {
      "p": 30,
      "n": 0.65,
      "o": 64
    },
    "Team 4": {
      "p": 42,
      "n": 0.75,
      "o": 67
    },
    "Team 5": {
      "p": 30,
      "n": 0.65,
      "o": 71
    },
    "Team 6": {
      "p": 35,
      "n": 0.7,
      "o": 72
    },
    "Team 7": {
      "p": 46,
      "n": 0.8,
      "o": 80
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
