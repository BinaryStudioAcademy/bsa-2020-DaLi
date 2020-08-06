export const exampleReducer = (state = {}, action) => {
  switch (action.type) {
    case 'EXAMPLE':
      return {};
    default:
      return state;
  }
};
