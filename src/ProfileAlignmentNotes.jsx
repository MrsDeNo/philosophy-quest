import { useEffect } from 'react';

const closestAlignments = {
  Plato: 'Perennialism',
  Aristotle: 'Perennialism',
  'John Locke': 'Essentialism',
  'Jean-Jacques Rousseau': 'Progressivism',
  'Maria Montessori': 'Progressivism',
  'John Dewey': 'Progressivism',
  'Paulo Freire': 'Reconstructionism',
  'Nel Noddings': 'Progressivism',
  'George S. Counts': 'Reconstructionism',
};

export default function ProfileAlignmentNotes() {
  useEffect(() => {
    const addAlignmentNotes = () => {
      document.querySelectorAll('.thinker-details').forEach((profile) => {
        const name = profile.querySelector('h4')?.textContent?.trim();
        const alignment = closestAlignments[name];
        if (!alignment || profile.querySelector('.profile-alignment-note')) return;

        const note = document.createElement('p');
        note.className = 'profile-alignment-note';
        note.textContent = `Closest alignment: ${alignment}`;
        const subtitle = profile.querySelector('.subtitle');
        if (subtitle) subtitle.insertAdjacentElement('afterend', note);
        else profile.prepend(note);
      });
    };

    addAlignmentNotes();
    const observer = new MutationObserver(addAlignmentNotes);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
