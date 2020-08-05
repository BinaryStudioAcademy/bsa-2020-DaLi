import React from "react";
import {useHistory} from 'react-router-dom'
import ShowChartSharpIcon from '@material-ui/icons/ShowChartSharp';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';
import './styles.css'

const SelectVisualization = () => {
    let history = useHistory()
    return (
        <div className="container">
            <div className="visualization-container">
                <ul className="visualization-list">
                    <li className="visualization-item">
                        <div className="visualization-icon" onClick={() => history.push('/createChar')}>
                            <ShowChartSharpIcon color="primary" style={{fontSize: 100}}/>
                        </div>
                        <p>Line chart</p>
                    </li>
                    <li className="visualization-item">
                        <div className="visualization-icon" onClick={() => history.push('/createChar')}>
                            <BarChartOutlinedIcon color="primary" style={{fontSize: 100}}/>
                        </div>
                        <p>Bar chart</p>
                    </li>
                    <li className="visualization-item">
                        <div className="visualization-icon" onClick={() => history.push('/createChar')}>
                            <MapOutlinedIcon color="primary" variant="filled" style={{fontSize: 100}}/>
                        </div>
                        <p>Map</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default SelectVisualization