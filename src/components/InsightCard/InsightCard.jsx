import React from 'react'
import { useState, useEffect } from 'react'
import './InsightCard.css'

import { getInsight } from '../../util';

const InsightCard = ({weatherData}) => {

    const [insightData, setInsightData] = useState(null);


        useEffect(() => {
            getInsight(weatherData, setInsightData);
        }, [weatherData]);
    

    return (
        <div className="insight-card">
            <h3>Insight Data</h3>
            { !insightData && <div className='insight-placeholder'>Currently there is no insight data</div>}
            {insightData && <div className='insight-data'>{insightData}</div>}
        </div>
    )
}

export default InsightCard