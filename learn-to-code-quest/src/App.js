import { useEffect, useMemo, useState } from 'react';
import Confetti from 'react-confetti';
import EditorComponent from './components/EditorComponent';
import { getQuestById, quests } from './data/QuestData';

const MAX_HEALTH = 100;
const HEALTH_PENALTY = 12;

const getLevelFromXp = (xp) => Math.floor(xp / 100) + 1;

function App() {
  const [xp, setXp] = useState(0);
  const [health, setHealth] = useState(MAX_HEALTH);
  const [currentQuestId, setCurrentQuestId] = useState(quests[0].id);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [feedback, setFeedback] = useState('Welcome, mage. Solve your first quest to begin.');
  const [showConfetti, setShowConfetti] = useState(false);

  const currentQuest = useMemo(() => getQuestById(currentQuestId), [currentQuestId]);
  const [code, setCode] = useState(currentQuest?.starterCode ?? '');

  const level = getLevelFromXp(xp);
  const xpInCurrentLevel = xp % 100;
  const isQuestComplete = completedQuests.includes(currentQuestId);
  const gameComplete = completedQuests.length === quests.length;

  useEffect(() => {
    setCode(currentQuest?.starterCode ?? '');
    setFeedback(`Quest loaded: ${currentQuest?.title ?? 'Unknown quest'}.`);
  }, [currentQuestId, currentQuest?.starterCode, currentQuest?.title]);

  useEffect(() => {
    if (!showConfetti) return;
    const timer = setTimeout(() => setShowConfetti(false), 1800);
    return () => clearTimeout(timer);
  }, [showConfetti]);

  const handleSubmit = () => {
    if (!currentQuest || gameComplete || health <= 0) return;

    const passed = currentQuest.validate(code);

    if (passed) {
      if (!completedQuests.includes(currentQuest.id)) {
        setXp((prev) => prev + currentQuest.xpReward);
        setCompletedQuests((prev) => [...prev, currentQuest.id]);
      }

      setShowConfetti(true);

      const nextQuest = quests.find((q) => q.id === currentQuest.id + 1);

      if (nextQuest) {
        setFeedback(`Success! +${currentQuest.xpReward} XP earned. Next quest unlocked.`);
        setCurrentQuestId(nextQuest.id);
      } else {
        setFeedback('Legendary work. You completed every quest in the realm.');
      }

      return;
    }

    setHealth((prev) => Math.max(0, prev - HEALTH_PENALTY));
    setFeedback(`Spell fizzled. Hint: ${currentQuest.hint}`);
  };

  const resetRun = () => {
    setXp(0);
    setHealth(MAX_HEALTH);
    setCurrentQuestId(quests[0].id);
    setCompletedQuests([]);
    setShowConfetti(false);
    setFeedback('A new journey begins.');
  };

  return (
    <div className="dark min-h-screen text-slate-100">
      {showConfetti && <Confetti recycle={false} numberOfPieces={240} />}

      <main className="mx-auto flex max-w-7xl flex-col gap-4 p-4 md:h-screen md:flex-row md:p-6">
        <section className="w-full rounded-xl border border-amber-700/30 bg-arcane-900/80 p-5 shadow-rune md:w-2/5 md:overflow-y-auto">
          <h1 className="text-3xl font-black tracking-tight text-cyan-300">Learn to Code: Quest Forge</h1>
          <p className="mt-2 text-sm text-slate-300">
            Master JavaScript fundamentals through magical coding trials.
          </p>

          <div className="mt-6 space-y-3 rounded-lg border border-slate-700 bg-arcane-950/80 p-4">
            <p className="text-xs uppercase tracking-wider text-slate-400">Current Quest</p>
            <h2 className="text-xl font-bold text-amber-200">{currentQuest?.title ?? 'All quests complete'}</h2>
            <p className="text-sm leading-relaxed text-slate-200">{currentQuest?.description}</p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-slate-700 bg-arcane-950/80 p-3">
              <p className="text-slate-400">Level</p>
              <p className="text-lg font-bold text-cyan-300">{level}</p>
            </div>
            <div className="rounded-lg border border-slate-700 bg-arcane-950/80 p-3">
              <p className="text-slate-400">Total XP</p>
              <p className="text-lg font-bold text-emerald-300">{xp}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-slate-400">
              <span>XP Progress</span>
              <span>{xpInCurrentLevel}/100</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all"
                style={{ width: `${xpInCurrentLevel}%` }}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-slate-400">
              <span>Health</span>
              <span>{health}/{MAX_HEALTH}</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full transition-all ${health > 40 ? 'bg-emerald-400' : 'bg-rose-500'}`}
                style={{ width: `${health}%` }}
              />
            </div>
          </div>

          <p className="mt-5 rounded-lg border border-cyan-900/50 bg-slate-900/60 p-3 text-sm text-cyan-100">
            {feedback}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm text-slate-300">
            <span>Completed:</span>
            <span className="rounded bg-slate-800 px-2 py-1 font-semibold">
              {completedQuests.length}/{quests.length}
            </span>
          </div>

          {(gameComplete || health <= 0) && (
            <button
              type="button"
              onClick={resetRun}
              className="mt-5 w-full rounded-lg border border-cyan-400 px-4 py-2 text-sm font-semibold text-cyan-300 hover:bg-cyan-400/10"
            >
              Begin New Adventure
            </button>
          )}
        </section>

        <section className="w-full md:w-3/5">
          <EditorComponent
            code={code}
            setCode={setCode}
            onSubmit={handleSubmit}
            disabled={isQuestComplete || gameComplete || health <= 0}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
