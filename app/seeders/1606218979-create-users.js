
// Password = admin@adqore123
module.exports = {
    up: queryInterface => queryInterface.bulkInsert('users', [{
        first_name: 'sajjad',
        last_name: 'ali',
        email: 'sajjad@gmail.com',
        password: 'mz1/OwmwJhdWVw5cuCpik4S+XraZa2BcOkKuhkPbmPs=', // password is `sajjad734`
        created_at: new Date(),
        updated_at: new Date(),
    }], {}),

    down: queryInterface => queryInterface.bulkDelete('users', [{
        first_name: 'sajjad',
        last_name: 'ali',
        email: 'sajjad@gmail.com',
        password: 'mz1/OwmwJhdWVw5cuCpik4S+XraZa2BcOkKuhkPbmPs=',
        created_at: new Date(),
        updated_at: new Date(),
    }], {}),
};
