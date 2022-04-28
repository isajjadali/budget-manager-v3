module.exports = {
  "/": {
    post: {
      body: {
        amount:{type:"number"},
        allowableKeys:["name","startDate","endDate","amount"],
      },
    },
  },
};
