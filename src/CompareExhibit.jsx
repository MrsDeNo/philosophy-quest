import { useMemo, useState } from 'react';

const philosophyDimensions = [
  ['purpose', 'Purpose of education'],
  ['learning', 'How learners learn'],
  ['teacher', 'Teacher’s role'],
  ['student', 'Learner’s role'],
  ['society', 'Education and society'],
];

function CompareExhibit({ philosophers }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeDimension, setActiveDimension] = useState('purpose');
  const selected = selectedIds.map((id) => philosophers.find((thinker) => thinker.id === id)).filter(Boolean);
  const sharedByDimension = (dimension) => {
    if (selected.length < 2) return [];
    const first = selected[0][dimension];
    return first && selected.every((thinker) => thinker[dimension] === first) ? [first] : [];
  };
  const isShared = (dimension, value) => selected.length > 1 && selected.every((thinker) => thinker[dimension] === value);
  const toggle = (id) => setSelectedIds((previous) => previous.includes(id)
    ? previous.filter((item) => item !== id)
    : previous.length < 3 ? [...previous, id] : previous);

  return (
    <section className="panel-section compare-section museum-frame" aria-labelledby="compare-heading">
      <div className="section-heading">
        <p className="eyebrow">Curator’s Comparison Table</p>
        <h3 id="compare-heading">Compare the Thinkers</h3>
        <p>Select two or three portraits. Explore shared ideas in the overlap and distinct approaches in each gallery circle.</p>
      </div>
      <div className="compare-toolbar">
        <span className="selection-count" aria-live="polite">{selected.length} of 3 thinkers selected</span>
        <button type="button" className="secondary-btn" onClick={() => setSelectedIds([])} disabled={!selected.length}>Clear selection</button>
      </div>
      <div className="compare-picker" role="group" aria-label="Choose philosophers to compare">
        {philosophers.map((thinker) => {
          const checked = selectedIds.includes(thinker.id);
          return <label className={`compare-choice ${checked ? 'selected' : ''}`} key={thinker.id}>
            <input type="checkbox" checked={checked} disabled={!checked && selected.length === 3} onChange={() => toggle(thinker.id)} />
            <span className="portrait compare-portrait" aria-hidden="true">{thinker.name.slice(0, 2).toUpperCase()}</span>
            <span>{thinker.name}</span>
            {checked && <span className="selected-label">Selected</span>}
          </label>;
        })}
      </div>
      {selected.length < 2 ? <div className="compare-empty" role="status"><span aria-hidden="true">◎</span><p>Choose {selected.length === 0 ? 'two or three thinkers' : 'one more thinker'} to open the comparison exhibit.</p></div> : <>
        <div className={`venn-exhibit venn-count-${selected.length}`} aria-label={`${selected.length}-thinker Venn-style comparison`}>
          {selected.map((thinker, index) => <article className={`venn-circle circle-${index + 1}`} key={thinker.id}>
            <h4>{thinker.name}</h4><p className="subtitle">{thinker.tradition}</p>
            <p><strong>{philosophyDimensions.find(([key]) => key === activeDimension)?.[1]}:</strong> {thinker[activeDimension]}</p>
          </article>)}
          <aside className="venn-overlap"><span className="overlap-label">Shared ground</span>
            {philosophyDimensions.map(([dimension, label]) => {
              const shared = sharedByDimension(dimension);
              return shared.length > 0 && <p key={dimension}><strong>{label}:</strong> {shared[0]}</p>;
            })}
            {philosophyDimensions.every(([dimension]) => sharedByDimension(dimension).length === 0) && <p>No exact match on these dimensions—compare the distinct approaches in each circle.</p>}
          </aside>
        </div>
        <div className="dimension-tabs" role="tablist" aria-label="Comparison dimensions">
          {philosophyDimensions.map(([key, label]) => <button key={key} type="button" role="tab" aria-selected={activeDimension === key} className={activeDimension === key ? 'active' : ''} onClick={() => setActiveDimension(key)}>{label}</button>)}
        </div>
        <div className="comparison-table-wrap"><table className="comparison-table"><caption>Thinker-by-thinker comparison · {philosophyDimensions.find(([key]) => key === activeDimension)?.[1]}</caption><thead><tr><th scope="col">Comparison point</th>{selected.map((thinker) => <th scope="col" key={thinker.id}>{thinker.name}</th>)}</tr></thead><tbody>
          <tr><th scope="row">Philosophical tradition</th>{selected.map((thinker) => <td key={thinker.id}>{thinker.tradition}</td>)}</tr>
          <tr><th scope="row">{philosophyDimensions.find(([key]) => key === activeDimension)?.[1]}</th>{selected.map((thinker) => <td key={thinker.id} className={isShared(activeDimension, thinker[activeDimension]) ? 'shared-cell' : ''}>{thinker[activeDimension]}</td>)}</tr>
          <tr><th scope="row">Classroom connection</th>{selected.map((thinker) => <td key={thinker.id}>{thinker.classroom}</td>)}</tr>
        </tbody></table></div>
        <p className="comparison-note">Shared ground is shown only when the profile facts match exactly; otherwise, the exhibit preserves each thinker’s differences.</p>
      </>}
    </section>
  );
}

export default CompareExhibit;
