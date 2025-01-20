import cronstrue from "cronstrue";
import parser from "cron-parser";
import { isValidCron } from "cron-validator";
import moment from "moment-timezone";

const isCronValid = (cron) => {
  return isValidCron(cron, {
    allowBlankDay: true,
    alias: true,
    seconds: true,
  });
};

const cronToHuman = (cron, option = {}) => {
  if (!isCronValid(cron)) return "Invalid cron expression";

  return cronstrue.toString(cron, {
    dayOfWeekStartIndexZero: true,
    use24HourTimeFormat: true,
    throwExceptionOnParseError: true,
    ...option,
  });
};

const nextRun = (cron, format = "") => {
  if (!isCronValid(cron)) return;

  const interval = parser.parseExpression(cron);
  const next = interval.next().toDate();

  if (format) {
    return moment(next).format(format);
  } else {
    return next.toLocaleString();
  }
};

export { isCronValid, cronToHuman, nextRun };
