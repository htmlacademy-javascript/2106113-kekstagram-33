import './big-pictures.js';
import './form-photo-scale.js';
import './form-photo-effects.js';
import './img-filters.js';
import './upload-photo.js';
import { renderPosts } from './thumbnails.js';
import { onCloseOverlay } from './form.js';
import { setImgFormSubmit } from './form-validation.js';
import { getData } from './api.js';
getData((objects) => {
  renderPosts(objects);
});

setImgFormSubmit(onCloseOverlay);
