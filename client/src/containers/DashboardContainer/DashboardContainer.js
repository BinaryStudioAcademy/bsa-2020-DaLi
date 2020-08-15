/* eslint-disable */
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getDashboard} from './actions';

import { DashboardHeader, DashboardLayout } from '../../components';


const DashboardContainer = (props) => {
  const {id, currentDashboard, isLoading, getDashboard} = props;

  const [oldLayout, setOldLayout] = useState([]);
  const [currentLayout, setCurrentLayout] = useState([]);
  const [oldLayouts, setOldLayouts] = useState([]);
  const [currentLayouts, setCurrentLayouts] = useState({});
  const [visualizations, setVisualizations] = useState([]);

  let [counter, setCounter] = useState(1);
  const [breakpoint, setBreakpoint] = useState('lg');
  const [cols, setCols] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    getDashboard(id);
  }, [id]);

  useEffect(() => {      
    setName(currentDashboard.name);
    setDescription(currentDashboard.description);
    setVisualizations(currentDashboard.Visualizations);
    setCurrentLayout(currentDashboard.config?.layout || []);
    setCurrentLayouts(currentDashboard.config?.layouts || []);    
}, [currentDashboard])


 
  const onLayoutChange = (layout, layouts) => {
    setCurrentLayout(layout);
    setCurrentLayouts(layouts)
  }

  const onAddItem = () => {
    setCurrentLayout(
      currentLayout.concat({
        i: `n${counter}`,
        x: (currentLayout.length * 4) % (cols && cols[breakpoint] || 12),
        y: Infinity, 
        w: 4,
        h: 3,
        minW: 4,
        minH: 3,
       
      }),
    );
    setCounter(counter + 1);
  }

  const onBreakpointChange = (breakpoint, cols) => {
    setBreakpoint(breakpoint);
    setCols(cols);
  }

  const onSetEdit = () => {
  setOldLayout(currentLayout);
  setOldLayouts(currentLayouts);
   setIsEdit(true);
  }

  const onCancelChanges = () => {
    setCurrentLayout(oldLayout);
    setCurrentLayouts(oldLayouts);
    setIsEdit(false);
  }

  const onSaveChanges = () => {
    setIsEdit(false);
   }

 
  return isLoading ? 'Loading' : (
    <>
     <DashboardHeader 
     name={name} 
     description={description} 
     isEdit={isEdit} onSetEdit={onSetEdit} 
     onCancelChanges={onCancelChanges} 
     onSaveChanges={onSaveChanges} 
     onVisualizationAdd={onAddItem}
   />
   <DashboardLayout 
     layout={currentLayout} 
     layouts={currentLayouts} 
     cols={cols} isEdit={isEdit} 
     onLayoutChange={onLayoutChange} 
     onBreakpointChange={onBreakpointChange}
   />
 </>
 );
      
    
  
}
DashboardContainer.propTypes = {
  id: PropTypes.string,
  currentDashboard: PropTypes.object,
  isLoading: PropTypes.bool,
  getDashboard: PropTypes.func,
};

const mapStateToProps = ({ currentDashboard }) => ({
  currentDashboard: currentDashboard.dashboard,
  isLoading: currentDashboard.isLoading,
});

const mapDispatchToProps = { getDashboard };

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);