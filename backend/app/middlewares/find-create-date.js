const { Dates } = global.db;
module.exports = (isRequired = true) =>
  async function getDate(req, res, next) {
    const { date } = req.body;

    if (!isRequired && !date) {
      next();
      return;
    }

    const dateObject = await Dates.findCreate(date);
    req.date = dateObject;
    next();
  };
