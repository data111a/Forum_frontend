export default function FormatTime(obj) {
  let minute;
  if (obj?.minute < 10) {
    minute = `0${obj.minute}`;
  } else {
    minute = obj?.minute;
  }
  if (obj?.hour !== undefined) {
    return `${obj?.hour}:${minute}`;
  }
  return "";
}
