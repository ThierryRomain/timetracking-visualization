class DataGenerator {

  constructor(activities, timesteps, granularity){
    this.activities = activities;
    this.timesteps = timesteps;
    this.granularity = granularity;
    this.colors = ["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(201, 203, 207)"];
  }

  setTimesteps(t){
    this.timesteps = t;
  }

  setGranularity(g){
    this.granularity = g;
  }

  generateXDays(){
    let d = new Date();
    let x_axis = [];
    //rewind to start of time series
    d.setDate(d.getDate()-this.timesteps+1);
    //generate x axis
    for(let i = 0; i < this.timesteps; i++){
      x_axis.push(d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate());
      d.setDate(d.getDate() + 1);
    }
    return x_axis;
  }

  generateXWeeks(){
    let d = new Date();
    let x_axis = [];
    //rewind to start of the week
    d.setDate(d.getDate()-d.getDay());
    //rewind x weeks
    d.setDate(d.getDate()-((this.timesteps-1)*7));
    //generate x axis
    for(let i = 0; i < this.timesteps; i++){
      x_axis.push(d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate());
      d.setDate(d.getDate() + 7);
    }
    return x_axis;
  }

  generateXMonths(){
    let d = new Date();
    let x_axis = [];
    //rewind to start of the month
    d.setDate(0);
    //rewind x weeks
    d.setMonth(d.getMonth()-this.timesteps+1);
    //generate x axis
    for(let i = 0; i < this.timesteps; i++){
      x_axis.push(d.getFullYear() + '/' + (d.getMonth()+1) + '/' + d.getDate());
      d.setMonth(d.getMonth() + 1);
    }
    return x_axis;
  }

  generateData(mult){
    let dataArr = [];
    for(let i in this.activities){
      let thisObj = {};
      thisObj.label = this.activities[i].name;
      thisObj.borderColor = this.colors[getRandomInt(0,this.colors.length-1)];
      thisObj.backgroundColor = thisObj.borderColor;
      let series = [];
      for(let j = 0; j < this.timesteps; j++){
        let timestepTotal = 0;
        for(let h = 0; h < mult; h++){
          if(Math.random() < this.activities[i].prob){
            timestepTotal += getRandomInt(this.activities[i].min,this.activities[i].max);
          }
        }
        series.push(timestepTotal);
      }
      thisObj.data = series;
      dataArr.push(thisObj);
    }
    return dataArr;
  }

  generateXaxis(){
    switch(this.granularity){
      case 'days':
      return this.generateXDays();
      break;
      case 'weeks':
      return this.generateXWeeks();
      break;
      case 'months':
      return this.generateXMonths();
      break;
      default:
      console.error('unknown granularity, will generate datasets using days. Current supported granularity are days, weeks and months.');
      return this.processDays();
      break;
    }
  }

  generateDataSets(){
    switch(this.granularity){
      case 'days':
      return this.generateData(1);
      break;
      case 'weeks':
      return this.generateData(7);
      break;
      case 'months':
      return this.generateData(30);
      break;
      default:
      console.error('unknown granularity, will generate datasets using days. Current supported granularity are days, weeks and months.');
      return this.generateData(1);
      break;
    }
  }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
