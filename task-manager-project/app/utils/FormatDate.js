const moment = require("moment/moment");
const FormatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export default FormatDate;
