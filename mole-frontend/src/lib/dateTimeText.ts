
export default function dateTimeText(date : Date): [string, string]{
    const timeTxt = `${("00" + date.getHours()).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}`;
    const dateTxt =  `${date.getDate()}/${date.getMonth()}`;
    return [dateTxt, timeTxt];
}