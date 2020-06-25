import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export const convert = (utc) => {
    return dayjs(utc).fromNow();
}