import React, { useState } from 'react';
import { setThresholdsInCookie } from '../utils/threshold';

const AlertThresholds = ({ onThresholdSet }) => {
  const [tempThreshold, setTempThreshold] = useState(35);
  const [conditionThreshold, setConditionThreshold] = useState('Rain');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const thresholds = {
      tempThreshold: parseFloat(tempThreshold),
      conditionThreshold,
    };
    
    setThresholdsInCookie(thresholds);
    alert("New Threshold is set")
    onThresholdSet(thresholds);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-xl font-semibold">Set Alert Thresholds</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='w-1/2'>
          <label className="block text-lg font-semibold">Temperature Threshold (°C):</label>
          <input
            type="number"
            value={tempThreshold}
            onChange={(e) => setTempThreshold(e.target.value)}
            className="border rounded p-2 w-full"
            min="0"
          />
        </div>
        <div className='w-1/2'>
          <label className="block text-lg font-semibold">Weather Condition Threshold:</label>
          <select
            value={conditionThreshold}
            onChange={(e) => setConditionThreshold(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="Rain">Rain</option>
            <option value="Haze">Haze</option>
            <option value="Clear">Clear</option>
            <option value="Clouds">Clouds</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Set Thresholds
        </button>
      </form>
    </div>
  );
};

export default AlertThresholds;
