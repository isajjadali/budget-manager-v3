module.exports = {
  "/": {
    post: {
      body: {
        dateId: { type: "number" },
        employeeId: { type: "number" },
        projectId: { type: "number" },
        allowableKeys: ["dateId", "employeeId", "projectId"],
      },
    },
  },
};
