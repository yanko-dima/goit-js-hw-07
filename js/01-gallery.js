import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onPreviewGalleryClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
            </a>
        </div>
        `;
    })
    .join('');
}

const instance = basicLightbox.create(
  `
  <img class="modal-img" src= ''>
`,
  {
    onShow: instance => {
      window.addEventListener('keydown', closeModalImg);
    },
    onClose: instance => {
      window.removeEventListener('keydown', closeModalImg);
    },
  }
);

function onPreviewGalleryClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  instance.element().querySelector('.modal-img').src = evt.target.dataset.source;
  instance.show();
}

function closeModalImg() {
  if (key === 'Escape') {
    instance.close();
  }
}
