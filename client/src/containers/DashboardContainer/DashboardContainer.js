/* eslint-disable */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getDashboard} from './actions';

import { DashboardHeader, DashboardLayout, AddVisualizationToDashboardModal } from '../../components';
import {getVisualization, getLayoutItem, getVisualizationComponent} from './helper';
import mockData from './mockData';


const DashboardContainer = (props) => {
  const {id, currentDashboard, isLoading, getDashboard, visualizations} = props;

  const [oldLayout, setOldLayout] = useState([]);
  const [currentLayout, setCurrentLayout] = useState([]);
  const [oldLayouts, setOldLayouts] = useState([]);
  const [currentLayouts, setCurrentLayouts] = useState({});
  const [oldDashboardVisualizations, setOldDashboardVisualizations] = useState([])
  const [dashboardVisualizations, setDashboardVisualizations] = useState([]);

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
    setCurrentLayout(currentDashboard.config?.layout || []);
    setCurrentLayouts(currentDashboard.config?.layouts || []);    
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
  }
  
  const onVisualizationAdd = (id) => {
    setDashboardVisualizations(dashboardVisualizations.concat(id));
    onAddItem(id);
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
     getVisualization={getVisualization}
     getLayoutItem={getLayoutItem}
     getVisualizationComponent={getVisualizationComponent}
     visualizations={visualizations}
     dashboardVisualizations={dashboardVisualizations}
     data={mockData}

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
};

const mapStateToProps = ({ currentDashboard, analytics }) => ({
  currentDashboard: currentDashboard.dashboard,
  isLoading: currentDashboard.isLoading,
  visualizations: analytics.visualizations
});

const mapDispatchToProps = { getDashboard };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);