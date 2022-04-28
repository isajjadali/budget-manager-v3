module.exports = {
  "/": {
    post: {
      body: {
        firstName:{type:"string"},
        lastName:{type:"string"},
        email:{type:"string"},
        password:{type:"string"},
        allowableKeys:["firstName","lastName","email","password"],
      },
    },
  },
};
