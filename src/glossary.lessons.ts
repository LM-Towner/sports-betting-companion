export const glossaryTerms = [
  {
    term: "Moneyline",
    emoji: "💵",
    category: "Bet Type",
    definition: "A bet on which team will win the game outright, regardless of the score margin.",
    example: "Betting on the Knicks at +150 means a $100 bet returns $150 if they win.",
    calculatorPrefill: {
      odds: "+150",
      stake: 100
    },
    quiz: {
      question: "What does +150 mean in a moneyline bet?",
      choices: [
        "Bet $150 to win $100",
        "Bet $100 to win $150",
        "Team must win by more than 3 points",
      ],
      correctAnswer: "Bet $100 to win $150"
    }
  },
  {
    term: "Point Spread",
    emoji: "📊",
    category: "Bet Type",
    definition: "A handicap given to the favorite team to make the betting odds more even.",
    example: "If the 49ers are -7 favorites, they must win by more than 7 points to cover the spread.",
    calculatorPrefill: {
      odds: "-110",
      stake: 100
    },
    quiz: {
      question: "If a team is -6.5 favorites, what must happen for your bet to win?",
      choices: [
        "They must win by at least 6 points",
        "They must win by more than 6.5 points",
        "They must lose by less than 6 points",
      ],
      correctAnswer: "They must win by more than 6.5 points"
    }
  },
  {
    term: "Over/Under (Totals)",
    emoji: "📈",
    category: "Bet Type",
    definition: "A bet on whether the total combined score of both teams will be over or under a specified number.",
    example: "Betting over 44.5 means the total score must be 45 or higher to win.",
    calculatorPrefill: {
      odds: "-110",
      stake: 50
    },
    quiz: {
      question: "If you bet the over on 44.5 and the game ends 24–21, what happens?",
      choices: [
        "You win",
        "You lose",
        "It's a push",
      ],
      correctAnswer: "You win"
    }
  },
  {
    term: "Parlay",
    emoji: "🎯",
    category: "Strategy",
    definition: "A single bet that combines multiple individual bets, where all selections must win for the bet to pay out.",
    example: "Betting on 3 teams to win. If one loses, the entire parlay loses.",
    calculatorPrefill: {
      odds: "+600",
      stake: 50
    },
    quiz: {
      question: "What happens if one leg of your parlay loses?",
      choices: [
        "You still win part of the bet",
        "The entire parlay loses",
        "Only that leg is void",
      ],
      correctAnswer: "The entire parlay loses"
    }
  },
  {
    term: "Prop Bet",
    emoji: "🎪",
    category: "Bet Type",
    definition: "A bet on a specific event or occurrence within a game that doesn't directly affect the final score.",
    example: "Betting on which player will score the first touchdown.",
    calculatorPrefill: {
      odds: "+400",
      stake: 25
    },
    quiz: {
      question: "Which is an example of a prop bet?",
      choices: [
        "Team A wins the game",
        "Total score is over 45",
        "Player X scores a touchdown",
      ],
      correctAnswer: "Player X scores a touchdown"
    }
  },
];
