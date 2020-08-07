import React, { useState } from 'react';
import EqualizerOutlinedIcon from '@material-ui/icons/EqualizerOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';

import SaveVisualizationModal from '../SaveVisualizationModal/SaveVisualizationModal';
import './styles.css';

const iconStyles = {
  fontSize: 200,
};

const myVisualizations = [
  { id: 1, name: 'Line Chart', icon: <TimelineOutlinedIcon style={iconStyles} />, type: 'LINE_CHART' },
  { id: 2, name: 'Bar Chart', icon: <EqualizerOutlinedIcon style={iconStyles} />, type: 'BAR_CHART' },
  { id: 3, name: 'Table', icon: <TableChartOutlinedIcon style={iconStyles} />, type: 'TABLE' },
];

const SelectVisualization = () => {
  const [isModal, setIsModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openModal = (typeModal) => () => {
    setIsModal(true);
    setModalType(typeModal);
  };
  const closeModal = () => {
    setIsModal(false);
    setModalType(null);
  };

  const createVisualization = (data) => {
    const newVisualizationData = { ...data };
    newVisualizationData.type = modalType;
    closeModal();
    // there should be a function to save to the database
    // console.log(newVisualizationData);
  };

  return (
    <div className="select-visualization-container">
      {myVisualizations.map((item) => {
        return (
          <button type="button" key={item.id} className="visualization-container" onClick={openModal(item.type)}>
            {item.icon}
            <h2>{item.name}</h2>
          </button>
        );
      })}
      <SaveVisualizationModal closeModal={closeModal} isVisible={isModal} saveVisualization={createVisualization} />
    </div>
  );
};

export default SelectVisualization;
