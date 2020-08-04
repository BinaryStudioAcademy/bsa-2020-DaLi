import React from "react";
import {useHistory} from 'react-router-dom'
import './styles.css'

const SelectVisualization = () => {
    let history = useHistory()
    return (
        <div className="container">
            <div className="visualization-container">
                <ul className="visualization-list">
                    <li className="visualization-item">
                        <div className="visualization-icon" onClick={() => history.push('/createChar')}>

                        </div>
                        <p>Line chart</p>
                    </li>
                    <li className="visualization-item">
                        <div className="visualization-icon" onClick={() => history.push('/createChar')}>

                        </div>
                        <p>Bar chart</p>
                    </li>
                    <li className="visualization-item">
                        <div className="visualization-icon" onClick={() => history.push('/createChar')}>

                        </div>
                        <p>Map</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SelectVisualization