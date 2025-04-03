import { matchShortInterface } from "./commonInterfaces";
import dateTimeText from "./dateTimeText";

export default function scoreText(matchData: matchShortInterface){
    const data = matchData.attributes;
    if (!(data.event_info.status == "finished" || data.event_info.status == "live")) {
        const [date, time] = dateTimeText(new Date(data.event_info.datetime));
        return date;
    }
    if (data.penalties) {
        return `${data.home_score}(${data.home_penalties}) - ${data.away_score}(${data.away_penalties})`;
    }
    return `${data.home_score} - ${data.away_score}`;
}