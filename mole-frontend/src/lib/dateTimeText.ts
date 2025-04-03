
function formatString(str: any, prefix = "00", lenght=2): string {
    return (prefix + String(str)).slice(-lenght); ;
}

export default function dateTimeText(date : Date): [string, string]{
    const hour = date.toLocaleString('it-IT', {hour: '2-digit',   hour12: false, timeZone: 'Europe/Rome' })

    const timeTxt = `${formatString(hour)}:${formatString(date.getMinutes())}`;
    const dateTxt =  `${date.getDate()}/${formatString(date.getMonth() + 1)}`;
    return [dateTxt, timeTxt];
}


//default for horizon is 24h
// if invert is true, it will show the time if the datetime is closer than horizon (w.r.t. current datetime), otherwise it will show the date
export function dateTimeTextDynamic(date: Date, invert = false, horizon = 1000*60*60*24) : string{
    const showTime = (date.getTime() - new Date().getTime()) < horizon; 
    const [dateTxt, timeTxt] = dateTimeText(date);
    if(invert){
        return showTime ? dateTxt : timeTxt;
    }
    return showTime ? timeTxt : dateTxt;
}