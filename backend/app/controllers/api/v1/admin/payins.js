const {  asyncMiddleware } = global;
const { Dates, ProjectPayins, Projects, Activities } = global.db;
const findCreateDate = require(`${global.paths.middlewares}/find-create-date`);

module.exports = (router) => {
  async function getProjectById(req, res, next) {
    console.log(req.body);
    req.project = await Projects.$$findByPk({id:req.body.projectId});
    next();
  }
    router.get(
        '/',
        asyncMiddleware(async (req, res) => {
            const { projectId, ...rest } = req.query;
            const filters = {
                ...rest,
                limit: req.limit,
                offset: req.offset,
            };
            const where = {};
            if (projectId) {
                where.projectId = +projectId;
            }
            const include = [
                {
                    where,
                    model: ProjectPayins,
                    as: ProjectPayins.$$name,
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
      asyncMiddleware(async (req, res, ) => {
        console.log(req.body)
        const activity = await Activities.create({
          ...req.body,
          isPaid: true
        });
        return res.http200(activity);
      })
    );
};
