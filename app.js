const card = document.querySelector(".card");
const upcoming = document.querySelector(".upcoming");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8f8a4f86d5msh052dacb14b628aep13fb6bjsn9854870e2355',
		'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
	}
};

fetch('https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent', options)
	.then(response => response.json())
	.then(response => {
        card.innerHTML= " ";

        for(let i=0; i<100; i++){
            let section = document.createElement("div");
            section.classList.add("section");
            let seriesname = response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchInfo.seriesName;
            let description = response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchInfo.matchDesc;
            let team1 = response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchInfo.team1.teamName;
            let team2 = response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchInfo.team2.teamName;
            let state = response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchInfo.state;
            let result = response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchInfo.status;
            let scorecard = response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchInfo.matchId;
            let team1score = "";
            let team2score = "";
            if(response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchInfo.stateTitle === "Abandon")
            {
                team1score = "Unavailable";
                team2score = "Unavailable";
            }
            else{
            team1score = response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchScore.team1Score.inngs1.runs + "/" + response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchScore.team1Score.inngs1.wickets + "in (" +response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchScore.team1Score.inngs1.overs + ") ovr";
            team2score = response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchScore.team2Score.inngs1.runs + "/" + response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchScore.team2Score.inngs1.wickets + "in (" +response.typeMatches[0].seriesMatches[0].seriesAdWrapper.matches[i].matchScore.team2Score.inngs1.overs + ") ovr";
            }
            section.innerHTML = `
                    <h3 class="heading">${seriesname}</h3>
                    <h5 class="description">${description}</h5>
                    <div class="teams">
                    <h2 class="team1">${team1}</h2>
                    <h3 class="team1score">${team1score}</h1>
                    </div>
                    <div class="teams">
                    <h2 class="team2">${team2}</h2>
                    <h3 class="team2score">${team2score}</h3>
                    </div>
                    <h6 class="state">${state}</h6>
                    <h4 class="result">${result}</h4>
                    <a class="scorecard" href="https://www.cricbuzz.com/cricket-scores/${scorecard}/ target="_blank">MATCH DETAILS</a>
            `;
            card.appendChild(section);
        }
    })
	.catch(err => console.error(err));


fetch('https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international', options)
	.then(response => response.json())
	.then(response => {
        upcoming.innerHTML= " ";

        for(let j=0; j<5; j++)
        {
                for(let k=0; k<5;k++){
                    let upsec = document.createElement("div");
                    upsec.classList.add("upsec");
            let seriesname = response.matchScheduleMap[j].scheduleAdWrapper.matchScheduleList[0].seriesName;
            let description = response.matchScheduleMap[j].scheduleAdWrapper.matchScheduleList[0].matchInfo[k].matchDesc;
            let team1 = response.matchScheduleMap[j].scheduleAdWrapper.matchScheduleList[0].matchInfo[k].team1.teamName;
            let team2 = response.matchScheduleMap[j].scheduleAdWrapper.matchScheduleList[0].matchInfo[k].team2.teamName;
            let date = response.matchScheduleMap[j].scheduleAdWrapper.date;
            let venue = response.matchScheduleMap[j].scheduleAdWrapper.matchScheduleList[0].matchInfo[k].venueInfo.ground + "," + response.matchScheduleMap[j].scheduleAdWrapper.matchScheduleList[0].matchInfo[k].venueInfo.city + "," + response.matchScheduleMap[j].scheduleAdWrapper.matchScheduleList[0].matchInfo[k].venueInfo.country;
            let scorecard = response.matchScheduleMap[j].scheduleAdWrapper.matchScheduleList[0].matchInfo[k].matchId;
            
            upsec.innerHTML = `
                    <h3 class="heading">${seriesname}</h3>
                    <h5 class="description">${description}</h5>
                    <div class="upteams">
                    <h2 class="upteam">${team1}</h2>
                    <h2 class="upteam">Vs</h2>
                    <h2 class="upteam">${team2}</h2>
                    </div>
                    <h6 class="state">${venue}</h6>
                    <h4 class="result">${date}</h4>
                    <a class="scorecard" href="https://www.cricbuzz.com/cricket-scores/${scorecard}/ target="_blank">MATCH DETAILS</a>
            `;
            upcoming.appendChild(upsec);}
        }

    })
	.catch(err => console.error(err));
