import moment from 'moment';

const getDate = (date, period) => {
  if (!moment(date).isValid()) return date;
  let formattedDate;

  switch (period) {
    case 'month': {
      formattedDate = moment(date).format('MMMM, YYYY');
      break;
    }
    case 'year': {
      formattedDate = moment(date).format('YYYY [year]');
      break;
    }
    case 'week': {
      formattedDate = moment(date).format('W [week], YYYY');
      break;
    }
    case 'day': {
      formattedDate = moment(date).format('DD MMMM, YYYY');
      break;
    }
    case 'quarter': {
      formattedDate = moment(date).format('Q [quarter], YYYY');
      break;
    }
    default: {
      break;
    }
  }

  return formattedDate;
};

export const formatDateForSummarize = (data, config) => {
  if (config?.isSummarize && config?.summarize.groupBy.type === 'date') {
    const dateColumn = config.summarize.groupBy.as;
    return data.map((row) => {
      const newRow = { ...row };
      newRow[dateColumn] = getDate(newRow[dateColumn], config.summarize.groupBy.period);
      return newRow;
    });
  }
  return data;
};
