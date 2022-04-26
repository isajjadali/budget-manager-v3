const { asyncMiddleware } = global;
const findCreateDate = require(`${global.paths.middlewares}/find-create-date`);
const { Roles } = global.appEnums;
const { Users, Activities, Projects, Dates } = global.db;

module.exports = (router) => {
  async function getEmployee(req, res, next) {
    const id =
      req.body.employeeId || req.params.employeeId || req.query.employeeId;
    if (!id) {
      next();
      return;
    }
    const employee = await Users.$$findOne({
      query: {
        where: {
          id,
          roles: Roles.Employee,
        },
      },
    });
    req.employee = employee;
    next();
  }

  async function projectByIdMiddleware(req, res, next) {
    const { projectId } = req.body;
    if (!projectId) {
      next();
      return;
    }
    console.log("===============", projectId);
    req.project = await Projects.$$findByPk({ id: projectId });
    next();
  }
  router.param(
    "activityId",
    asyncMiddleware(async (req, res, next, activityId) => {
      const activity = await Activities.$$findOne({
        query: {
          where: {
            id: +activityId,
          },
          include: [
            {
              model: Dates,
              as: Dates.$$singularName,
            },
          ],
        },
      });
      req.activity = activity;
      next();
    })
  );
  router
    .route("/")
    .post(
      asyncMiddleware(findCreateDate()),
      asyncMiddleware(getEmployee),
      asyncMiddleware(async (req, res) => {
        const { amount, projectId } = req.body;
        const activity = await req.employee.logActivity({
          amount,
          projectId,
          dateId: req.date.id,
        });
        res.http200(activity);
      })
    )
    .get(
      asyncMiddleware(async (req, res) => {
        console.log("In Activity Gets");
        const { projectId, employeeId, ...rest } = req.query;
        const filters = {
          ...rest,
          limit: req.limit,
          offset: req.offset,
        };
        const where = {};
        if (projectId) {
          where.projectId = +projectId;
        }
        if (employeeId) {
          where.employeeId = +employeeId;
        }
        const include = [
          {
            where,
            model: Activities,
            as: Activities.$$name,
            include: [
              {
                model: Users,
                as: "employee",
              },
              {
                model: Projects,
                as: Projects.$$singularName,
                required: false,
              },
            ],
          },
        ];
        const activities = await Dates.getResultsOf({
          filters,
          include,
        });
        res.http200(activities);
      })
    );

  router
    .route("/:activityId")
    .get(
      asyncMiddleware(async (req, res) => {
        console.log("In Activity ID");
        res.http200(req.activity);
      })
    )
    .put(
      asyncMiddleware(findCreateDate(false)),
      asyncMiddleware(projectByIdMiddleware),
      asyncMiddleware(getEmployee),
      asyncMiddleware(async (req, res) => {
        console.log("===============", req);
        const updatedActivity = await req.activity.update({
          ...req.body,
          dateId: req.date.id,
        });
        return res.http200(updatedActivity);
      })
    );
};
