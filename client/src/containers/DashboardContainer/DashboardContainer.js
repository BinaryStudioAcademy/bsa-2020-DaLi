/* eslint-disable */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getDashboard, addVisualizationsToDashboard} from './actions';

import { DashboardHeader, DashboardLayout, AddVisualizationToDashboardModal } from '../../components';
import {getDashboardItems, getDashboardConfig, createUpdatedDashboard, getVisualization} from './helper';
import mockData from './mockData';


const DashboardContainer = (props) => {
  const {id, currentDashboard, isLoading, getDashboard, visualizations, addVisualizationsToDashboard} = props;

  const [oldLayout, setOldLayout] = useState([]);
  const [currentLayout, setCurrentLayout] = useState([]);
  const [oldLayouts, setOldLayouts] = useState([]);
  const [currentLayouts, setCurrentLayouts] = useState({});
  const [oldDashboardVisualizations, setOldDashboardVisualizations] = useState([])
  const [dashboardVisualizations, setDashboardVisualizations] = useState([]);
  const [newDashboardVisualizations, setNewDashboardVisualizations] = useState([]);

  const [breakpoint, setBreakpoint] = useState('lg');
  const [cols, setCols] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getDashboard(id);
  }, [id]);

  useEffect(() => {      
    setName(currentDashboard.name);
    setDescription(currentDashboard.description);
    setDashboardVisualizations(currentDashboard.Visualizations || []);
    console.log(currentDashboard.Visualizations);
    const dashboardConfig = getDashboardConfig(currentDashboard);
    setCurrentLayout(dashboardConfig?.layout || []);
    setCurrentLayouts(dashboardConfig?.layouts || []);    
    setNewDashboardVisualizations([]);
}, [currentDashboard])


 
  const onLayoutChange = (layout, layouts) => {
    setCurrentLayout(layout);
    setCurrentLayouts(layouts)
  }

  const onAddItem = (visualizationId) => {
    setCurrentLayout(
      currentLayout.concat({
        i: visualizationId,
        x: (currentLayout.length * 4) % (cols && cols[breakpoint] || 12),
        y: Infinity, 
        w: 4,
        h: 3,
        minW: 4,
        minH: 3,
       
      }),
    );
  }

  const onBreakpointChange = (breakpoint, cols) => {
    setBreakpoint(breakpoint);
    setCols(cols);
  }

  const onSetEdit = () => {
    setOldLayout(currentLayout);
    setOldLayouts(currentLayouts);
    setOldDashboardVisualizations(dashboardVisualizations);
    setIsEdit(true);
  }

  const onCancelChanges = () => {
    setCurrentLayout(oldLayout);
    setCurrentLayouts(oldLayouts);
    setDashboardVisualizations(oldDashboardVisualizations);
    setIsEdit(false);
  }

  const onSaveChanges = () => {
    setIsEdit(false);
    console.log(newDashboardVisualizations.length);
    const updatedDashboard = createUpdatedDashboard(name, description, currentLayout, currentLayouts);
    if(newDashboardVisualizations.length) {    
      addVisualizationsToDashboard({dashboardId: id, visualizations: newDashboardVisualizations, updatedDashboard});
    }
  }
  
  const onVisualizationAdd = (visualizationId) => {
    setNewDashboardVisualizations(newDashboardVisualizations.concat(visualizationId));
    const visualization = getVisualization(visualizationId, visualizations);
    setDashboardVisualizations(dashboardVisualizations.concat(visualization));
    onAddItem(visualizationId);
  }
  
  const onOpenModal = () => {
    setIsModalVisible(true);
  }
  const onCloseModal = () => {
    setIsModalVisible(false);
  }

 
  return isLoading ? 'Loading' : (
    <>
    <AddVisualizationToDashboardModal 
      isVisible={isModalVisible} 
      visualizations={visualizations} 
      closeModal={onCloseModal} 
      search='' 
      addVisualization={onVisualizationAdd}
    />
     <DashboardHeader 
     name={name} 
     description={description} 
     isEdit={isEdit} onSetEdit={onSetEdit} 
     onCancelChanges={onCancelChanges} 
     onSaveChanges={onSaveChanges} 
     onVisualizationAdd={onOpenModal}
   />
   <DashboardLayout 
     layout={currentLayout} 
     layouts={currentLayouts} 
     cols={cols} isEdit={isEdit} 
     onLayoutChange={onLayoutChange} 
     onBreakpointChange={onBreakpointChange}
     dashboardVisualizations={dashboardVisualizations}
     data={mockData}
     getDashboardItems={getDashboardItems}

   />
 </>
 );
      
    
  
}
DashboardContainer.propTypes = {
  id: PropTypes.string,
  currentDashboard: PropTypes.object,
  visualization: PropTypes.array,
  isLoading: PropTypes.bool,
  getDashboard: PropTypes.func,
  addVisualizationsToDashboard: PropTypes.func,
};

const mapStateToProps = ({ currentDashboard, analytics }) => ({
  currentDashboard: currentDashboard.dashboard,
  isLoading: currentDashboard.isLoading,
  visualizations: analytics.visualizations
});

const mapDispatchToProps = { getDashboard, addVisualizationsToDashboard };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);