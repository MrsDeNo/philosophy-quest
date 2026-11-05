import { useMemo, useState } from 'react';

const philosophers = [
  {
    name: 'Plato',
    title: 'The Apprentice of Eternal Truths',
    summary:
      'Plato believed education should guide students toward enduring truths and the good life.',
    focus: 'Reason, virtue, and the pursuit of truth.',
  },
  {
    name: 'Aristotle',
    title: 'The Scholar of Practice',
    summary:
      'Aristotle connected learning to habit, wisdom, and the development of character.',
    focus: 'Reason, virtue, and practical knowledge.',
  },
  {
    name: 'Locke',
    title: 'The Builder of Observed Experience',
    summary:
      'John Locke emphasized experience, sensory learning, and the careful shaping of the mind.',
    focus: 'Empiricism and evidence-based learning.',
  },
  {
    name: 'Rousseau',
    title: 'The Guardian of Natural Learning',
    summary:
      'Rousseau trusted the child’s natural curiosity and the value of freedom in education.',
    focus: 'Nature, freedom, and authentic development.',
  },
  {
    name: 'Montessori',
    title: 'The Keeper of Self-Directed Growth',
    summary:
      'Montessori encouraged independent exploration, prepared environments, and child-led discovery.',
    focus: 'Choice, independence, and hands-on mastery.',
  },
  {
    name: 'Dewey',
    title: 'The Explorer of Experience',
    summary:
      'Dewey taught that learning grows from authentic experience, problem solving, and democratic life.',
    focus: 'Inquiry, collaboration, and reflective practice.',
  },
  {
    name: 'Freire',
    title: 'The Voice of Critical Consciousness',
    summary:
      'Paulo Freire argued education should challenge oppression and empower students as co-creators of meaning.',
    focus: 'Dialogue, justice, and transformation.',
  },
  {
    name: 'Noddings',
    title: 'The Caretaker of Relational Learning',
    summary:
      'Noddings believed caring relationships are the heart of educational practice.',
    focus: 'Empathy, trust, and relational pedagogy.',
  },
  {
    name: 'Counts',
    title: 'The Architect of Social Change',
    summary:
      'George Counts pushed schools to help students confront social problems and build a better world.',
    focus: 'Democracy, justice, and societal improvement.',
  },
];

const roomData = [
  {
    name: 'Library of Eternal Truths',
    code: 'WISDOM',
    caption:
      'Seek enduring ideas, great texts, and the timeless truths that shape thoughtful learning.',
    focus: ['Plato', 'Aristotle', 'Mortimer Adler'],
  },
  {
    name: 'Hall of Experience',
    code: 'INQUIRY',
    caption:
      'Learn by doing, reflecting, and exploring real-world problems through experience and inquiry.',
    focus: ['Dewey', 'Montessori', 'Kohn'],
  },
  {
    name: 'Laboratory of Conditioning',
    code: 'REINFORCEMENT',
    caption:
      'Examine behavior, feedback, and practice through the lens of conditioning and measurable learning.',
    focus: ['Pavlov', 'Watson', 'Skinner'],
  },
  {
    name: 'Chamber of Social Change',
    code: 'TRANSFORM',
    caption:
      'Investigate how schools can empower citizens to confront injustice and reshape society.',
    focus: ['Counts', 'Brameld', 'Piaget'],
  },
];

const quizQuestions = [
  {
    question: 'Students should master a common core of knowledge.',
    type: 'essentialism',
  },
  {
    question: 'Learning should begin with student interests.',
    type: 'progressivism',
  },
  {
    question: 'Schools should actively address social problems.',
    type: 'reconstructionism',
  },
  {
    question: 'Reinforcement is an effective learning tool.',
    type: 'behaviorism',
  },
  {
    question: 'Students should define personal meaning.',
    type: 'existentialism',
  },
  {
    question: 'Great books remain valuable.',
    type: 'perennialism',
  },
  {
    question: 'Experience is the best teacher.',
    type: 'progressivism',
  },
  {
    question: 'Academic discipline is essential.',
    type: 'essentialism',
  },
];

const philosophyResults = {
  essentialism: 'Essentialist',
  progressivism: 'Progressive',
  reconstructionism: 'Reconstructionist',
  behaviorism: 'Behaviorist',
  existentialism: 'Existentialist',
  perennialism: 'Perennialist',
};

const cases = [
  {
    title: 'Great Books Seminar',
    answer: 'perennialism',
    clue: 'This classroom values timeless texts and disciplined thinking.',
  },
  {
    title: 'Community Garden Project',
    answer: 'reconstructionism',
    clue: 'Students solve a real community challenge together.',
  },
  {
    title: 'Direct Instruction Academy',
    answer: 'essentialism',
    clue: 'The teacher leads clear, structured content delivery.',
  },
  {
    title: 'Token Economy',
    answer: 'behaviorism',
    clue: 'Rewards and reinforcement guide student behavior.',
  },
  {
    title: 'Passion Project',
    answer: 'existentialism',
    clue: 'Students make choices that shape personal meaning.',
  },
];

const badges = [
  'Thinker Explorer',
  'Philosophy Detective',
  'Escape Survivor',
  'Inventory Master',
  'Reflection Scholar',
  'Master of Educational Thought',
];

function App() {
  const [selectedPhilosopher, setSelectedPhilosopher] = useState(philosophers[0]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [identityAnswers, setIdentityAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
  });
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [caseScore, setCaseScore] = useState(0);
  const [enteredAcademy, setEnteredAcademy] = useState(false);

  const currentQuestion = quizQuestions[currentQuizIndex];
  const identityResult = useMemo(() => {
    if (!identityAnswers.q1 || !identityAnswers.q2 || !identityAnswers.q3) {
      return null;
    }

    const weighted = {
      essentialism: 0,
      progressivism: 0,
      reconstructionism: 0,
      behaviorism: 0,
      existentialism: 0,
      perennialism: 0,
    };

    const answerMap = {
      q1: { a: 'essentialism', b: 'progressivism', c: 'perennialism' },
      q2: { a: 'reconstructionism', b: 'existentialism', c: 'progressivism' },
      q3: { a: 'behaviorism', b: 'essentialism', c: 'perennialism' },
    };

    Object.entries(answerMap).forEach(([key, value]) => {
      const selected = identityAnswers[key];
      if (selected && value[selected]) {
        weighted[value[selected]] += 1;
      }
    });

    return Object.entries(weighted).sort((a, b) => b[1] - a[1])[0][0];
  }, [identityAnswers]);

  const progress = useMemo(() => {
    const completed = [
      enteredAcademy,
      currentQuizIndex >= quizQuestions.length,
      currentCaseIndex > 0 || caseScore > 0,
      !!identityResult,
    ].filter(Boolean).length;
    return Math.round((completed / 4) * 100);
  }, [enteredAcademy, currentQuizIndex, caseScore, currentCaseIndex, identityResult]);

  const handleAnswer = (answerType) => {
    if (answerType === currentQuestion.type) {
      setScore((prev) => prev + 10);
    }

    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
    } else {
      setCurrentQuizIndex(quizQuestions.length);
    }
  };

  const handleCaseAnswer = (selectedAnswer) => {
    const current = cases[currentCaseIndex];
    if (selectedAnswer === current.answer) {
      setCaseScore((prev) => prev + 10);
    }

    if (currentCaseIndex < cases.length - 1) {
      setCurrentCaseIndex((prev) => prev + 1);
    } else {
      setCurrentCaseIndex(cases.length);
    }
  };

  const unlockedBadges = badges.filter((_, index) => {
    if (index === 0) return enteredAcademy;
    if (index === 1) return caseScore >= 10;
    if (index === 2) return currentQuizIndex === quizQuestions.length;
    if (index === 3) return score >= 50;
    if (index === 4) return identityResult;
    if (index === 5) return progress >= 100;
    return false;
  });

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="crest">✦</div>
        <h1>The Philosophy Quest</h1>
        <button className="pill-btn" onClick={() => setEnteredAcademy(true)}>
          {enteredAcademy ? 'Academy Entered' : 'Enter the Academy'}
        </button>
      </header>

      {!enteredAcademy ? (
        <main className="landing">
          <section className="hero-panel">
            <div className="hero-copy">
              <p className="eyebrow">Welcome to the Academy of Educational Thought</p>
              <h2>A strange storm has trapped you inside the Academy of Educational Thought.</h2>
              <p>
                To escape, you must learn the wisdom of the great philosophers, solve ancient
                challenges, unlock hidden chambers, and discover your own philosophy of education.
              </p>
              <button className="primary-btn" onClick={() => setEnteredAcademy(true)}>
                Enter the Academy
              </button>
            </div>
            <div className="crest-card">
              <div className="academy-crest">AET</div>
              <span>Academy of Educational Thought</span>
            </div>
          </section>
        </main>
      ) : (
        <main className="quest-layout">
          <aside className="sidebar">
            <div className="progress-box">
              <h3>Quest Progress</h3>
              <div className="progress-bar">
                <span style={{ width: `${progress}%` }} />
              </div>
              <p>{progress}% complete</p>
            </div>

            <div className="badge-box">
              <h3>Badges</h3>
              <ul>
                {badges.map((badge) => (
                  <li key={badge} className={unlockedBadges.includes(badge) ? 'earned' : 'locked'}>
                    {badge}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="content-panel">
            <section className="panel-section">
              <div className="section-heading">
                <h3>Hall of Thinkers</h3>
              </div>
              <div className="thinker-grid">
                {philosophers.map((philosopher) => (
                  <button
                    key={philosopher.name}
                    className={`thinker-card ${selectedPhilosopher.name === philosopher.name ? 'active' : ''}`}
                    onClick={() => setSelectedPhilosopher(philosopher)}
                  >
                    <div className="portrait">{philosopher.name.slice(0, 2).toUpperCase()}</div>
                    <span>{philosopher.name}</span>
                  </button>
                ))}
              </div>
              <div className="thinker-details">
                <h4>{selectedPhilosopher.name}</h4>
                <p className="subtitle">{selectedPhilosopher.title}</p>
                <p>{selectedPhilosopher.summary}</p>
                <strong>Focus:</strong> <span>{selectedPhilosopher.focus}</span>
              </div>
            </section>

            <section className="panel-section">
              <div className="section-heading">
                <h3>Escape Chambers</h3>
              </div>
              <div className="room-grid">
                {roomData.map((room) => (
                  <article key={room.name} className="room-card">
                    <div className="room-header">
                      <h4>{room.name}</h4>
                      <span className="code">{room.code}</span>
                    </div>
                    <p className="caption">{room.caption}</p>
                    <p className="focus-label">Key thinkers:</p>
                    <ul>
                      {room.focus.map((focus) => (
                        <li key={focus}>{focus}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <section className="panel-section quiz-section">
              <div className="section-heading">
                <h3>Philosophy Match Challenge</h3>
              </div>
              {currentQuizIndex < quizQuestions.length ? (
                <div className="quiz-card">
                  <p className="quiz-score">Score: {score} ✦</p>
                  <h4>{currentQuestion.question}</h4>
                  <div className="quiz-options">
                    <button onClick={() => handleAnswer(currentQuestion.type)}>Yes</button>
                    <button onClick={() => handleAnswer('different')}>No</button>
                  </div>
                </div>
              ) : (
                <div className="completion-card">
                  <h4>Challenge Complete</h4>
                  <p>You earned {score} knowledge crystals.</p>
                </div>
              )}
            </section>

            <section className="panel-section detective-section">
              <div className="section-heading">
                <h3>The Enchanted Cases</h3>
              </div>
              {currentCaseIndex < cases.length ? (
                <div className="case-card">
                  <h4>{cases[currentCaseIndex].title}</h4>
                  <p>{cases[currentCaseIndex].clue}</p>
                  <div className="case-options">
                    <button onClick={() => handleCaseAnswer('perennialism')}>Perennialism</button>
                    <button onClick={() => handleCaseAnswer('reconstructionism')}>Reconstructionism</button>
                    <button onClick={() => handleCaseAnswer('essentialism')}>Essentialism</button>
                    <button onClick={() => handleCaseAnswer('behaviorism')}>Behaviorism</button>
                    <button onClick={() => handleCaseAnswer('existentialism')}>Existentialism</button>
                    <button onClick={() => handleCaseAnswer('progressivism')}>Progressivism</button>
                  </div>
                </div>
              ) : (
                <div className="completion-card">
                  <h4>Detective Cases Solved</h4>
                  <p>Case score: {caseScore} points</p>
                </div>
              )}
            </section>

            <section className="panel-section sorting-section">
              <div className="section-heading">
                <h3>The Sorting Assessment</h3>
              </div>
              <div className="sorting-grid">
                <div className="sort-item">
                  <label>1. Which matters most in a classroom?</label>
                  <select
                    value={identityAnswers.q1}
                    onChange={(e) => setIdentityAnswers((prev) => ({ ...prev, q1: e.target.value }))}
                  >
                    <option value="">Choose</option>
                    <option value="a">A strong common curriculum</option>
                    <option value="b">Student voice and experience</option>
                    <option value="c">Timeless ideas and big questions</option>
                  </select>
                </div>
                <div className="sort-item">
                  <label>2. What should schools help students do?</label>
                  <select
                    value={identityAnswers.q2}
                    onChange={(e) => setIdentityAnswers((prev) => ({ ...prev, q2: e.target.value }))}
                  >
                    <option value="">Choose</option>
                    <option value="a">Solve social problems</option>
                    <option value="b">Create personal meaning</option>
                    <option value="c">Grow through inquiry and experience</option>
                  </select>
                </div>
                <div className="sort-item">
                  <label>3. What best supports learning?</label>
                  <select
                    value={identityAnswers.q3}
                    onChange={(e) => setIdentityAnswers((prev) => ({ ...prev, q3: e.target.value }))}
                  >
                    <option value="">Choose</option>
                    <option value="a">Clear feedback and rewards</option>
                    <option value="b">Structured knowledge and rigor</option>
                    <option value="c">Reflection on enduring ideas</option>
                  </select>
                </div>
              </div>

              {identityResult && (
                <div className="identity-result">
                  <h4>Your educational philosophy alignment:</h4>
                  <p>{philosophyResults[identityResult]}</p>
                </div>
              )}
            </section>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
