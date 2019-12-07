$( document ).ready(function() {

setTimeout(function(){
  ////////////////////////////////////////////////////////////////////////
  // Heading animation. Credit https://tobiasahlin.com/moving-letters/#11
  ////////////////////////////////////////////////////////////////////////

  var textWrapper = document.querySelector('.appearing-text .letters');
  textWrapper.innerHTML = textWrapper.textContent.replace(/([^\s])/g, "<span class='letter'>$&</span>");

  $('.letters').css('opacity',1);

  anime.timeline({loop: true})
    .add({
      targets: '.appearing-text .line',
      scaleY: [0,1],
      opacity: [0.5,1],
      easing: "easeOutExpo",
      duration: 700
    })
    .add({
      targets: '.appearing-text .line',
      translateX: [0, document.querySelector('.appearing-text .letters').getBoundingClientRect().width + 10],
      easing: "easeOutExpo",
      duration: 700,
      delay: 100
    }).add({
      targets: '.appearing-text .letter',
      opacity: [0,1],
      easing: "easeOutExpo",
      duration: 600,
      offset: '-=775',
      delay: (el, i) => 34 * (i+1)
    }).add({
      targets: '.appearing-text .line',
      scaleY: [0,1],
      opacity: [1,0],
      easing: "easeOutExpo",
      duration: 700
    }).add({
      targets: '.appearing-text',
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 5000
    });
},500);

$(".op-dropdown-toggle").on("click", function(){
  $(this).siblings(".op-dropdown").toggle(400);
  $(this).find(".w-icon-dropdown-toggle").toggleClass("rotated");
});

$(".op-prompt-card").on("click",function(){
  $(this).addClass("selected");
  $(this).find(".op-prompt-close-container").show(400);
  let parent = $(this).parents(".op-section-tab");
  if($(this).data("close")!=false){
    parent.find(".op-dropdown-toggle").trigger("click");
    parent.next().find(".op-dropdown-toggle").trigger("click");
  }
  if($(this).data("settingLabel") == "generateTheData" && $(this).data("value") == false){
    $(".file-popup-container").show(400);
    $(".op-file-prompt-close-container").show(400);
  }
  if($(this).data("settingLabel") ==  "chartTypes"){
    userSettings.settings.chartTypes.pushIfNotExist($(this).data("value"));
    chartLoader.refresh();
  }else{
    userSettings.addSetting($(this).data("settingLabel"),$(this).data("value"));
  }
});

$(".op-prompt-close-container").on("click",function(e){
  e.stopPropagation();
  let card = $(this).parent(".op-prompt-card");
  card.removeClass("selected");
  if(card.data("settingLabel") ==  "chartTypes"){
    let index = userSettings.settings.chartTypes.indexOf(card.data("value"));
    if (index > -1) {
      userSettings.settings.chartTypes.splice(index, 1);
    }
    chartLoader.refresh();
  }else{
    userSettings.addSetting(card.data("settingLabel"),"");
  }
  $(this).hide(400);
});

$(".op-file-prompt-close-container").on("click",function(e){
  e.stopPropagation();
  $(this).hide(400);
  $(this).parents(".file-popup-container").hide(400);
});



});
