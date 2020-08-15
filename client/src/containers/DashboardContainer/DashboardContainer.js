/* eslint-disable */
import React, {useState, useEffect} from 'react';
import { DashboardHeader, DashboardLayout } from '../../components';


const ResponsiveLocalStorageLayout = (props) => {
  const [oldLayout, setOldLayout] = useState([]);
  const [currentLayout, setCurrentLayout] = useState([]);
  const [oldLayouts, setOldLayouts] = useState({});
  const [currentLayouts, setCurrentLayouts] = useState({});

  let [counter, setCounter] = useState(1);
  const [breakpoint, setBreakpoint] = useState('lg');
  const [cols, setCols] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('Dashboard');
  const [description, setDescription] = useState('Description');


 
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
    return (
      <>
      <DashboardHeader 
        name={name} 
        description={description} 
        isEdit={isEdit} onSetEdit={onSetEdit} 
        onCancelChanges={onCancelChanges} 
        onSaveChanges={onSaveChanges} 
        onVisualizationAdd={onAddItem}
      />
      <DashboardLayout layout={currentLayout} layouts={currentLayouts} cols={cols} isEdit={isEdit} onLayoutChange={onLayoutChange} onBreakpointChange={onBreakpointChange}/>
      </>
    );
  
}

export default ResponsiveLocalStorageLayout;