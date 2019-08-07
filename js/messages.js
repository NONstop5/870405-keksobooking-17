'use strict';

(function () {
  var ESC_KEY_CODE = 27;

  // Показываем сообщение об удачной отправке формы
  var showSaccessMessage = function () {
    var saccessMessageElem = saccessMessageTemplate.cloneNode(true);
    window.map.mapElem.appendChild(saccessMessageElem);

    addSaccessMessageEvent(saccessMessageElem);
  };

  // Показываем сообщение об ошибке
  var showErrorMessage = function (message) {
    var errorMessageElem = errorMessageTemplate.cloneNode(true);
    errorMessageElem.firstElementChild.textContent = message;
    window.map.mapElem.appendChild(errorMessageElem);

    addErrorMessageEvent(errorMessageElem);
  };

  // Создаем события закрытия окон с сообщениями
  var addCloseMessageEvents = function (messageElem, errorMessageButton) {
    if (errorMessageButton !== undefined) {
      errorMessageButton.addEventListener('click', function () {
        window.map.mapElem.removeChild(messageElem);
        removeCloseEvents();
      });
    }

    var onClickAnywhere = function () {
      window.map.mapElem.removeChild(messageElem);
      removeCloseEvents();
    };
    document.addEventListener('click', onClickAnywhere);

    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEY_CODE) {
        window.map.mapElem.removeChild(messageElem);
        removeCloseEvents();
      }
    };
    document.addEventListener('keydown', onEscPress);

    var removeCloseEvents = function () {
      document.removeEventListener('click', onClickAnywhere);
      document.removeEventListener('keydown', onEscPress);
    };
  };

  // Навешиваем собитие на сообщение об ошибке
  var addErrorMessageEvent = function (errorMessageElem) {
    var errorMessageButton = errorMessageElem.lastElementChild;

    addCloseMessageEvents(errorMessageElem, errorMessageButton);
  };

  // Навешиваем собитие на сообщение об удачной отправке формы
  var addSaccessMessageEvent = function (saccessMessageElem) {
    addCloseMessageEvents(saccessMessageElem);
  };

  var saccessMessageTemplate = document.querySelector('#success').content.querySelector('div');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('div');

  window.messages = {
    showSaccessMessage: showSaccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
