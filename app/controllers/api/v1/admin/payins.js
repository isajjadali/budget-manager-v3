const {asyncMiddleware} = global;
const {Dates, Activities, Projects, Sequelize} = global.db;
const {ActivitiesType} = global.appEnums;
const findCreateDate = require(`${global.paths.middlewares}/find-create-date`);

module.exports = (router) => {
  function getProjectById(require = true) {
    return async (req, res, next) => {
      if (!require && !req.body.projectId) {
        next();
        return;
      }
      req.project = await Projects.$$findByPk({id: req.body.projectId});
      next();
    };
  }

  router.get(
    '/',
    asyncMiddleware(async (req, res) => {
      const {projectIds, range, ...rest} = req.query;
      const filters = {
        ...rest,
        limit: req.limit,
        offset: req.offset,
      };
      const where = {
        type: {
          [Sequelize.Op.eq]: ActivitiesType.payin
        }
      };
      if (projectIds) {
        where.projectId = {
          [Sequelize.Op.in]: projectIds.split(',').map(id => Number(id))
        };
      }
      if (range) {
        const [from, to] = range.split(',');
        filters.from = from;
        filters.to = to;
      }
      const include = [
        {
          where,
          model: Activities,
          as: Activities.$$name,
          required: true,
          include: [
            {
              model: Projects,
              as: Projects.$$singularName
            }
          ]
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
      asyncMiddleware(getProjectById(true)),
    ],
    asyncMiddleware(async (req, res,) => {
      const activity = await Activities.create({
        ...req.body,
        dateId: req.date.id,
        type: ActivitiesType.payin,
        isPayin: true,
      });
      return res.http200(activity);
    })
  );
  router.param(
    'activityId',
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
    .route('/:activityId')
    .put(
      asyncMiddleware(findCreateDate(false)),
      asyncMiddleware(getProjectById(false)),
      asyncMiddleware(async (req, res) => {
        const payinUpdate = {
          ...req.body,
          dateId: req.date ? req.date.id : req.activity.dateId,
        };
        const updated = await req.activity.update(payinUpdate);
        res.http200(updated);
      })
    );
};
