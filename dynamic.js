window.onscroll = function() {
    var scrollPos = window.pageYOffset;
    var navbar = document.getElementById("navbar");
    if (scrollPos > 500) {
        navbar.style.backgroundColor = "black";
    } else {
        navbar.style.backgroundColor = "transparent";
    }
};

//The following code is for the input range


var rangeInput = document.getElementById("range-input");
var rangeValue = document.getElementById("range-value");
var label = document.getElementById("range-label");

rangeInput.addEventListener("input", function() {
  var value = rangeInput.value;
  
  if (value <= 25) {
    rangeValue.innerHTML = "Low";
    label.innerHTML = "Low Range";
  } else if (value > 25 && value <= 50) {
    rangeValue.innerHTML = "Medium";
    label.innerHTML = "Medium Range";
  } else if (value > 50 && value <= 75) {
    rangeValue.innerHTML = "High";
    label.innerHTML = "High Range";
  } else {
    rangeValue.innerHTML = "Very High";
    label.innerHTML = "Very High Range";
  }
});

rangeInput.addEventListener("input", function() {
    var value = rangeInput.value;
    
    if (value <= 25) {
      rangeValue.innerHTML = "Low";
      label.innerHTML = "Low Range";
      rangeInput.setAttribute("data-label", "Low");
    } else if (value > 25 && value <= 50) {
      rangeValue.innerHTML = "Medium";
      label.innerHTML = "Medium Range";
      rangeInput.setAttribute("data-label", "Medium");
    } else if (value > 50 && value <= 75) {
      rangeValue.innerHTML = "High";
      label.innerHTML = "High Range";
      rangeInput.setAttribute("data-label", "High");
    } else {
      rangeValue.innerHTML = "Very High";
      label.innerHTML = "Very High Range";
      rangeInput.setAttribute("data-label", "Very High");
    }
  });
  function changeColor() {
    var button = document.getElementById("color-change-button");
    if (button.classList.contains("red")) {
        button.classList.remove("red");
    } else {
        button.classList.add("red");
    }
  }
  //////////// for the Slidings

var images = ['homeBg.png', 'land1-BG.png', 'image3.jpg'];
var currentImageIndex = 0;

function changeImage() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  document.getElementById("home-page").style.backgroundImage = `url(${images[currentImageIndex]})`;
}

setInterval(changeImage, 3000);

//for the Active Link

$(document).ready(function(){
  var bodyId = document.body.id;
  document.body.classList.add(bodyId + '-page');

  $('.nav-link[href="#"]').addClass('active');
  $('.nav-link').click(function(){
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
  });
});


