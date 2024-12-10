import './big-pictures.js';
import { renderPosts } from './thumbnails.js';
import {closeOverlay} from './form.js';
import {setImgFormSubmit} from './form-validation.js';
import './form-photo-scale.js';
import './form-photo-effects.js';
import {getData} from './api.js';
getData(renderPosts);

setImgFormSubmit(closeOverlay);
