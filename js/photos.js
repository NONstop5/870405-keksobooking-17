'use strict';

(function () {
  var FILE_TYPES = [
    'gif',
    'jpg',
    'jpeg',
    'png'
  ];

  function onLoadChange(evt) {
    var fileChooser = evt.target;
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return fileName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var result = reader.result;
        switch (fileChooser) {
          case avatarFileElem:
            avatarPreviewElem.src = result;
            break;
          case imageFileElem:
            var imgElement = document.createElement('img');
            imgElement.src = result;
            imgElement.style.maxWidth = '70px';
            imgElement.style.maxHeight = '70px';
            imagesContanerElem.appendChild(imgElement);
            break;
        }
      });
      reader.readAsDataURL(file);
    }
  }
  var avatarFileElem = document.querySelector('#avatar');
  var avatarPreviewElem = document.querySelector('.ad-form-header__preview img');
  var imageFileElem = document.querySelector('#images');
  var imagesContanerElem = document.querySelector('.ad-form__photo-container');

  avatarFileElem.addEventListener('change', onLoadChange);
  imageFileElem.addEventListener('change', onLoadChange);
})();
