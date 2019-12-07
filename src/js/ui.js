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
  let parent = $(this).parents(".op-section-tab");
  parent.find(".op-dropdown-toggle").trigger("click");
  parent.next().find(".op-dropdown-toggle").trigger("click");
});

});
