//beanmaster tools for data.html
"use strict";

var pikePlaceMarket = {
//data provided by Jo Kuppa
  name: 'Pike Place Market',
  minCustomers: 14,
  maxCustomers: 55,
  cupsPerCustomer: 1.2,
  lbsPerCustomer: 3.7,
  hoursOpen: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12 noon', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],
  numCustomersHour: [],
  numLbsHour: [],
  numCupsHour: [],
  numCupsLbsHour: [],
  numToGoLbsHour: [],
  numDailyTotalCustomers: 0,
  numDailyTotalLbs: 0,
  numDailyTotalCups: 0,
  numDailyTotalCupsLbs: 0,
  numDailyTotalToGoLbs: 0,

  calcNumCustomersHour: function () {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
  },

  calcNumLbsHour: function (customers) {
    return customers * this.lbsPerCustomer + (customers * this.cupsPerCustomer)/20;
  },

  calcNumCupsHour: function (customers) {
    return customers * this.cupsPerCustomer;
  },

  calcNumCupsLbsHour: function (customers) {
    return customers * this.cupsPerCustomer/20;
  },

  calcNumToGoLbsHour: function (customers) {
    return customers * this.lbsPerCustomer;
  },

  createHour: function (hour) {
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
  },

  createDay: function () {
    for (var i = 0; i < this.hoursOpen.length; i++) {
      this.createHour(i);
    }
  },

  renderListHour: function (hour) {
    var listEl = document.createElement('li');
    listEl.textContent = this.hoursOpen[hour] + ' : ' + this.numLbsHour[hour].toFixed(2) + ' lbs [' + this.numCustomersHour[hour] + ' customers, ' + this.numCupsHour[hour].toFixed(2) + ' cups (' + this.numCupsLbsHour[hour].toFixed(2) + ' lbs), ' + this.numToGoLbsHour[hour].toFixed(2) + ' lbs to-go]';
    return listEl;
  },

  renderTotals: function () {
    var totalEl = document.createElement('li');
    totalEl.textContent = 'Total : ' + this.numDailyTotalLbs.toFixed(2) + ' lbs [' + this.numDailyTotalCustomers + ' customers, ' + this.numDailyTotalCups.toFixed(2) + ' cups (' + this.numDailyTotalCupsLbs.toFixed(2) + ' lbs), ' + this.numDailyTotalToGoLbs.toFixed(2) + ' lbs to-go]';
    return totalEl;
  },

  renderFullList: function () {
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
};






var capitolHill = {
//data provided by Jo Kuppa
  id: 'capitolHill',
  minCustomers: 32,
  maxCustomers: 48,
  cupsPerCustomer: 3.2,
  lbsPerCustomer: 0.4,
  hoursOpen: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12 noon', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],

  numCustomersHour: function () {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
  },

  calculateLbsHour: function (customers) {
    return customers * this.lbsPerCustomer + (customers * this.cupsPerCustomer)/20;
  },

  writeListHour: function (time) {
    var hour = this.hoursOpen[time];
    var numCustomers = this.numCustomersHour();
    var totalLbs = this.calculateLbsHour(numCustomers);
    var numCups = numCustomers * this.cupsPerCustomer;
    var numCupsLbs = numCups/20;
    var numToGoLbs = numCustomers * this.lbsPerCustomer;

    var listEl = document.createElement('li');
    listEl.textContent = hour + ' : ' + totalLbs.toFixed(2) + ' lbs [' + numCustomers + ' customers, ' + numCups.toFixed(2) + ' cups (' + numCupsLbs.toFixed(2) + ' lbs), ' + numToGoLbs.toFixed(2) + ' lbs to-go]';
    return listEl;
  },

  createFullList: function () {
    var writeUl = document.getElementById(this.id);
    for (var i = 0; i < this.hoursOpen.length; i++) {
      writeUl.appendChild(this.writeListHour(i));
    }
  }
};

var seattlePublicLibrary = {
//data provided by Jo Kuppa
  id: 'seattlePublicLibrary',
  minCustomers: 49,
  maxCustomers: 75,
  cupsPerCustomer: 2.6,
  lbsPerCustomer: 0.2,
  hoursOpen: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12 noon', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],

  numCustomersHour: function () {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
  },

  calculateLbsHour: function (customers) {
    return customers * this.lbsPerCustomer + (customers * this.cupsPerCustomer)/20;
  },

  writeListHour: function (time) {
    var hour = this.hoursOpen[time];
    var numCustomers = this.numCustomersHour();
    var totalLbs = this.calculateLbsHour(numCustomers);
    var numCups = numCustomers * this.cupsPerCustomer;
    var numCupsLbs = numCups/20;
    var numToGoLbs = numCustomers * this.lbsPerCustomer;

    var listEl = document.createElement('li');
    listEl.textContent = hour + ' : ' + totalLbs.toFixed(2) + ' lbs [' + numCustomers + ' customers, ' + numCups.toFixed(2) + ' cups (' + numCupsLbs.toFixed(2) + ' lbs), ' + numToGoLbs.toFixed(2) + ' lbs to-go]';
    return listEl;
  },

  createFullList: function () {
    var writeUl = document.getElementById(this.id);
    for (var i = 0; i < this.hoursOpen.length; i++) {
      writeUl.appendChild(this.writeListHour(i));
    }
  }
};

var southLakeUnion = {
//data provided by Jo Kuppa
  id: 'southLakeUnion',
  minCustomers: 35,
  maxCustomers: 88,
  cupsPerCustomer: 1.3,
  lbsPerCustomer: 3.7,
  hoursOpen: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12 noon', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],

  numCustomersHour: function () {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
  },

  calculateLbsHour: function (customers) {
    return customers * this.lbsPerCustomer + (customers * this.cupsPerCustomer)/20;
  },

  writeListHour: function (time) {
    var hour = this.hoursOpen[time];
    var numCustomers = this.numCustomersHour();
    var totalLbs = this.calculateLbsHour(numCustomers);
    var numCups = numCustomers * this.cupsPerCustomer;
    var numCupsLbs = numCups/20;
    var numToGoLbs = numCustomers * this.lbsPerCustomer;

    var listEl = document.createElement('li');
    listEl.textContent = hour + ' : ' + totalLbs.toFixed(2) + ' lbs [' + numCustomers + ' customers, ' + numCups.toFixed(2) + ' cups (' + numCupsLbs.toFixed(2) + ' lbs), ' + numToGoLbs.toFixed(2) + ' lbs to-go]';
    return listEl;
  },

  createFullList: function () {
    var writeUl = document.getElementById(this.id);
    for (var i = 0; i < this.hoursOpen.length; i++) {
      writeUl.appendChild(this.writeListHour(i));
    }
  }
};

var seatacAirport = {
//data provided by Jo Kuppa
  id: 'seatacAirport',
  minCustomers: 68,
  maxCustomers: 124,
  cupsPerCustomer: 1.1,
  lbsPerCustomer: 2.7,
  hoursOpen: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12 noon', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],

  numCustomersHour: function () {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
  },

  calculateLbsHour: function (customers) {
    return customers * this.lbsPerCustomer + (customers * this.cupsPerCustomer)/20;
  },

  writeListHour: function (time) {
    var hour = this.hoursOpen[time];
    var numCustomers = this.numCustomersHour();
    var totalLbs = this.calculateLbsHour(numCustomers);
    var numCups = numCustomers * this.cupsPerCustomer;
    var numCupsLbs = numCups/20;
    var numToGoLbs = numCustomers * this.lbsPerCustomer;

    var listEl = document.createElement('li');
    listEl.textContent = hour + ' : ' + totalLbs.toFixed(2) + ' lbs [' + numCustomers + ' customers, ' + numCups.toFixed(2) + ' cups (' + numCupsLbs.toFixed(2) + ' lbs), ' + numToGoLbs.toFixed(2) + ' lbs to-go]';
    return listEl;
  },

  createFullList: function () {
    var writeUl = document.getElementById(this.id);
    for (var i = 0; i < this.hoursOpen.length; i++) {
      writeUl.appendChild(this.writeListHour(i));
    }
  }
};

var webSales = {
//data provided by Jo Kuppa
  id: 'webSales',
  minCustomers: 3,
  maxCustomers: 6,
  cupsPerCustomer: 0,
  lbsPerCustomer: 6.7,
  hoursOpen: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12 noon', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],

  numCustomersHour: function () {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
  },

  calculateLbsHour: function (customers) {
    return customers * this.lbsPerCustomer + (customers * this.cupsPerCustomer)/20;
  },

  writeListHour: function (time) {
    var hour = this.hoursOpen[time];
    var numCustomers = this.numCustomersHour();
    var totalLbs = this.calculateLbsHour(numCustomers);
    var numCups = numCustomers * this.cupsPerCustomer;
    var numCupsLbs = numCups/20;
    var numToGoLbs = numCustomers * this.lbsPerCustomer;

    var listEl = document.createElement('li');
    listEl.textContent = hour + ' : ' + totalLbs.toFixed(2) + ' lbs [' + numCustomers + ' customers, ' + numCups.toFixed(2) + ' cups (' + numCupsLbs.toFixed(2) + ' lbs), ' + numToGoLbs.toFixed(2) + ' lbs to-go]';
    return listEl;
  },

  createFullList: function () {
    var writeUl = document.getElementById(this.id);
    for (var i = 0; i < this.hoursOpen.length; i++) {
      writeUl.appendChild(this.writeListHour(i));
    }
  }
};

pikePlaceMarket.renderFullList();
// capitolHill.createFullList();
// seattlePublicLibrary.createFullList();
// southLakeUnion.createFullList();
// seatacAirport.createFullList();
// webSales.createFullList();
