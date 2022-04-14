const {  asyncMiddleware } = global;
const { Dates, ProjectPayins } = global.db;

module.exports = (router) => {
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
};
