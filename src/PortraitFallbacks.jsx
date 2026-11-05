import { useEffect } from 'react';

const portraitSources = {
  Plato: 'https://commons.wikimedia.org/wiki/Special:FilePath/Plato_Silanion_Musei_Capitolini_MC1377.jpg?width=180',
  Aristotle: 'https://commons.wikimedia.org/wiki/Special:FilePath/Aristotle_Altemps_Inv8575.jpg?width=180',
  'John Locke': 'https://commons.wikimedia.org/wiki/Special:FilePath/John_Locke_by_Godfrey_Kneller.jpg?width=180',
  'Jean-Jacques Rousseau': 'https://commons.wikimedia.org/wiki/Special:FilePath/Jean-Jacques_Rousseau_(painted_portrait).jpg?width=180',
  'Maria Montessori': 'https://commons.wikimedia.org/wiki/Special:FilePath/Maria_Montessori_1913.jpg?width=180',
  'John Dewey': 'https://commons.wikimedia.org/wiki/Special:FilePath/John_Dewey_in_1902.jpg?width=180',
  'Paulo Freire': 'https://commons.wikimedia.org/wiki/Special:FilePath/Paulo_Freire.jpg?width=180',
  'Nel Noddings': 'https://commons.wikimedia.org/wiki/Special:FilePath/Nel_Noddings.jpg?width=180',
  'George S. Counts': 'https://commons.wikimedia.org/wiki/Special:FilePath/George_S._Counts.jpg?width=180',
};

export default function PortraitFallbacks() {
  useEffect(() => {
    const enhancePortraits = () => {
      document.querySelectorAll('.thinker-grid .thinker-card .portrait').forEach((portrait) => {
        if (portrait.querySelector('img')) return;
        const name = portrait.parentElement?.querySelector('span:not(.portrait)')?.textContent?.trim();
        const source = portraitSources[name];
        if (!source) return;
        const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
        const image = document.createElement('img');
        image.src = source;
        image.alt = '';
        image.loading = 'lazy';
        image.className = 'gallery-portrait-image';
        image.addEventListener('error', () => {
          image.remove();
          portrait.classList.add('portrait-fallback');
          portrait.textContent = initials;
        }, { once: true });
        portrait.classList.remove('portrait-fallback');
        portrait.textContent = '';
        portrait.appendChild(image);
      });
    };
    enhancePortraits();
    const observer = new MutationObserver(enhancePortraits);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
