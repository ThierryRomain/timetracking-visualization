// adds an element to the array if it does not already exist using a comparer
// function
Array.prototype.pushIfNotExist = function(element) {
  inArray = false;
  for(let i = 0; i < this.length; i++){
    if(element == this[i]){
      inArray = true;
    }
  }
  if (!inArray) {
    this.push(element);
  }
};

class SettingsCollector {

  constructor(id){
    this.id = id;
    this.settings = {
      chartTypes : []
    };
  }

  addSetting(name,value){
    this.settings[name] = value;
  }
}
