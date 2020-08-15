import React from 'react';
import PropTypes from 'prop-types';
import LineChart from '../../components/LineChart/LineChart';

const LineChartContainer = ({ config, data }) => {
  // const containerRef = useRef();

  // const [chart, setChart] = useState({
  //   margin: {
  //     top: 40,
  //     right: 40,
  //     bottom: 60,
  //     left: 60,
  //   },
  //   height: 600,
  //   width: 1000,
  // });

  // useEffect(() => {
  //   const { offsetHeight, offsetWidth } = containerRef.current.offsetParent;
  //   console.log(containerRef.current.parentElement);
  //   setChart((prevState) => {
  //     prevState.width = offsetWidth - 100;
  //     prevState.height = offsetHeight - 100;
  //     return prevState;
  //   });
  // }, [containerRef.current]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
      // ref={containerRef}
    >
      <LineChart data={data} settings={config} />
    </div>
  );
};

LineChartContainer.propTypes = {
  data: PropTypes.array,
  config: PropTypes.object,
};

export default LineChartContainer;
