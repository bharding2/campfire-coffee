//beanmaster tools for data.html

var pikePlaceMarket = {
//data provided by Jo Kuppa
  id: 'pikePlaceMarket',
  minCustomers: 14,
  maxCustomers: 55,
  cupsPerCustomer: 1.2,
  lbsPerCustomer: 3.7,
  hoursOpen: ['6:00am', '7:00am', '8:00am', '9:00am', '10:00am', '11:00am', '12 noon', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm'],

  numCustomersHour: function () {
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) + this.minCustomers;
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
    for (i = 0; i < this.hoursOpen.length; i++) {
      writeUl.appendChild(this.writeListHour(i));
    }
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
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) + this.minCustomers;
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
    for (i = 0; i < this.hoursOpen.length; i++) {
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
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) + this.minCustomers;
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
    for (i = 0; i < this.hoursOpen.length; i++) {
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
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) + this.minCustomers;
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
    for (i = 0; i < this.hoursOpen.length; i++) {
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
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) + this.minCustomers;
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
    for (i = 0; i < this.hoursOpen.length; i++) {
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
    return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers)) + this.minCustomers;
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
    for (i = 0; i < this.hoursOpen.length; i++) {
      writeUl.appendChild(this.writeListHour(i));
    }
  }
};

pikePlaceMarket.createFullList();
capitolHill.createFullList();
seattlePublicLibrary.createFullList();
southLakeUnion.createFullList();
seatacAirport.createFullList();
webSales.createFullList();
