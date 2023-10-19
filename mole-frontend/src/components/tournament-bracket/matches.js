/*
    This is a matches object demo
    object structure example: https://www.npmjs.com/package/@g-loot/react-tournament-brackets#:~:text=Data-,structures,-Single%20Eliminations%20matches
    TODO: production implementation
*/

export const matches = [
    {
        "id": 100,
        "name": "Semi 1",
        "nextMatchId": 102, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "4", // Text for Round Header
        "startTime": "2021-05-30",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
        {
            "id": "alf", // Unique identifier of any kind
            "resultText": 2, // Any string works
            "isWinner": true,
            "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
            "name": "Alfieri"
        },
        {
            "id": "cat",
            "resultText": 1,
            "isWinner": false,
            "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
            "name": "Cattaneo"
        }
        ]
    },
    {
        "id": 101,
        "name": "Semi 2",
        "nextMatchId": 102, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "4", // Text for Round Header
        "startTime": "2021-05-30",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
        {
            "id": "gal", // Unique identifier of any kind
            "resultText": 1, // Any string works
            "isWinner": false,
            "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
            "name": "Galfer"
        },
        {
            "id": "cav",
            "resultText": 0,
            "isWinner": true,
            "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
            "name": "Cavour"
        }
        ]
    },
    {
        "id": 102,
        "name": "Finale",
        "nextMatchId": null, // Id for the nextMatch in the bracket, if it's final match it must be null OR undefined
        "tournamentRoundText": "4", // Text for Round Header
        "startTime": "2021-05-30",
        "state": "DONE", // 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | 'DONE' | 'SCORE_DONE' Only needed to decide walkovers and if teamNames are TBD (to be decided)
        "participants": [
        {
            "id": "alf", // Unique identifier of any kind
            "resultText": '1(4)', // Any string works
            "isWinner": false,
            "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY' | null
            "name": "Alfieri"
        },
        {
            "id": "cav",
            "resultText": '1(5)',
            "isWinner": true,
            "status": null, // 'PLAYED' | 'NO_SHOW' | 'WALK_OVER' | 'NO_PARTY'
            "name": "Cavour"
        }
        ]
    },
];