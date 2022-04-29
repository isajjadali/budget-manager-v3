const activitiesCommonField={
  date: { type: "string" },
  employeeId: { type: "number" },
  projectId: { type: "number" },
}
module.exports = {
  "/": {
    post: {
      body: {
        ...activitiesCommonField,
        allowableKeys: ["date", "employeeId", "projectId"],
      },
    },
  },
  "/:Id":{
    put:{
      body:{
        date:{...activitiesCommonField.date,isOptional:true},
        employeeId:{...activitiesCommonField.employeeId,isOptional:true},
        projectId:{...activitiesCommonField.projectId,isOptional:true},
        allowableKeys: ["date", "employeeId", "projectId"],

      }
    }
  }
};
