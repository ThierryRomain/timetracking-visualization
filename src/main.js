//activity probabilities are always defined on the day timescale
var activities = [
  { name : "sleep" , prob : 1 , min : 300 , max : 600 },
  { name : "making dreams come true" , prob : 0.8 , min : 50 , max : 300 },
  { name : "programming" , prob : 0.7 , min : 300 , max : 800 },
  { name : "drinking coffee" , prob : 0.5 , min : 15 , max : 60 },
  { name : "squashing bugs" , prob : 0.4 , min : 60 , max : 330 }
];
var userSettings = new SettingsCollector(0);
var chartLoader = new ChartLoader(userSettings,activities);

// window.onload = function() {
//   var ctx = document.getElementById('mainChart').getContext('2d');
//   window.myLine = new Chart(ctx, config);
// };




// const parser = new TimetrackingParser("./data/timetracking.csv");
//
// parser.load();
