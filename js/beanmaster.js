//beanmaster tools for data.html
"use strict";

function Kiosk (name, minCustomers, maxCustomers, cupsPerCustomer, lbsPerCustomer) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.cupsPerCustomer = cupsPerCustomer;
  this.lbsPerCustomer = lbsPerCustomer;
  this.hoursOpen = ['6:00 am', '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', '12 noon', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm'],
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
  this.projectionsData = [];
  allKiosks.push(this);
}

Kiosk.prototype.calcNumCustomersHour = function() {
  return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
}

Kiosk.prototype.calcNumLbsHour = function(customers) {
  return customers * this.lbsPerCustomer + (customers * this.cupsPerCustomer)/20;
}

Kiosk.prototype.calcNumCupsHour = function(customers) {
  return customers * this.cupsPerCustomer;
}

Kiosk.prototype.calcNumCupsLbsHour = function(customers) {
  return customers * this.cupsPerCustomer/20;
}

Kiosk.prototype.calcNumToGoLbsHour = function(customers) {
  return customers * this.lbsPerCustomer;
}

Kiosk.prototype.createHour = function(hour) {
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
}

Kiosk.prototype.createDay = function() {
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

  for (var i = 0; i < this.hoursOpen.length; i++) {
    this.createHour(i);
  }
}

Kiosk.prototype.createProjectionsData = function() {
  this.projectionsData.push(this.name);
  this.projectionsData.push(this.numDailyTotalLbs);
  this.projectionsData.push(this.numDailyTotalLbs/this.numLbsHour.length);
  this.projectionsData.push(this.numDailyTotalCustomers);
  this.projectionsData.push(this.numDailyTotalCustomers/this.numCustomersHour.length);
  this.projectionsData.push(this.numDailyTotalCups);
  this.projectionsData.push(this.numDailyTotalCups/this.numCupsLbsHour.length);
  this.projectionsData.push(this.numDailyTotalCupsLbs);
  this.projectionsData.push(this.numDailyTotalCupsLbs/this.numCupsLbsHour.length);
  this.projectionsData.push(this.numDailyTotalToGoLbs);
  this.projectionsData.push(this.numDailyTotalToGoLbs/this.numToGoLbsHour.length);
}

Kiosk.prototype.renderProjectionsRow = function(tableEl) {
  this.createDay();
  var newTr = document.createElement('tr');
  tableEl.appendChild(newTr);

  this.projectionsData = [];
  this.createProjectionsData();

  var newTh = document.createElement('th');
  newTh.textContent = this.projectionsData[0];
  newTr.appendChild(newTh);

  for (var l = 1; l < this.projectionsData.length; l++) {
    var tdData = document.createElement('td');
    tdData.textContent = this.projectionsData[l].toFixed(2);
    newTr.appendChild(tdData);
  }
}

Kiosk.prototype.renderCustomersByHourRow = function(tableEl) {
  var newTr = document.createElement('tr');
  tableEl.appendChild(newTr);

  var newTh = document.createElement('th');
  newTh.textContent = this.name;
  newTr.appendChild(newTh);

  for (var f = 0; f < this.numCustomersHour.length; f++) {
    var tdData = document.createElement('td');
    tdData.textContent = this.numCustomersHour[f].toFixed(0);
    newTr.appendChild(tdData);
  }
}

var allKiosks = [];

//data provided by Jo Kuppa
var pikePlaceMarket = new Kiosk('Pike Place Market', 14, 55, 1.2, 3.7);
var capitolHill = new Kiosk('Capitol Hill', 32, 48, 3.2, 0.4);
var seattlePublicLibrary = new Kiosk('Seattle Public Library', 49, 75, 2.6, 0.2);
var southLakeUnion = new Kiosk('South Lake Union', 35, 88, 1.3, 3.7);
var seatacAirport = new Kiosk('Sea-Tac Airport', 68, 124, 1.1, 2.7);
var webSales = new Kiosk('Website Sales', 3, 6, 0, 6.7);

function renderProjectionsByLocation () {
  var sectionEl = document.getElementById('projections');

  var h3Label = document.createElement('h3');
  h3Label.textContent = 'Projections By Location'
  sectionEl.appendChild(h3Label);

  var tableEl = document.createElement('table');
  sectionEl.appendChild(tableEl);

  var trHead = document.createElement('tr');
  tableEl.appendChild(trHead);

  var headLabels = ['Location', 'Total Lbs', 'Hourly Avg', 'Total Cust', 'Hourly Cust', 'Total Cups', 'Hourly Cups', 'Total CupLbs', 'Hourly CupLbs', 'Total ToGo', 'Hourly ToGo'];

  for (var g = 0; g < headLabels.length; g++) {
    var newTh = document.createElement('th');
    newTh.textContent = headLabels[g];
    trHead.appendChild(newTh);
  }

  for (var n = 0; n < allKiosks.length; n++) {
  allKiosks[n].renderProjectionsRow(tableEl);
  }

  var totalsData = [];

  totalsData.push('Total');

  var totalsDailyTotalLbs = 0;
  var totalsDailyTotalCustomers = 0;
  var totalsDailyTotalCups = 0;
  var totalsDailyTotalCupsLbs = 0;
  var totalsDailyTotalToGoLbs = 0;

  for (var o = 0; o < allKiosks.length; o++) {
   totalsDailyTotalLbs += allKiosks[o].numDailyTotalLbs;
   totalsDailyTotalCustomers += allKiosks[o].numDailyTotalCustomers;
   totalsDailyTotalCups += allKiosks[o].numDailyTotalCups;
   totalsDailyTotalCupsLbs += allKiosks[o].numDailyTotalCupsLbs;
   totalsDailyTotalToGoLbs += allKiosks[o].numDailyTotalToGoLbs;
  }

  totalsData.push(totalsDailyTotalLbs);
  totalsData.push(totalsDailyTotalLbs/allKiosks[0].hoursOpen.length);
  totalsData.push(totalsDailyTotalCustomers);
  totalsData.push(totalsDailyTotalCustomers/allKiosks[0].hoursOpen.length);
  totalsData.push(totalsDailyTotalCups);
  totalsData.push(totalsDailyTotalCups/allKiosks[0].hoursOpen.length);
  totalsData.push(totalsDailyTotalCupsLbs);
  totalsData.push(totalsDailyTotalCupsLbs/allKiosks[0].hoursOpen.length);
  totalsData.push(totalsDailyTotalToGoLbs);
  totalsData.push(totalsDailyTotalToGoLbs/allKiosks[0].hoursOpen.length);

  var newTr = document.createElement('tr');
  tableEl.appendChild(newTr);

  var newTh = document.createElement('th');
  newTh.textContent = totalsData[0];
  newTr.appendChild(newTh);

  for (var m = 1; m < totalsData.length; m++) {
    var tdData = document.createElement('td');
    tdData.textContent = totalsData[m].toFixed(2);
    newTr.appendChild(tdData);
  }
}
renderProjectionsByLocation();

function renderCustomersByHour () {
  var sectionEl = document.getElementById('customersByHour');

  var h3Label = document.createElement('h3');
  h3Label.textContent = 'Total Customers Per Hour By Location'
  sectionEl.appendChild(h3Label);

  var tableEl = document.createElement('table');
  sectionEl.appendChild(tableEl);

  var trHead = document.createElement('tr');
  tableEl.appendChild(trHead);

  var thLoc = document.createElement('th');
  thLoc.textContent = 'Location';
  trHead.appendChild(thLoc);

  for (var h = 0; h < allKiosks[0].hoursOpen.length; h++) {
    var newTh = document.createElement('th');
    newTh.textContent = allKiosks[0].hoursOpen[h];
    trHead.appendChild(newTh);
  }

  for (var t = 0; t < allKiosks.length; t++) {
  allKiosks[t].renderCustomersByHourRow(tableEl);
  }
}
renderCustomersByHour();

var newKiosk = document.getElementById('newKiosk');

function handleNewKioskSubmit (event) {
  console.log(event);
  event.preventDefault();

  if (!event.target.name.value || !event.target.minCustomers.value || !event.target.maxCustomers.value || !event.target.cupsPerCustomer.value || !event.target.lbsPerCustomer.value) {
    return alert('Fields cannot be empty.');
  }

  var name = event.target.name.value;
  var minCustomers = parseFloat(event.target.minCustomers.value);
  var maxCustomers = parseFloat(event.target.maxCustomers.value);
  var cupsPerCustomer = parseFloat(event.target.cupsPerCustomer.value);
  var lbsPerCustomer = parseFloat(event.target.lbsPerCustomer.value);

  var createNewKiosk = new Kiosk(name, minCustomers, maxCustomers, cupsPerCustomer, lbsPerCustomer);

  var containerEl = document.getElementById('projections');
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  renderProjectionsByLocation();

  var containerEl2 = document.getElementById('customersByHour');
  while (containerEl2.firstChild) {
    containerEl2.removeChild(containerEl2.firstChild);
  }
  renderCustomersByHour();

  var kioskSelect = document.getElementById('kioskIndex');
  var optionEl = document.createElement('option');
  optionEl.setAttribute('value', allKiosks.length - 1);
  optionEl.setAttribute('id', allKiosks.length - 1);
  optionEl.textContent = name;
  kioskSelect.appendChild(optionEl);
}
newKiosk.addEventListener('submit', handleNewKioskSubmit);

var newEdit = document.getElementById('editKiosk');

function handleNewKioskEdit (event) {
  console.log(event);
  event.preventDefault();

  if (!event.target.name.value || !event.target.minCustomers.value || !event.target.maxCustomers.value || !event.target.cupsPerCustomer.value || !event.target.lbsPerCustomer.value) {
    return alert('Fields cannot be empty.');
  }

  var index = event.target.kioskIndex.value;
  allKiosks[+index].name = event.target.name.value;
  allKiosks[+index].minCustomers = parseFloat(event.target.minCustomers.value);
  allKiosks[+index].maxCustomers = parseFloat(event.target.maxCustomers.value);
  allKiosks[+index].cupsPerCustomer = parseFloat(event.target.cupsPerCustomer.value);
  allKiosks[+index].lbsPerCustomer = parseFloat(event.target.lbsPerCustomer.value);

  document.getElementById(index).textContent = allKiosks[+index].name;

  var containerEl = document.getElementById('projections');
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }
  renderProjectionsByLocation();

  var containerEl2 = document.getElementById('customersByHour');
  while (containerEl2.firstChild) {
    containerEl2.removeChild(containerEl2.firstChild);
  }
  renderCustomersByHour();
}
newEdit.addEventListener('submit', handleNewKioskEdit );
