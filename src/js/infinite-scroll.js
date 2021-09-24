import item from '../template/inem.hbs';
import data from './data';
const btn = document.querySelector('button');
let page = 0;
function api(page) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=car&page=${page}&per_page=12&key=16137003-a99878a83e3cf9a5973a72148`,
  )
    .then(response => response.json())
    .then(data => {
      console.log('👀 > data', data);
      document.querySelector('.example').insertAdjacentHTML('beforeend', item(data.hits));
      const images = document.querySelectorAll('.example img');
      lasyLoad(images);
    });
}

function onEntry(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      api(page);
    }
  });
}

const observer = new IntersectionObserver(onEntry, {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
});

const sentinel = document.querySelector('footer');
observer.observe(sentinel);

function lasyLoad(targets) {
  const option = {
    rootMargin: '100px',
  };
  const onEntry = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const image = entry.target;
        console.log(image);
        const src = image.dataset.lazy;
        image.src = src;
        observer.unobserve(image);
      }
    });
  };
  const io = new IntersectionObserver(onEntry, option);
  targets.forEach(target => io.observe(target));
}
