import cronstrue from "cronstrue";
import parser from "cron-parser";
import { isValidCron } from "cron-validator";
import moment from "moment-timezone";

/**
 * Validates a cron expression.
 * @param {string} cron - The cron expression to validate.
 * @returns {boolean} True if the cron expression is valid, false otherwise.
 */
const isCronValid = (cron) => {
  return isValidCron(cron, {
    allowBlankDay: true,
    alias: true,
    seconds: true,
  });
};

/**
 * Converts a cron expression to a human-readable string.
 * @param {string} cron - The cron expression.
 * @param {Object} [option={}] - Options for cronstrue.
 * @returns {string} Human-readable representation of the cron expression.
 */
const cronToHuman = (cron, option = {}) => {
  if (!isCronValid(cron)) return "Invalid cron expression";

  return cronstrue.toString(cron, {
    dayOfWeekStartIndexZero: true,
    use24HourTimeFormat: true,
    throwExceptionOnParseError: true,
    ...option,
  });
};

/**
 * Calculates the next run time for a given cron expression.
 * @param {string} cron - The cron expression.
 * @param {string} [format=""] - Optional moment.js format string for the output.
 * @returns {string|undefined} The next run time as a string, or undefined if invalid.
 */
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
