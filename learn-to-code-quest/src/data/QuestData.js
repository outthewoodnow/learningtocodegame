const containsAny = (code, patterns) => patterns.some((pattern) => pattern.test(code));

export const quests = [
  {
    id: 1,
    title: 'The First Rune',
    description:
      'A sealed gate blocks your path. Declare a variable called heroName and store your name in a string.',
    starterCode: `// Declare your hero's name\n\n`,
    hint: 'Use let or const and assign a string value to heroName.',
    xpReward: 60,
    // Validation checks for either let/const heroName with a quoted string assignment.
    validate: (code) => /\b(let|const)\s+heroName\s*=\s*['"`].+['"`]\s*;?/m.test(code)
  },
  {
    id: 2,
    title: 'Flame of Conditions',
    description:
      'A torch puzzle asks: if level is greater than 5, log "Power unlocked".',
    starterCode: `const level = 8;\n\n`,
    hint: 'Write an if statement with level > 5 and console.log("Power unlocked").',
    xpReward: 80,
    // Validation ensures an if condition uses level > 5 and logs the expected phrase.
    validate: (code) =>
      /\bif\s*\(\s*level\s*>\s*5\s*\)\s*\{?[\s\S]*console\.log\s*\(\s*['"]Power unlocked['"]\s*\)/m.test(
        code
      )
  },
  {
    id: 3,
    title: 'Loop of Echoes',
    description:
      'Summon a for loop that counts from 0 to 2 and logs the counter each turn.',
    starterCode: `// Build your loop below\n\n`,
    hint: 'Try: for (let i = 0; i < 3; i++) { console.log(i); }',
    xpReward: 100,
    // Validation accepts common for-loop forms and requires logging the loop variable.
    validate: (code) => {
      const hasForLoop = /\bfor\s*\(\s*(let|var)\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*3\s*;\s*\w+\+\+\s*\)/m.test(
        code
      );
      const hasConsoleLog = /console\.log\s*\(\s*\w+\s*\)/m.test(code);
      return hasForLoop && hasConsoleLog;
    }
  },
  {
    id: 4,
    title: 'Array of Relics',
    description:
      'Create an array named relics with at least three string items, then log relics.length.',
    starterCode: `// Collect relics\n\n`,
    hint: 'Example: const relics = ["orb", "blade", "ring"]; console.log(relics.length);',
    xpReward: 120,
    // Validation checks for an array declaration with bracket syntax and a length log.
    validate: (code) => {
      const hasArray = /\b(const|let)\s+relics\s*=\s*\[[^\]]+\]\s*;?/m.test(code);
      const hasLengthLog = /console\.log\s*\(\s*relics\.length\s*\)\s*;?/m.test(code);
      return hasArray && hasLengthLog;
    }
  }
];

export const getQuestById = (id) => quests.find((quest) => quest.id === id);
