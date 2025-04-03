import { matchShortInterface } from "./commonInterfaces";
import dateTimeText, { dateTimeTextDynamic } from "./dateTimeText";

export default function scoreText(matchData: matchShortInterface){
    const data = matchData.attributes;
    if (!(data.event_info.status == "finished" || data.event_info.status == "live")) {
        return dateTimeTextDynamic(new Date(data.event_info.datetime));
    }
    if (data.penalties) {
        return `${data.home_score}(${data.home_penalties}) - ${data.away_score}(${data.away_penalties})`;
    }
    return `${data.home_score} - ${data.away_score}`;
}