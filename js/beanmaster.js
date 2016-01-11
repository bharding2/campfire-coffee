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
// var testLi = pikePlaceMarket.writeListHour(0);
// var testUl = document.getElementById('pikePlaceMarket');

var capitolHill = {};
var seattlePublicLibrary = {};
var southLakeUnion = {};
var seatacAirport = {};
var webSales = {};
