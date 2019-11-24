// var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// var COLORS = {red: 'rgb(255,0,0)', green: 'rgb(0,255,0)', blue: 'rgb(0,0,255)'};
// var config = {
//   type: 'line',
//   data: {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [{
//       label: 'My First dataset',
//       borderColor: COLORS.red,
//       backgroundColor: COLORS.red,
//       data: [
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random()
//       ],
//     }, {
//       label: 'My Second dataset',
//       borderColor: COLORS.blue,
//       backgroundColor: COLORS.blue,
//       data: [
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random()
//       ],
//     }, {
//       label: 'My Third dataset',
//       borderColor: COLORS.green,
//       backgroundColor: COLORS.green,
//       data: [
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random()
//       ],
//     }, {
//       label: 'My Third dataset',
//       borderColor: COLORS.red,
//       backgroundColor: COLORS.red,
//       data: [
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random(),
//         Math.random()
//       ],
//     }]
//   },
//   options: {
//     responsive: true,
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart - Stacked Area'
//     },
//     tooltips: {
//       mode: 'index',
//     },
//     hover: {
//       mode: 'index'
//     },
//     scales: {
//       xAxes: [{
//         scaleLabel: {
//           display: true,
//           labelString: 'Month'
//         }
//       }],
//       yAxes: [{
//         stacked: false,
//         scaleLabel: {
//           display: true,
//           labelString: 'Value'
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

// var colorNames = Object.keys(window.chartColors);


  // window.myLine.update();

const parser = new TimetrackingParser("./data/timetracking.csv");

parser.load();