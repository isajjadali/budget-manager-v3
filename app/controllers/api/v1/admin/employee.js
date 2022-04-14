const { asyncMiddleware } = global;
const { Roles } = global.appEnums;
const { generateRandomPassword } = global.commonFunctions;
const { Users, Sequelize } = global.db;

module.exports = (router) => {
    router
        .route('/')
        .get(
            asyncMiddleware(async (req, res) => {
                const query = {
                    where: {
                        roles: Roles.Employee,
                    },
                };
                if (req.query.search) {
                    const likeObject = {
                        [Sequelize.Op.like]: `${req.query.search}%`,
                    };
                    query.where[Sequelize.Op.or] = [
                        {
                            firstName: likeObject,
                        },
                        {
                            lastName: likeObject,
                        },
                        {
                            middleName: likeObject,
                        },
                        {
                            email: likeObject,
                        },
                        {
                            addresses: likeObject,
                        },
                    ];
                }
                const employees = await Users.findAll(query);
                return res.http200(employees);
            })
        )
        .post(
            asyncMiddleware(async (req, res) => {
                const password = generateRandomPassword();
                const employee =await Users.create({
                    ...req.body,
                    password,
                    roles: Roles.Employee,
                });
                // TODO: NEED TO IMPLEMENT THE EMAIL Password to employee here;
                return res.http200(employee);
            })
        );

    router.param(
        'employeeId',
        asyncMiddleware(async (req, res, next, employeeId) => {
            const employee = await Users.$$findOne({
                query:{where: {
                    id: employeeId,
                    roles: Roles.Employee,
                },
                }
            });
            req.employee = employee;
            next();
        })
    );

    router
        .route('/:employeeId')
        .get(
            asyncMiddleware(async (req, res) => {
                res.json(req.employee);
            })
        )
        .put(
            asyncMiddleware(async (req, res) => {
                delete req.body.roles;
                const updatedEmployee = await req.employee.update(req.body);
                return res.http200(updatedEmployee);
            })
        )
        .delete(
            asyncMiddleware(async (req, res) => {
                await req.employee.destroy();
                return res.http200({ message: 'Deleted employee successfully.' });
            })
        );
};
