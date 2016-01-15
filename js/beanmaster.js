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
  this.projectionsData = [];

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
    this.numCustomersHour = [];
    this.numLbsHour = [];
    this.numCupsHour = [];
    this.numCupsLbsHour = [];
    this.numToGoLbsHour = [];

    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.createHour(i);
    }
  };

  this.renderListHour = function (hour) {
    // this.createDay();
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
    // this.createDay();
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
  };

  this.createProjectionsData = function () {
    //Store Name
    this.projectionsData.push(this.name);
    //Total Daily Lbs
    this.projectionsData.push(this.numDailyTotalLbs);
    //Avg hourly lbs
    this.projectionsData.push(this.numDailyTotalLbs/this.numLbsHour.length);
    //Total Daily Customers
    this.projectionsData.push(this.numDailyTotalCustomers);
    //Avg Hourly Customers
    this.projectionsData.push(this.numDailyTotalCustomers/this.numCustomersHour.length);
    //Total Daily Cups
    this.projectionsData.push(this.numDailyTotalCups);
    //Avg Hourly Cups
    this.projectionsData.push(this.numDailyTotalCups/this.numCupsLbsHour.length);
    //Total daily CupLbs
    this.projectionsData.push(this.numDailyTotalCupsLbs);
    //Avg Hourly CupLbs
    this.projectionsData.push(this.numDailyTotalCupsLbs/this.numCupsLbsHour.length);
    //Total Daily ToGo Lbs
    this.projectionsData.push(this.numDailyTotalToGoLbs);
    //Avg Daily ToGo Lbs
    this.projectionsData.push(this.numDailyTotalToGoLbs/this.numToGoLbsHour.length);
  };

  this.renderProjectionsRow = function (tableEl) {
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
}

Array.prototype.average = function() {
  var sum = 0;

  for (var k = 0; k < this.length; i++) {
    sum += this[k];
  }
  if (this.length === 0) {
    return 0;
  } else {
    return sum/this.length
  }
}

//data provided by Jo Kuppa
var pikePlaceMarket = new Kiosk('Pike Place Market', 14, 55, 1.2, 3.7);
var capitolHill = new Kiosk('Capitol Hill', 32, 48, 3.2, 0.4);
var seattlePublicLibrary = new Kiosk('Seattle Public Library', 49, 75, 2.6, 0.2);
var southLakeUnion = new Kiosk('South Lake Union', 35, 88, 1.3, 3.7);
var seatacAirport = new Kiosk('Sea-Tac Airport', 68, 124, 1.1, 2.7);
var webSales = new Kiosk('Website Sales', 3, 6, 0, 6.7);

var allKiosks = [pikePlaceMarket, capitolHill, seattlePublicLibrary, southLakeUnion, seatacAirport, webSales];


function renderProjectionsByLocation () {

  var sectionEl = document.getElementById('projections');

  var h3Label = document.createElement('h3');
  h3Label.textContent = 'Projections By Location'
  sectionEl.appendChild(h3Label);

  var tableEl = document.createElement('table');
  sectionEl.appendChild(tableEl);

//header
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

  function createTotalsData () {
    //Store Name
    totalsData.push('Total');
    //Total Daily Lbs
    var totalsDailyTotalLbs = 0;
    for (var o = 0; o < allKiosks.length; o++) {
     totalsDailyTotalLbs += allKiosks[o].numDailyTotalLbs;
    }
    totalsData.push(totalsDailyTotalLbs);

    //Avg hourly lbs
    totalsData.push(totalsDailyTotalLbs/pikePlaceMarket.hoursOpen.length);

    //Total Daily Customers
    var totalsDailyTotalCustomers = 0;
    for (var p = 0; p < allKiosks.length; p++) {
    totalsDailyTotalCustomers += allKiosks[p].numDailyTotalCustomers;
    }
    totalsData.push(totalsDailyTotalCustomers);

    //Avg Hourly Customers
    totalsData.push(totalsDailyTotalCustomers/pikePlaceMarket.hoursOpen.length);

    //Total Daily Cups
    var totalsDailyTotalCups = 0;
    for (var q = 0; q < allKiosks.length; q++) {
    totalsDailyTotalCups += allKiosks[q].numDailyTotalCups;
    }
    totalsData.push(totalsDailyTotalCups);

    //Avg Hourly Cups
    totalsData.push(totalsDailyTotalCups/pikePlaceMarket.hoursOpen.length);

    //Total daily CupLbs
    var totalsDailyTotalCupsLbs = 0;
    for (var r = 0; r < allKiosks.length; r++) {
    totalsDailyTotalCupsLbs += allKiosks[r].numDailyTotalCupsLbs;
    }
    totalsData.push(totalsDailyTotalCupsLbs);

    //Avg Hourly CupLbs
    totalsData.push(totalsDailyTotalCupsLbs/pikePlaceMarket.hoursOpen.length);

    //Total Daily ToGo Lbs
    var totalsDailyTotalToGoLbs = 0;
    for (var s = 0; s < allKiosks.length; s++) {
    totalsDailyTotalToGoLbs += allKiosks[s].numDailyTotalToGoLbs;
    }
    totalsData.push(totalsDailyTotalToGoLbs);

    //Avg Daily ToGo Lbs
    totalsData.push(totalsDailyTotalToGoLbs/pikePlaceMarket.hoursOpen.length);
  }

  createTotalsData();

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

function renderTotalLbsByHour () {
//table creation including label
  var sectionEl = document.getElementById('totalLbsByHour');

  var h3Label = document.createElement('h3');
  h3Label.textContent = 'Total Pounds Sold Per Hour By Location'
  sectionEl.appendChild(h3Label);

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

//Rendering data for each kiosk
  function renderKioskRow (kiosk) {
    var newTr = document.createElement('tr');
    tableEl.appendChild(newTr);

    var newTd = document.createElement('td');
    newTd.textContent = kiosk.name;
    newTr.appendChild(newTd);

    for (var f = 0; f < kiosk.numLbsHour.length; f++) {
      var tdData = document.createElement('td');
      tdData.textContent = kiosk.numLbsHour[f].toFixed(2);
      newTr.appendChild(tdData);
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

// name
// minCustomers
// maxCustomers
// cupsPerCustomer
// lbsPerCustomer


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

  allKiosks.push(createNewKiosk);
  var containerEl = document.getElementById('projections');
  // createNewKiosk.renderProjectionsRow(tableEl);
  while (containerEl.firstChild) {
    containerEl.removeChild(containerEl.firstChild);
  }

  renderProjectionsByLocation();
}

newKiosk.addEventListener('submit', handleNewKioskSubmit);
