export default {
  columns: [
    { id: 'id', title: 'Id', type: 'id' },
    { id: 'userId', title: 'UserId', type: 'id' },
    { id: 'productId', title: 'ProductId', type: 'id' },
    { id: 'total', title: 'Total', type: 'number' },
    { id: 'discount', title: 'Discount', type: 'number' },
    { id: 'createdAt', title: 'CreatedAt', type: 'date' },
    { id: 'quantity', title: 'Quantity', type: 'number' },
  ],
  sort: {
    order: 'asc',
    orderBy: 'id',
  },
};
