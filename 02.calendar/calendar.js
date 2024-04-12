#!/usr/bin/env node
import { program } from "commander";

const todayUtc = new Date();
program
  .option(
    "-m <value>",
    "input month",
    String(changeJstDate(todayUtc).getMonth() + 1),
  )
  .option(
    "-y <value>",
    "input year",
    String(changeJstDate(todayUtc).getFullYear()),
  );
program.parse();
const params = program.opts();
const monthIndex = Number(params["m"]) - 1;
const year = Number(params["y"]);

const header = `      ${monthIndex + 1}月 ${year}`;
console.log(header);
const WEEKDAYS = "日 月 火 水 木 金 土";
console.log(WEEKDAYS);

const startDay = changeJstDate(new Date(year, monthIndex, 1));
const endDay = changeJstDate(new Date(year, monthIndex + 1, 0));
const days = [startDay];
for (let i = 2; i < endDay.getDate(); i++) {
  days.push(changeJstDate(new Date(year, monthIndex, i)));
}
days.push(endDay);
const formattedDays = days.map((date) => {
  let day = String(date.getDate()).padStart(2);
  return day + (date.getDay() === 6 ? "\n" : " ");
});
const margin = Array.from({ length: startDay.getDay() }, () => "   ");
const calender = margin.concat(formattedDays);
console.log(calender.join(""));

function changeJstDate(utcDate) {
  const jstOffset = 9 * 60;
  return new Date(utcDate.getTime() + jstOffset * 60000);
}
