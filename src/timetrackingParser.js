class TimetrackingParser {

  constructor(file){
    this.dataFile = file;
    this.parsedData = [];
  }

  getCategoriesTotal(lines){
    //get final section starting line
    let index = 0;
    for(i = lines.length-1; i>0; i--){
      if(lines[i] == "\"Activity type\",\"Duration\",\"%\""){
        index = i;
        break;
      }
    }
    //get categories
    for (var i = index+1; i < lines.length; i++) {
      let line = lines[i].split(",");
      if(line.length == 3 && line[0] != "\"Total\"" && line[0] != "\"Untracked time\""){
        let cat = line[0].replace(/['"]+/g, '');
        let total = line[1].replace(/['"]+/g, '');
        this.parsedData.push({cat:cat,total:total});
      }
    }
  }

  addDayData(lines){
    for (var i = 0; i < lines.length; i++) {
      //bail
      if(lines[i] == "\"Activity type\",\"Duration\",\"%\""){
        break;
      }
      //ignore
      if(lines[i][0] == ";" || lines[i].length == 0){
        continue;
      }
      let line = lines[i].split(",");
      if(line[0] != undefined && line[1] != undefined && line[2] != undefined && line[3] != undefined){
        var thisCat = line[0].replace(/['"]+/g, '');
        var thisTime = (line[1].replace(/['"]+/g, '').split(":")[0]*60) + line[1].replace(/['"]+/g, '').split(":")[1];
        var startTime = line[2].replace(/['"]+/g, '').split(" ")[0];
        var endTime = line[3].replace(/['"]+/g, '').split(" ")[0];
      }else{
        console.error("Line " + i + " not recognized");
        continue;
      }
      for(let i in this.parsedData){
        if(this.parsedData[i].cat == thisCat){
          if('day' in this.parsedData[i]){
            if(this.parsedData[i].day[startTime] != undefined){
              this.parsedData[i].day[startTime] = parseInt(this.parsedData[i].day[startTime]) + parseInt(thisTime);
            }else{
              this.parsedData[i].day[startTime] = parseInt(thisTime);
            }
          }else{
            this.parsedData[i].day = { [startTime] : thisTime };
          }
        }
      }
    }
  }

  load(){
    var tracker  = this;
    $.get(this.dataFile,function(txt){
      var lines = txt.split("\n");
      tracker.getCategoriesTotal(lines);
      tracker.addDayData(lines);
      console.log(tracker.parsedData);
    });
  }
}
