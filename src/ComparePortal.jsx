import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import CompareExhibit from './CompareExhibit';
import './compare.css';

// Mount the new comparison exhibit into the existing framed comparison section
// without changing the rest of the app's large main component.
const thinkers = [
  { id: 'plato', name: 'Plato', tradition: 'Perennialism / Idealism', beliefs: 'Education turns the soul toward enduring truth and the good. In the Republic, learning is connected to justice, virtue, and thoughtful leadership.', contributions: 'Founded the Academy in Athens; the Socratic dialogue and Allegory of the Cave remain influential ways to think about inquiry and education.', classroom: 'Use dialogue, abstract questions, and enduring works to help learners examine assumptions.' },
  { id: 'aristotle', name: 'Aristotle', tradition: 'Perennialism / Realism', beliefs: 'Knowledge develops through observation, reason, and experience. Education should cultivate intellectual and moral virtues through practice.', contributions: 'Founded the Lyceum and advanced systematic study across logic, biology, ethics, and politics; his emphasis on habit and practical wisdom influenced education for centuries.', classroom: 'Connect evidence and observation with discussion, practice, and the development of good judgment.' },
  { id: 'locke', name: 'John Locke', tradition: 'Empiricism', beliefs: 'Experience shapes knowledge; the mind is not born with fully formed ideas. Education and environment strongly influence character and understanding.', contributions: 'His writing on experience, reason, and education helped shape modern empiricism and liberal educational thought.', classroom: 'Build learning from observation and experience, and use thoughtful guidance to develop habits and judgment.' },
  { id: 'rousseau', name: 'Jean-Jacques Rousseau', tradition: 'Naturalism', beliefs: 'Children have distinctive developmental needs. Education should respect growth and allow discovery rather than force adult expectations too early.', contributions: 'Émile, or On Education challenged conventional schooling and became a major influence on child-centered and developmental approaches.', classroom: 'Offer developmentally appropriate experiences, exploration, and room for learners to encounter consequences.' },
  { id: 'montessori', name: 'Maria Montessori', tradition: 'Progressivism / Child-centered education', beliefs: 'Children learn actively and independently in a carefully prepared environment. Respect, concentration, choice, and hands-on materials support development.', contributions: 'Developed the Montessori method and materials, emphasizing mixed-age communities, self-directed work, and the teacher as a careful observer and guide.', classroom: 'Prepare accessible materials, allow purposeful choice, and support focused work at each learner’s pace.' },
  { id: 'dewey', name: 'John Dewey', tradition: 'Progressivism / Pragmatism', beliefs: 'Learning grows through experience, reflection, inquiry, and participation in democracy. School is a community where learners investigate meaningful problems.', contributions: 'A leading pragmatist educator, Dewey advanced experiential learning, reflective inquiry, and democratic schooling through works including Democracy and Education.', classroom: 'Organize collaborative projects around real questions; help students reflect on evidence and consequences.' },
  { id: 'freire', name: 'Paulo Freire', tradition: 'Critical pedagogy / Reconstructionism', beliefs: 'Education should be dialogic rather than a one-way “banking” model. Learners can develop critical consciousness and act to transform unjust conditions.', contributions: 'Pedagogy of the Oppressed became foundational to critical pedagogy and adult literacy education around the world.', classroom: 'Use dialogue and problem-posing to connect learners’ lived experience to critical analysis and action.' },
  { id: 'noddings', name: 'Nel Noddings', tradition: 'Ethics of care', beliefs: 'Caring relations are central to ethical life and education. Teaching requires attentiveness, dialogue, and responsiveness to particular learners.', contributions: 'Her care ethics brought sustained attention to relationships, schools, and moral education; Caring: A Feminine Approach to Ethics and Moral Education is a key work.', classroom: 'Build trusting relationships, listen closely, and respond to students as individuals.' },
  { id: 'counts', name: 'George S. Counts', tradition: 'Social reconstructionism', beliefs: 'Schools are part of society and should help learners understand and address social problems rather than simply reproduce the status quo.', contributions: 'Dare the School Build a New Social Order? challenged educators to take social responsibility and helped shape reconstructionist educational thought.', classroom: 'Study community issues, consider whose interests are served, and work toward informed democratic change.' },
];

export default function ComparePortal() {
  const [mountNode, setMountNode] = useState(null);

  useEffect(() => {
    const host = document.querySelector('.compare-section');
    if (!host) return undefined;
    const node = document.createElement('div');
    node.className = 'compare-exhibit-root';
    host.appendChild(node);
    setMountNode(node);
    return () => {
      node.remove();
    };
  }, []);

  return mountNode ? createPortal(<CompareExhibit philosophers={thinkers} />, mountNode) : null;
}
