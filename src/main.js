var userSettings = new SettingsCollector(0);



//activity probabilities are always defined on the day timescale
var activities = [
  { name : "sleep" , prob : 1 , min : 300 , max : 600 },
  { name : "making dreams come true" , prob : 0.8 , min : 50 , max : 300 },
  { name : "programming" , prob : 0.7 , min : 300 , max : 800 },
  { name : "drinking coffee" , prob : 0.5 , min : 15 , max : 60 },
  { name : "squashing bugs" , prob : 0.4 , min : 60 , max : 330 }
]

const generator = new DataGenerator(activities,10,'months');
let x_axis = generator.generateXaxis();
let datasets = generator.generateDataSets();
console.log(datasets);

// var config = {
//   data: {
//     labels: x_axis,
//     datasets: datasets
//   },
//   options: {
//     responsive: true,
//     title: {
//       display: true,
//       text: 'Timetracking data'
//     },
//     tooltips: {
//       mode: 'index',
//     },
//     hover: {
//       mode: 'index'
//     },
//     scales: {
//       xAxes: [{
//         stacked:true,
//         scaleLabel: {
//           display: true,
//         }
//       }],
//       yAxes: [{
//         stacked: true,
//         scaleLabel: {
//           display: true,
//           labelString: '% or minutes'
//         }
//       }]
//     }
//   }
// };
//
// window.onload = function() {
//   var ctx = document.getElementById('myChart').getContext('2d');
//   window.myLine = new Chart(ctx, config);
// };




// const parser = new TimetrackingParser("./data/timetracking.csv");
//
// parser.load();
