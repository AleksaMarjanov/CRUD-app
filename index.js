mapboxgl.accessToken = 'pk.eyJ1IjoiYWxla3NhbWFyamFub3YiLCJhIjoiY2wxNzg4OWdnNGNsdTNjcnB0eTUyaTFpZyJ9.Gb0b3LdcSTevZuB-w1ipCA';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [
    21.2982868161137,
    45.11944825
  ],
zoom: 18, 
});

//  Lazy loading iamges
let imageOptions = {};

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
  if(!entry.isIntersecting) return;
  const image = entry.target;
  image.src = image.src.replace('&w=10', '&w=598');
  observer.unobserve(image);
  })
}, imageOptions);

const images = document.querySelectorAll('img');
images.forEach(image => {
  observer.observe(image)
});
