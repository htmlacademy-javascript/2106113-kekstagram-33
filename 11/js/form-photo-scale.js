const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const sizeValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const getSizePhoto = (evt) => {
  let sizeValueNum = parseInt(sizeValue.value, 10);
  if (evt.target.classList.contains('scale__control--smaller') && sizeValueNum > 25) {
    sizeValueNum -= 25;
  }
  if (evt.target.classList.contains('scale__control--bigger') && sizeValueNum < 100) {
    sizeValueNum += 25;
  }
  sizeValue.value = `${sizeValueNum}%`;
  imgUploadPreview.style.transform = `scale(${sizeValueNum / 100})`;
};
buttonSmaller.addEventListener('click', getSizePhoto);
buttonBigger.addEventListener('click', getSizePhoto);
