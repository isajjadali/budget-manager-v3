const projectCommonFields={amount:{type:"number"},}
module.exports = {
  "/": {
    post: {
      body: {
        ...projectCommonFields,
        allowableKeys:["name","startDate","endDate","amount"],
      },
    },
  },
  "/:id":{
    put:{
      body:{
        amount: {...projectCommonFields.amount, isOptional:true},
        allowableKeys:["name","startDate","endDate","amount"],
      }
    }
  }
};
