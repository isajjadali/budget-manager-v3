const projectCommonFields = {
  name: {
    type: 'string'
  },
  clientAddress: {
    type: 'string'
  },
  clientEmail: {
    type: 'string'
  },
  tasks: [
    {
      name: {
        type: 'string'
      },
      materialCost: {
        type: 'number'
      },
      descriptions: [
        {
          description: {
            type: 'string'
          },
          laborCost: {
            type: 'number'
          }
        },
      ],
    },
  ],

};
module.exports = {
  '/': {
    post: {
      body: {
        ...projectCommonFields,
      },
    },
  },
  '/:projectId': {
    put: {
      body: {
        ...projectCommonFields,
      },
    },
  },
};
