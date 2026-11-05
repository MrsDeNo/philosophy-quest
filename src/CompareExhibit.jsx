import { useState } from 'react';

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
  const sharedDimensions = dimensions.filter(([key]) => {
    const firstValue = selected[0]?.[key];
    return selected.length > 1 && firstValue && selected.every((thinker) => thinker[key] === firstValue);
  });
  const selectedDimension = dimensions.find(([key]) => key === activeDimension);

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
        <p>Select two or three portraits. Explore shared ideas in the overlap and distinct approaches in each gallery circle.</p>
      </header>

      <div className="compare-toolbar">
        <span className="selection-count" aria-live="polite">{selected.length} of 3 thinkers selected</span>
        <button type="button" className="secondary-btn" onClick={() => setSelectedIds([])} disabled={!selected.length}>Clear selection</button>
      </div>

      <div className="compare-picker" role="group" aria-label="Choose philosophers to compare">
        {philosophers.map((thinker) => {
          const checked = selectedIds.includes(thinker.id);
          return (
            <label className={`compare-choice ${checked ? 'selected' : ''}`} key={thinker.id}>
              <input type="checkbox" checked={checked} disabled={!checked && selected.length === 3} onChange={() => toggle(thinker.id)} />
              <span className="portrait compare-portrait" aria-hidden="true">{thinker.name.slice(0, 2).toUpperCase()}</span>
              <span>{thinker.name}</span>
              {checked && <span className="selected-label">Selected</span>}
            </label>
          );
        })}
      </div>

      {selected.length < 2 ? (
        <div className="compare-empty" role="status">
          <span aria-hidden="true">◎</span>
          <p>Choose {selected.length === 0 ? 'two or three thinkers' : 'one more thinker'} to open the comparison exhibit.</p>
        </div>
      ) : <>
        <div className={`venn-exhibit venn-count-${selected.length}`} aria-label={`${selected.length}-thinker Venn-style comparison`}>
          {selected.map((thinker, index) => (
            <article className={`venn-circle circle-${index + 1}`} key={thinker.id}>
              <h4>{thinker.name}</h4>
              <p className="subtitle">{thinker.tradition}</p>
              <p><strong>{selectedDimension[1]}:</strong> {thinker[activeDimension]}</p>
            </article>
          ))}
          <aside className="venn-overlap">
            <span className="overlap-label">Shared ground</span>
            {sharedDimensions.length ? sharedDimensions.map(([key, label]) => (
              <p key={key}><strong>{label}:</strong> {selected[0][key]}</p>
            )) : <p>No exact match in the documented profile facts. Compare the distinct approaches in each circle.</p>}
          </aside>
        </div>

        <div className="dimension-tabs" role="tablist" aria-label="Comparison dimensions">
          {dimensions.map(([key, label]) => (
            <button key={key} type="button" role="tab" aria-selected={activeDimension === key} className={activeDimension === key ? 'active' : ''} onClick={() => setActiveDimension(key)}>{label}</button>
          ))}
        </div>

        <div className="comparison-table-wrap">
          <table className="comparison-table">
            <caption>Thinker-by-thinker comparison · {selectedDimension[1]}</caption>
            <thead><tr><th scope="col">Comparison point</th>{selected.map((thinker) => <th scope="col" key={thinker.id}>{thinker.name}</th>)}</tr></thead>
            <tbody>
              <tr><th scope="row">Philosophical tradition</th>{selected.map((thinker) => <td key={thinker.id}>{thinker.tradition}</td>)}</tr>
              <tr><th scope="row">{selectedDimension[1]}</th>{selected.map((thinker) => <td key={thinker.id}>{thinker[activeDimension]}</td>)}</tr>
              <tr><th scope="row">Classroom connection</th>{selected.map((thinker) => <td key={thinker.id}>{thinker.classroom}</td>)}</tr>
              <tr><th scope="row">Contributions</th>{selected.map((thinker) => <td key={thinker.id}>{thinker.contributions}</td>)}</tr>
            </tbody>
          </table>
        </div>
        <p className="comparison-note">Shared ground is shown only when the documented profile facts match exactly; otherwise, the exhibit preserves each thinker’s differences.</p>
      </>}
    </div>
  );
}
