const {asyncMiddleware} = global;
const {Dates, Activities, Projects, Sequelize} = global.db;
const findCreateDate = require(`${global.paths.middlewares}/find-create-date`);

module.exports = (router) => {
  async function getProjectById(req, res, next) {
    req.project = await Projects.$$findByPk({id: req.body.projectId});
    next();
  }

  router.get(
    '/',
    asyncMiddleware(async (req, res) => {
      const {projectId, ...rest} = req.query;
      const filters = {
        ...rest,
        limit: req.limit,
        offset: req.offset,
      };
      const where = {
        projectId: {
          [Sequelize.Op.ne]: null
        }
      };
      if (projectId) {
        where.projectId = +projectId;
      }
      const include = [
        {
          where,
          model: Activities,
          as: Activities.$$name,
          required: true,
        },
      ];
      const payins = await Dates.getResultsOf({
        filters,
        include,
      });
      res.http200(payins);
    })
  );

  router.post(
    '/',
    [
      asyncMiddleware(findCreateDate()),
      asyncMiddleware(getProjectById),
    ],
    asyncMiddleware(async (req, res,) => {
      const activity = await Activities.create({
        ...req.body,
        dateId: req.date.id,
        isPaid: true
      });
      return res.http200(activity);
    })
  );
};
