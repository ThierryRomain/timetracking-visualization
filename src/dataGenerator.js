class DataGenerator {

  constructor(activities, timesteps, granularity){
    this.activities = activities;
    this.timesteps = timesteps;
    this.granularity = granularity;
  }

  setTimesteps(t){
    this.timesteps = t;
  }

  setGranularity(g){
    this.granularity = g;
  }

  processDays(){
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

  processWeeks(){
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

  processMonths(){
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

  generateXaxis(){
    switch(this.granularity){
      case 'days':
      return this.processDays();
      break;
      case 'weeks':
      return this.processWeeks();
      break;
      case 'months':
      return this.processMonths();
      break;
      default:
      console.error('unknown granularity, will generate X axis using days. Current supported granularity are days, weeks and months.');
      return this.processDays();
      break;
    }
  }

  generateDataSets(){

  }

}
