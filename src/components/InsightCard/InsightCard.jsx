import React, { useState, useEffect } from "react";
import "./InsightCard.css";

import { getInsight } from "../../util";

const InsightCard = ({ weatherData , business}) => {
  const [insightData, setInsightData] = useState([]); // Ensure it's always an array

  useEffect(() => {
    if (weatherData) {
      getInsight(weatherData, setInsightData, business);
    }
  }, [weatherData]);

  return (
    <div className="insight-card">
      <h3>Weather Insights</h3>
      {insightData.length === 0 ? (
        <div className="insight-placeholder">
          Currently there is no insight data
        </div>
      ) : (
        insightData.map((insight, index) => (
          <div key={index} className="insight-data">
            {insight}
          </div>
        ))
      )}
    </div>
  );
};

export default InsightCard;
