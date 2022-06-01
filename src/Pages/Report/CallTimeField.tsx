import { useRecordContext } from "react-admin";

export const CallTimeField = ({ source }: any) => {
  const record = useRecordContext();
  const time = record[source] || 0;
  return <span>{toString(time)}</span>;
};

const toString = (time: number): string => {
  let r = "";
  r = format(time % 60);
  time = Math.floor(time / 60);
  r = format(time % 60) + ":" + r;
  time = Math.floor(time / 60);
  r = time + ":" + r;
  return r;
};

const format = (time: number): string => {
  if (!time) {
    return "00";
  }
  if (time < 9) {
    return `0${time}`;
  }
  return String(time);
};
