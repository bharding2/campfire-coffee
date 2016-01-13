//beanmaster tools for data.html
"use strict";

function Kiosk (name, minCustomers, maxCustomers, cupsPerCustomer, lbsPerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.cupsPerCustomer = cupsPerCustomer;
  this.lbsPerCustomer = lbsPerCustomer;
  this.hoursOpen = ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12 noon', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
  this.numCustomersHour = [];
  this.numLbsHour = [];
  this.numCupsHour = [];
  this.numCupsLbsHour = [];
  this.numToGoLbsHour = [];
  this.numDailyTotalCustomers = 0;
  this.numDailyTotalLbs = 0;
  this.numDailyTotalCups = 0;
  this.numDailyTotalCupsLbs = 0;
  this.numDailyTotalToGoLbs = 0;

  this.calcNumCustomersHour = function () {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
  };

  this.calcNumLbsHour = function (customers) {
    return customers * this.lbsPerCustomer + (customers * this.cupsPerCustomer)/20;
  };

  this.calcNumCupsHour = function (customers) {
    return customers * this.cupsPerCustomer;
  };

  this.calcNumCupsLbsHour = function (customers) {
    return customers * this.cupsPerCustomer/20;
  };

  this.calcNumToGoLbsHour = function (customers) {
    return customers * this.lbsPerCustomer;
  };

  this.createHour = function (hour) {
    var numCustomers = this.calcNumCustomersHour();
    this.numCustomersHour.push(numCustomers);
    this.numDailyTotalCustomers += this.numCustomersHour[hour];

    this.numLbsHour.push(this.calcNumLbsHour(numCustomers));
    this.numDailyTotalLbs += this.numLbsHour[hour];

    this.numCupsHour.push(this.calcNumCupsHour(numCustomers));
    this.numDailyTotalCups += this.numCupsHour[hour];

    this.numCupsLbsHour.push(this.calcNumCupsLbsHour(numCustomers));
    this.numDailyTotalCupsLbs += this.numCupsLbsHour[hour];

    this.numToGoLbsHour.push(this.calcNumToGoLbsHour(numCustomers));
    this.numDailyTotalToGoLbs += this.numToGoLbsHour[hour];
  };

  this.createDay = function () {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.createHour(i);
    }
  };

  this.renderListHour = function (hour) {
    var listEl = document.createElement('li');
    listEl.textContent = this.hoursOpen[hour] + ' : ' + this.numLbsHour[hour].toFixed(2) + ' lbs [' + this.numCustomersHour[hour] + ' customers, ' + this.numCupsHour[hour].toFixed(2) + ' cups (' + this.numCupsLbsHour[hour].toFixed(2) + ' lbs), ' + this.numToGoLbsHour[hour].toFixed(2) + ' lbs to-go]';
    return listEl;
  };

  this.renderTotals = function () {
    var totalEl = document.createElement('li');
    totalEl.textContent = 'Total : ' + this.numDailyTotalLbs.toFixed(2) + ' lbs [' + this.numDailyTotalCustomers + ' customers, ' + this.numDailyTotalCups.toFixed(2) + ' cups (' + this.numDailyTotalCupsLbs.toFixed(2) + ' lbs), ' + this.numDailyTotalToGoLbs.toFixed(2) + ' lbs to-go]';
    return totalEl;
  };

  this.renderFullList = function () {
    this.createDay();
    var sectionEl = document.getElementById('data');

    var pEl = document.createElement('p');
    pEl.appendChild(document.createTextNode(this.name));
    sectionEl.appendChild(pEl);

    var ulEl = document.createElement('ul');
    sectionEl.appendChild(ulEl);

    for (var j = 0; j < this.hoursOpen.length; j++) {
    ulEl.appendChild(this.renderListHour(j));
    }
    ulEl.appendChild(this.renderTotals());
  }
}

//data provided by Jo Kuppa
var pikePlaceMarket = new Kiosk('Pike Place Market', 14, 55, 1.2, 3.7);
var capitolHill = new Kiosk('Capitol Hill', 32, 48, 3.2, 0.4);
var seattlePublicLibrary = new Kiosk('Seattle Public Library', 49, 75, 2.6, 0.2);
var southLakeUnion = new Kiosk('South Lake Union', 35, 88, 1.3, 3.7);
var seatacAirport = new Kiosk('Sea-Tac Airport', 68, 124, 1.1, 2.7);
var webSales = new Kiosk('Website Sales', 3, 6, 0, 6.7);

pikePlaceMarket.renderFullList();
capitolHill.renderFullList();
seattlePublicLibrary.renderFullList();
southLakeUnion.renderFullList();
seatacAirport.renderFullList();
webSales.renderFullList();



function renderTotalLbsByHour () {
  var sectionEl = document.getElementById('data');
  var tableEl = document.createElement('table');

  sectionEl.appendChild(tableEl);

//header
  var trHead = document.createElement('tr');
  tableEl.appendChild(trHead);
  
  var thLoc = document.createElement('th');
  thLoc.textContent = 'Location';
  trHead.appendChild(thLoc);

  for (var h = 0; h < pikePlaceMarket.hoursOpen.length; h++) {
    var newTh = document.createElement('th');
    newTh.textContent = pikePlaceMarket.hoursOpen[h];
    trHead.appendChild(newTh);
  }

  function renderKioskRow (kiosk) {
    var newTr = document.createElement('tr');
    tableEl.appendChild(newTr);

    var newTd = document.createElement('td');
    newTd.textContent = kiosk.name;
    newTr.appendChild(newTd);

    for (var f = 0; f < kiosk.numLbsHour.length; f++) {
      var newTd = document.createElement('td');
      newTd.textContent = kiosk.numLbsHour[f].toFixed(2);
      newTr.appendChild(newTd);
    }
  }

  renderKioskRow(pikePlaceMarket);
  renderKioskRow(capitolHill);
  renderKioskRow(seattlePublicLibrary);
  renderKioskRow(southLakeUnion);
  renderKioskRow(seatacAirport);
  renderKioskRow(webSales);
}

renderTotalLbsByHour();
