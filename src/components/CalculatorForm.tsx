'use client';
import { useState, FormEvent } from 'react';

interface CalculatorFormProps {
  dict: Record<string, string>;
}

export default function CalculatorForm({ dict }: CalculatorFormProps) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [method, setMethod] = useState('air');
  const [result, setResult] = useState<{
    cost: number;
    actualWeight: number;
    volumetricWeight: number;
    chargeableWeight: number;
  } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight) || 0;
    const l = parseFloat(length) || 0;
    const wd = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;

    const volumetricWeight = (l * wd * h) / 166;
    const chargeableWeight = Math.max(w, volumetricWeight);
    const rate = method === 'air' ? 4.5 : 1.75;
    const cost = chargeableWeight * rate;

    setResult({
      cost: Math.round(cost * 100) / 100,
      actualWeight: w,
      volumetricWeight: Math.round(volumetricWeight * 100) / 100,
      chargeableWeight: Math.round(chargeableWeight * 100) / 100,
    });
  };

  return (
    <div className="calculator-card">
      <form onSubmit={handleSubmit}>
        <div className="calculator-row">
          <div className="form-group">
            <label>{dict.origin}</label>
            <select className="form-control" value={origin} onChange={(e) => setOrigin(e.target.value)} required>
              <option value="">{dict.selectCountry}</option>
              <option value="usa">{dict.usa}</option>
              <option value="haiti">{dict.haiti}</option>
              <option value="dr">{dict.dr}</option>
            </select>
          </div>
          <div className="form-group">
            <label>{dict.destination}</label>
            <select className="form-control" value={destination} onChange={(e) => setDestination(e.target.value)} required>
              <option value="">{dict.selectCountry}</option>
              <option value="usa">{dict.usa}</option>
              <option value="haiti">{dict.haiti}</option>
              <option value="dr">{dict.dr}</option>
            </select>
          </div>
        </div>

        <div className="calculator-row">
          <div className="form-group">
            <label>{dict.weight} ({dict.lbs})</label>
            <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="0.0" min="0" step="0.1" required />
          </div>
          <div className="form-group">
            <label>{dict.method}</label>
            <select className="form-control" value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="air">{dict.air}</option>
              <option value="sea">{dict.sea}</option>
            </select>
          </div>
        </div>

        <div className="calculator-row three-cols">
          <div className="form-group">
            <label>{dict.length}</label>
            <input type="number" className="form-control" value={length} onChange={(e) => setLength(e.target.value)} placeholder="0" min="0" />
          </div>
          <div className="form-group">
            <label>{dict.width}</label>
            <input type="number" className="form-control" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="0" min="0" />
          </div>
          <div className="form-group">
            <label>{dict.height}</label>
            <input type="number" className="form-control" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="0" min="0" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
          {dict.calculate} →
        </button>
      </form>

      {result && (
        <div className="calculator-result">
          <div style={{ fontSize: '0.9rem', color: 'var(--color-gray-400)', marginBottom: '0.5rem' }}>{dict.estimatedCost}</div>
          <div className="result-price">${result.cost.toFixed(2)}</div>
          <div className="result-details">
            <div className="result-detail-item">
              <div className="label">{dict.actualWeight}</div>
              <div className="value">{result.actualWeight} lbs</div>
            </div>
            <div className="result-detail-item">
              <div className="label">{dict.volumetricWeight}</div>
              <div className="value">{result.volumetricWeight} lbs</div>
            </div>
            <div className="result-detail-item">
              <div className="label">{dict.chargeableWeight}</div>
              <div className="value">{result.chargeableWeight} lbs</div>
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-gray-500)', marginTop: '1rem' }}>{dict.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
