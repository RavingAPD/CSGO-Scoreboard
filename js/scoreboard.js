//Scoreboard.js
function scoreboard() {

    //Variables
    var jsonData = [];
    var interval = 0;
    var frequency = 5000;

    var init = function() {
        clearData();
        getData();

        setTimeout(function() {
            getMap();
            getTeams();
            getRound();
            getScore();
            startLoop();
        }, 100);
    };

    var getData = function() {
        $.getJSON("http://localhost/CSGO%20Scoreboard/data/scoreboard.json", function(data) {
            jsonData = data
            console.log("got the data");
        });
    };

    var clearData = function() {
        $(".team .name").empty();
        $(".map").empty();
        $(".map-round").empty();
        $(".score").empty();
    };

    //Get the map
    var getMap = function() {
        var map = jsonData.map;
        var $map = $(".map");
        $map.append("Map: " + jsonData.map.replace("_", " ").toUpperCase());
    };

    //Get the teams
    var getTeams = function() {
        var teamName = jsonData.teams;
        var $team1 = $(".team-1 .name");
        var $team2 = $(".team-2 .name");
        $team1.append(teamName[0].name); 
        $team2.append(teamName[1].name);
    };

    var getRound = function() {
        var round = jsonData.round;
        var $round = $(".current-round span");

        $round.append(round);
    };

    //Get the score
    var getScore = function() {
        var roundWins = jsonData.teams;
        var $team1 = $(".team-1 .score");
        var $team2 = $(".team-2 .score");

        $team1.append(roundWins[0].roundsWon);
        $team2.append(roundWins[1].roundsWon);
    };

    var reloadData = function() {
        clearData();
        getData();
        getTeams();
        console.log("Reloaded Data")
        getMap();
        getScore();
        getRound();
    };

    //Created and starts the loop for reloading the data
    var startLoop = function() {
        if ( interval > 0 ) clearInterval(interval);
        setInterval(function() {
            reloadData();
        }, frequency);
    };

    return {
        init: function() {
            init();
        },

        getMap: function() {
            getMap();
        },

        getRound: function() {
            getRound();
        },

        getTeams: function() {
            getTeams();
        },

        getScore: function() {
            getScore();
        },

        reloadData: function() {
            reloadData();
        },
    }
}

$(document).ready(function() {
    var sc = scoreboard();
    sc.init();
    //sc.reloadData();
});