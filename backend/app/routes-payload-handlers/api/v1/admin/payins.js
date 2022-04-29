module.exports = {
  "/": {
    post: {
      body: {
        amount: { type: "number" },
        date: { type: "string" },
        projectId: { type: "number" },
        allowableKeys: ["amount", "date", "projectId"],
      },
    },
  },
};
