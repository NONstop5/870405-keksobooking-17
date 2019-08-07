'use strict';

(function () {

  // Устанавливает доступность полей фмльтров
  var setFilterDisabled = function (flag) {
    window.functions.setAvailableFormFields(formFilterChildNodes, flag);
  };

  // Навешиваем события на фильтр выпадающих списков
  var addFormOptionsFilterEvents = function () {
    formFilterElem.addEventListener('change', function () {
      /*
      var priceLimits = {
        low: 10000,
        high: 50000
      };
      */
      var selectedOptions = [];
      var formFilterSelectNodes = formFilterElem.querySelectorAll('select');

      formFilterSelectNodes.forEach(function (curNode) {
        var propName = curNode.name.substr(curNode.name.indexOf('-') + 1);
        var propValue = curNode.options[curNode.selectedIndex].value;
        var obj = {};
        obj[propName] = propValue;
        selectedOptions.push(obj);
      });

      selectedOptions = selectedOptions.filter(function (item) {
        return item[Object.keys(item)[0]] !== 'any';
      });

      var compareOptionValues = function (ad) {
        return selectedOptions.every(function (option) {
          var optionKeyName = Object.keys(option)[0];
          return ad.offer[optionKeyName] === option[optionKeyName];
        });
      };

      var filteredAdsArray = window.map.originalAdsArray.filter(compareOptionValues);

      window.popup.removePopupCard();
      window.pins.deleteMapPins();
      window.debounce(window.pins.generateMapPins(filteredAdsArray.slice(0, 5)));
    });
  };

  // Навешиваем события на фильтр фичей
  var addFormFeaturesFilterEvents = function () {
    formFilterfeaturesElem.addEventListener('change', function () {
      var checkedFeatures = [];
      var formFilterfeaturesNodes = formFilterfeaturesElem.querySelectorAll('input:checked');

      formFilterfeaturesNodes.forEach(function (curNode) {
        checkedFeatures.push(curNode.value);
      });

      var compareFeatureValues = function (ad) {
        return checkedFeatures.every(function (featureName) {
          return ad.offer.features.some(function (propertyValue) {
            return propertyValue === featureName;
          });
        });
      };

      var filteredAdsArray = window.map.originalAdsArray.filter(compareFeatureValues);

      window.popup.removePopupCard();
      window.pins.deleteMapPins();
      window.debounce(window.pins.generateMapPins(filteredAdsArray.slice(0, 5)));
    });
  };

  var formFilterElem = window.map.mapElem.querySelector('.map__filters');
  var formFilterfeaturesElem = formFilterElem.querySelector('.map__features');
  var formFilterChildNodes = window.map.mapElem.querySelectorAll('.map__filters > *');

  setFilterDisabled(true);
  addFormOptionsFilterEvents();
  addFormFeaturesFilterEvents();

  window.filter = {
    setFilterDisabled: setFilterDisabled
  };
})();
