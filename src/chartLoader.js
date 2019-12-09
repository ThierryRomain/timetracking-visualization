class ChartLoader{
  constructor(settingsCollector,activities){
    this.settingCollector = settingsCollector;
    this.activities = activities;
    this.generator = new DataGenerator(activities,20,'days');
    this.chart1 = undefined;
    this.chart2 = undefined;
    this.chart3 = undefined;
  }

  getConfig(type){
    switch(type){
      case 1:
      var config = {
            type: "bar",
            data: {
              labels: this.generator.generateXaxis(),
              datasets: this.generator.generateDataSets(true,"bar")
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: 'Timetracking data'
              },
              tooltips: {
                mode: 'index',
              },
              hover: {
                mode: 'index'
              },
              scales: {
                xAxes: [{
                  stacked:true,
                  scaleLabel: {
                    display: true,
                  }
                }],
                yAxes: [{
                  stacked: true,
                  scaleLabel: {
                    display: true,
                    labelString: '% or minutes'
                  }
                }]
              }
            }
          };
          break;
      case 2:
      var config = {
        type: "line",
            data: {
              labels: this.generator.generateXaxis(),
              datasets: this.generator.generateDataSets(true,"line")
            },
            options: {
              responsive: true,
              title: {
                display: true,
                text: 'Orphic Timetracking data'
              },
              tooltips: {
                mode: 'index',
              },
              hover: {
                mode: 'index'
              },
              scales: {
                xAxes: [{
                  stacked:true,
                  scaleLabel: {
                    display: true,
                  }
                }],
                yAxes: [{
                  stacked: true,
                  scaleLabel: {
                    display: true,
                    labelString: '% or minutes'
                  }
                }]
              }
            }
          };
          break;
      case 3 :
      var config = {
            type:"doughnut",
            data: {
              labels: this.generator.generateXaxisDoughnut(),
              datasets: this.generator.generateDataSets(true,"doughnut")
            },
            options: {
          				responsive: true,
          				legend: {
          					position: 'top',
          				},
          				title: {
          					display: true,
          					text: 'Orphic Timetracking data'
          				},
          				animation: {
          					animateScale: true,
          					animateRotate: true
          				}
          			}
          };
          break;
    }

    return config;
  }

  refresh(){
    if(this.settingCollector.settings.chartTypes.indexOf("bar") > -1){
      $("#chart1-title").show(400);
      $("#chart1-canvas").show(400);
      if(this.chart1 == undefined){
        let canvas = document.getElementById('chart1-canvas').getContext('2d');
        this.chart1 = new Chart(canvas, this.getConfig(1));
      }
      this.chart1.update();
    }else{
      $("#chart1-title").hide(400);
      $("#chart1-canvas").hide(400);
    }
    if(this.settingCollector.settings.chartTypes.indexOf("area") > -1){
      $("#chart2-title").show(400);
      $("#chart2-canvas").show(400);
      if(this.chart2 == undefined){
        let canvas = document.getElementById('chart2-canvas').getContext('2d');
        this.chart2 = new Chart(canvas, this.getConfig(2));
      }
      this.chart2.update();
    }else{
      $("#chart2-title").hide(400);
      $("#chart2-canvas").hide(400);
    }
    if(this.settingCollector.settings.chartTypes.indexOf("pie") > -1){
      $("#chart3-title").show(400);
      $("#chart3-canvas").show(400);
      if(this.chart3 == undefined){
        let canvas = document.getElementById('chart3-canvas').getContext('2d');
        this.chart3 = new Chart(canvas, this.getConfig(3));
      }
      this.chart3.update();
    }else{
      $("#chart3-title").hide(400);
      $("#chart3-canvas").hide(400);
    }
  }

}
