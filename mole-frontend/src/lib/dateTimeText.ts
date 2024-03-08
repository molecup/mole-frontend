
export default function dateTimeText(date : Date): [string, string]{
    let options = {
        timeZone: 'Europe/Rome',
      }
    
    const hour = date.toLocaleString('it-IT', {hour: '2-digit',   hour12: false, timeZone: 'Europe/Rome' })

    const timeTxt = `${("00" + hour).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}`;
    const dateTxt =  `${date.getDate()}/${date.getMonth() + 1}`;
    return [dateTxt, timeTxt];
}