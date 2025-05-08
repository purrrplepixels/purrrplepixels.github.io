// Create lightbox elements programmatically (runs immediately)
const lightbox = document.createElement('div');
const lightboxImg = document.createElement('img');
const controls = document.createElement('div');
const prevBtn = document.createElement('button');
const nextBtn = document.createElement('button');

// Configure elements
lightbox.className = 'lightbox';
lightbox.id = 'lightbox';

lightboxImg.id = 'lightbox-img';
lightboxImg.src = '';
lightboxImg.alt = 'Preview';

controls.className = 'lightbox-controls';

prevBtn.className = 'lightbox-prev';
prevBtn.textContent = 'Prev';

nextBtn.className = 'lightbox-next';
nextBtn.textContent = 'Next';

// Build structure
controls.appendChild(prevBtn);
controls.appendChild(nextBtn);
lightbox.appendChild(lightboxImg);
lightbox.appendChild(controls);
document.body.appendChild(lightbox);

// Lightbox state
let currentIndex = 0;
let image_list = [];

// Event handlers
lightbox.addEventListener('click', function(e) {
    closeLightbox();
});

prevBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  prevImage();
});

nextBtn.addEventListener('click', function(e) {
  e.stopPropagation();
  nextImage();
});

// Core functions
function openLightbox(evt,index, img_arr) {
  if(evt.pointerType == "touch") return;
  
  image_list = img_arr;
  currentIndex = index;
  lightboxImg.src = image_list[currentIndex];
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

function prevImage() {
  if (!image_list.length) return;
  currentIndex = (currentIndex - 1 + image_list.length) % image_list.length;
  lightboxImg.src = image_list[currentIndex];
}

function nextImage() {
  if (!image_list.length) return;
  currentIndex = (currentIndex + 1) % image_list.length;
  lightboxImg.src = image_list[currentIndex];
}

// Expose public API
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.prevImage = prevImage;
window.nextImage = nextImage;