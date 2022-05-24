const projectCommonFields = {
  name: {
    type: "string",
  },
  clientEmail: {
    type: "string",
    isEmail: true,
  },
  clientAddress: {
    type: "string",
  },
  allowableKeys: [
    "name",
    "startDate",
    "endDate",
    "clientEmail",
    "clientAddress",
  ],
};
module.exports = {
  "/": {
    post: {
      body: {
        ...projectCommonFields,
      },
    },
  },
  "/:id": {
    put: {
      body: {
        clientAddress: {
          ...projectCommonFields.clientAddress,
          isOptional: true,
        },
        clientEmail: { ...projectCommonFields.clientEmail, isOptional: true },
        name: { ...projectCommonFields.name, isOptional: true },
        allowableKeys: projectCommonFields.allowableKeys
      },
    },
  },
};
