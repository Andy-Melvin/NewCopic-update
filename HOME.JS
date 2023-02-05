var images = ['homeBg.png', 'newwed.png', 'newboyz.png','fosho.png'];
var currentImageIndex = 0;

function changeImage() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  document.getElementById("home-page").style.backgroundImage = `url(${images[currentImageIndex]})`;
  updateIndicator();
}

function updateIndicator() {
  var indicators = document.querySelectorAll('.indicator');
  indicators.forEach((indicator, index) => {
    if (index === currentImageIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

setInterval(changeImage, 3000);


//////For the Arrows of changing the next Picture

document.getElementById("next-arrow").addEventListener("click", function() {
  currentImageIndex++;
  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  document.getElementById("home-page").style.backgroundImage = `url(${images[currentImageIndex]})`;
  document.getElementById("prev-arrow").style.display = (currentImageIndex === 0) ? "none" : "block";
});

document.getElementById("prev-arrow").addEventListener("click", function() {
  currentImageIndex--;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }
  document.getElementById("home-page").style.backgroundImage = `url(${images[currentImageIndex]})`;
  document.getElementById("prev-arrow").style.display = (currentImageIndex === 0) ? "none" : "block";
});

