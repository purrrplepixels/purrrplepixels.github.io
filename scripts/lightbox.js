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
lightboxImg.alt = 'LightBox Img';

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
let prevIndex = 0;
let image_list = [];
let image_dir = '';

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


function set_image(index) {
  
  lightboxImg.src = `${image_dir}/${image_list[index]}`;
  prevIndex = currentIndex;
  currentIndex = index;
  lightboxImg.onerror = () => {
    if(currentIndex != index) return;
    if(currentIndex == prevIndex) closeLightbox(); //open invalid
    lightboxImg.src = "/not-found.webp";
  }
}
function isLightboxEnabled(ev) 
{
  return ev.pointerType !== "touch"; // dont open in touch devices because inconsistencies with pinch zoom
}
// Core functions
function openLightbox(evt,index, img_arr,base_path) 
{
  if(!isLightboxEnabled(evt)) return;
  image_dir = base_path;
  image_list = img_arr;
  currentIndex = index;
  set_image(index);
  lightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  last_moving_direction = 0;
}

function closeLightbox() {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
}

function prevImage() {
  if (!image_list.length) return;
  set_image((currentIndex - 1 + image_list.length) % image_list.length);
}

function nextImage() {
  if (!image_list.length) return;
  set_image((currentIndex + 1) % image_list.length)
}

// Expose public API
window.isLightboxEnabled = isLightboxEnabled;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.prevImage = prevImage;
window.nextImage = nextImage;