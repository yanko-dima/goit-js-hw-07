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

function onPreviewGalleryClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  const previewImg = evt.target;
  const originalImg = previewImg.dataset.source;

  openModalImg(previewImg, originalImg);
  closeModalImg();
}

function openModalImg(previewImg, originalImg) {
  previewImg.onclick = () => {
    basicLightbox
      .create(
        `
            <img width="1400" height="900" src="${originalImg}">
        `
      )
      .show();
  };
}

function closeModalImg() {
  const visible = basicLightbox.visible();

  if (visible) {
    document.addEventListener('keydown', ({ key }) => {
      if (key === 'Escape') {
        console.log('key: ', key);
      }
    });
  }

  console.log(visible);
}
