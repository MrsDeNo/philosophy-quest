import { useState } from 'react';
import './compare-layout.css';

const dimensions = [
  ['beliefs', 'Educational beliefs'],
  ['classroom', 'Classroom approach'],
  ['tradition', 'Philosophical tradition'],
  ['contributions', 'Contributions'],
];

export default function CompareExhibit({ philosophers }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeDimension, setActiveDimension] = useState('beliefs');
  const selected = selectedIds.map((id) => philosophers.find((thinker) => thinker.id === id)).filter(Boolean);
  const selectedDimension = dimensions.find(([key]) => key === activeDimension) ?? dimensions[0];
  const alphabeticalThinkers = [...philosophers].sort((a, b) => a.name.localeCompare(b.name));
  const sharedThemes = selected.length > 1
    ? (selected[0].themes ?? []).filter((theme) => selected.every((thinker) => (thinker.themes ?? []).includes(theme)))
    : [];
  const philosophyFor = (thinker) => thinker.primaryPhilosophy;

  const toggle = (id) => {
    setSelectedIds((current) => current.includes(id)
      ? current.filter((item) => item !== id)
      : current.length < 3 ? [...current, id] : current);
  };

  return (
    <div className="comparison-exhibit" aria-labelledby="compare-heading">
      <header className="compare-heading">
        <p className="eyebrow">Curator’s Comparison Table</p>
        <h3 id="compare-heading">Compare the Thinkers</h3>
        <p>Select two or three thinkers. Compare their educational philosophies, approaches, and documented shared themes.</p>
      </header>

      <div className="compare-toolbar">
        <span className="selection-count" aria-live="polite">{selected.length} of 3 thinkers selected</span>
        <button type="button" className="secondary-btn" onClick={() => setSelectedIds([])} disabled={!selected.length}>Clear selection</button>
      </div>

      <div className="compare-picker" role="group" aria-label="Choose up to three philosophers to compare">
        {alphabeticalThinkers.map((thinker) => {
          const checked = selectedIds.includes(thinker.id);
          const checkboxId = `compare-thinker-${thinker.id}`;
          return (
            <div className={`compare-choice ${checked ? 'selected' : ''}`} key={thinker.id}>
              <input id={checkboxId} type="checkbox" checked={checked} disabled={!checked && selected.length === 3} onChange={() => toggle(thinker.id)} />
              <label htmlFor={checkboxId}>
                <span className="portrait compare-portrait" aria-hidden="true">{thinker.name.slice(0, 2).toUpperCase()}</span>
                <span className="compare-thinker-name">{thinker.name}</span>
              </label>
              {checked && <span className="selected-label" aria-hidden="true">Selected</span>}
            </div>
          );
        })}
      </div>

      {selected.length < 2 ? (
        <div className="compare-empty" role="status">
          <span aria-hidden="true">◎</span>
          <p>Choose {selected.length === 0 ? 'two or three thinkers' : 'one more thinker'} to open the comparison table.</p>
        </div>
      ) : <>
        <div className="dimension-tabs" role="group" aria-label="Choose comparison dimension">
          {dimensions.map(([key, label]) => (
            <button key={key} type="button" aria-pressed={activeDimension === key} className={activeDimension === key ? 'active' : ''} onClick={() => setActiveDimension(key)}>{label}</button>
          ))}
        </div>

        <div className="comparison-table-wrap" role="region" aria-label="Scrollable thinker comparison table" tabIndex="0">
          <table className="comparison-table">
            <caption>Thinker-by-thinker comparison · {selectedDimension[1]}</caption>
            <thead><tr><th scope="col">Comparison point</th>{selected.map((thinker) => <th scope="col" key={thinker.id}>{thinker.name}</th>)}</tr></thead>
            <tbody>
              <tr><th scope="row">Closest alignment among the six educational philosophies</th>{selected.map((thinker) => <td key={thinker.id}>{philosophyFor(thinker)}</td>)}</tr>
              <tr><th scope="row">Educational beliefs</th>{selected.map((thinker) => <td key={thinker.id}>{thinker.beliefs}</td>)}</tr>
              <tr><th scope="row">{selectedDimension[1]}</th>{selected.map((thinker) => <td key={thinker.id}>{thinker[activeDimension]}</td>)}</tr>
              <tr><th scope="row">Classroom connection</th>{selected.map((thinker) => <td key={thinker.id}>{thinker.classroom}</td>)}</tr>
              <tr><th scope="row">Contributions</th>{selected.map((thinker) => <td key={thinker.id}>{thinker.contributions}</td>)}</tr>
            </tbody>
          </table>
        </div>

        <p className="alignment-caveat"><strong>About these alignments:</strong> “Closest alignment” is an instructional shorthand based on each thinker’s documented ideas. The six philosophies are broad traditions, and some thinkers are not members of a single school.</p>

        <section className="shared-theme-panel" aria-labelledby="shared-themes-heading">
          <h4 id="shared-themes-heading">Shared Ground</h4>
          {sharedThemes.length ? <ul>{sharedThemes.map((theme) => <li key={theme}>{theme}</li>)}</ul> : <p>No documented theme tags are shared by every selected thinker. Use the comparison table to explore their differences.</p>}
        </section>
        <p className="comparison-note">Reflection: Which difference between these thinkers would most change what students experience in a classroom? What makes you say so?</p>
        <aside className="curator-note" aria-label="Curator’s note">
          <p><strong>Curator’s note:</strong> Treat these alignments as starting points, not verdicts. Educational traditions overlap; compare each thinker’s ideas with the classroom context before deciding which label fits best.</p>
        </aside>
      </>}
    </div>
  );
}
