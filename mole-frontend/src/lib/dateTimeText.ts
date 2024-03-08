
export default function dateTimeText(date : Date): [string, string]{
    /*@ts-ignore */
    const timeTxt = `${("00" + date.getHours("it-IT", {timeZone: 'Europe/Rome'})).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}`;
    const dateTxt =  `${date.getDate()}/${date.getMonth() + 1}`;
    return [dateTxt, timeTxt];
}