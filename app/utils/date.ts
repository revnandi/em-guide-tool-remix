import { format } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

const getCurrentFormattedDateTime = (datetime: string) => format(datetime, "dd MMM yyyy HH:mm:ss");

export {
  format,
  fromZonedTime,
  toZonedTime,
  getCurrentFormattedDateTime,
}