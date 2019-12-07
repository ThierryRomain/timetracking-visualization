class DataGenerator {

  constructor(activities, timesteps, granularity){
    this.activities = activities;
    this.timesteps = timesteps;
    this.granularity = granularity;
    this.colors = ["#EBEBC6", "#97FBEA", "#98F7FB", "#A2EAB4", "#B09CDE", "#F1C1FF", "#96FAAF", "#FFA6A6", "#9BBCE0", "#FFE0A5", "#A0C4DC", "#D699FF", "#F9C0FB", "#B8E8AC", "#EEDE94", "#F1D895", "#9EB3E4", "#F4C2FF", "#CC95CC", "#E5D1AE", "#B2D2CC", "#CFAAF4", "#A5E991", "#B8B8FF", "#ADF398", "#FFB0CA", "#D3BFFF", "#A8B0E8", "#E6C7B1", "#F0DDB0", "#ABEEFE", "#D698D6", "#FFBAEE", "#BFECFF", "#FFBDDE", "#E4C4B4", "#98FEF9", "#D8D898", "#C7A1D1", "#EDBFFE", "#96F9C5", "#E3C3BC", "#BDDBFF", "#FFC998", "#F8CF9D", "#98F0FD", "#95F7DA", "#DD9FC6", "#BAD3BB", "#BDA6F1", "#E5D9B1", "#A2CEDB", "#FFC0E7", "#F1D595", "#E9E094", "#FC9898", "#9898EB", "#DEBCAD", "#ABA1EE", "#E3E3A3", "#BDE3FF", "#BAF294", "#B3CAFF", "#E5C8AA", "#E0BFFF", "#B5FD9D", "#ABD0D4", "#FFBFF6", "#F4B1B1", "#B0EE93", "#CBA8EC", "#CEA3CE", "#9AC8D5", "#E2C0B3", "#FFD3AB", "#EBB5B5", "#A6B6F0", "#E2C0B1", "#F2DB94", "#E1E29A", "#F8DB9D", "#EBA1AC", "#FFCEA2", "#C9E596", "#B2BDFF", "#E6C5B8", "#FFBEEA", "#E2A5B6", "#FFDAA9", "#F4A8AD", "#DCDD99", "#E2C3C3", "#D3A2F9", "#CF9CD4", "#A5BFE2", "#C899D9", "#D29EE6"];
    this.colorOffset = getRandomInt(0,this.colors.length-1);
    this.doughnutColor = getRandomInt(0,this.colors.length-1);
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

  generateXaxisDoughnut(){
    let x_axis = [];
    for(let i = 0; i < this.activities.length; i++){
      x_axis.push(this.activities[i].name);
    }
    return x_axis;
  }

  generateData(mult,relative,type,xAxis){
    let dataArr = [];
    if(type=="doughnut"){
      for(let i = 0; i < xAxis.length; i++){
        let thisObj = {};
        thisObj.label = xAxis[i];
        let series = [];
        let bColors = [];
        for(let j = 0; j < this.activities.length; j++){
          this.doughnutColor++;
          bColors.push(this.colors[(this.doughnutColor)%this.colors.length]);
          let timestepTotal = 0;
          for(let h = 0; h < mult; h++){
            if(Math.random() < this.activities[j].prob){
              timestepTotal += getRandomInt(this.activities[j].min,this.activities[j].max);
            }
          }
          if(relative){
            series.push(Math.floor((timestepTotal/(1440*mult))*100));
          }else{
            series.push(timestepTotal);
          }
        }
        this.doughnutColor -= this.activities.length;
        thisObj.data = series;
        thisObj.backgroundColor = bColors;
        dataArr.push(thisObj);
      }
    }else{
      for(let i = 0; i < this.activities.length; i++){
        let thisObj = {};
        thisObj.label = this.activities[i].name;
        this.colorOffset = i + this.colorOffset;
        thisObj.borderColor = this.colors[(this.colorOffset)%this.colors.length];
        thisObj.backgroundColor = thisObj.borderColor;
        let series = [];
        for(let j = 0; j < this.timesteps; j++){
          let timestepTotal = 0;
          for(let h = 0; h < mult; h++){
            if(Math.random() < this.activities[i].prob){
              timestepTotal += getRandomInt(this.activities[i].min,this.activities[i].max);
            }
          }
          if(relative){
            series.push(Math.floor((timestepTotal/(1440*mult))*100));
          }else{
            series.push(timestepTotal);
          }
        }
        thisObj.data = series;
        dataArr.push(thisObj);
      }
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

  generateDataSets(relative,type){
    switch(this.granularity){
      case 'days':
      return this.generateData(1,relative,type,this.generateXaxis());
      break;
      case 'weeks':
      return this.generateData(7,relative,type,this.generateXaxis());
      break;
      case 'months':
      return this.generateData(30,relative,type,this.generateXaxis());
      break;
      default:
      console.error('unknown granularity, will generate datasets using days. Current supported granularity are days, weeks and months.');
      return this.generateData(1,relative);
      break;
    }
  }

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
