'use strict';

(function () {
  var Price = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high'
  };
  var formFilterChildNodes = window.map.mapElem.querySelectorAll('.map__filters > *');
  var formFilterElem = document.querySelector('.map__filters');
  var housingTypeSelect = document.querySelector('#housing-type');
  var housingPriceSelect = document.querySelector('#housing-price');
  var housingRoomsSelect = document.querySelector('#housing-rooms');
  var housingGuestsSelect = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  // Устанавливает доступность полей фмльтров
  var setFilterDisabled = function (flag) {
    window.functions.setAvailableFormFields(formFilterChildNodes, flag);
  };

  var onChangeFilterAll = function () {
    window.pins.deleteMapPins();

    var filteredAdsArray = window.map.originalAdsArray.filter(function (item) {
      if (document.querySelector('.popup')) {
        window.popup.removePopupCard();
      }
      return filterHousingType(item) && filterHousingPrice(item) && filterHousingRooms(item) && filterHousingGuests(item) && filterFeatures(item);
    });

    window.debounce(window.pins.generateMapPins(filteredAdsArray.slice(0, 5)));
  };

  var filterHousingType = function (pin) {
    if (housingTypeSelect.value === 'any') {
      return true;
    }

    return housingTypeSelect.value === pin.offer.type;
  };

  var filterHousingPrice = function (pin) {
    if (housingPriceSelect.value === 'any') {
      return true;
    } else if (housingPriceSelect.value === Price.LOW) {
      return (pin.offer.price < 10000);
    } else if (housingPriceSelect.value === Price.MIDDLE) {
      return (pin.offer.price >= 10000 && pin.offer.price < 50000);
    } else if (housingPriceSelect.value === Price.HIGH) {
      return (pin.offer.price >= 50000);
    }

    return false;
  };

  var filterHousingRooms = function (pin) {
    if (housingRoomsSelect.value === 'any') {
      return true;
    }

    return parseInt(housingRoomsSelect.value, 10) === pin.offer.rooms;
  };

  var filterHousingGuests = function (pin) {
    if (housingGuestsSelect.value === 'any') {
      return true;
    }

    return parseInt(housingGuestsSelect.value, 10) === pin.offer.guests;
  };

  var filterFeatures = function (item) {
    var checkedFeatures = housingFeatures.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (element) {
      return item.offer.features.includes(element.value);
    });
  };

  formFilterElem.addEventListener('change', onChangeFilterAll);

  setFilterDisabled(true);

  window.filter = {
    setFilterDisabled: setFilterDisabled
  };
})();
