function DonutShop (locations, minimum, maximum, average) {
  this.locations = locations;
  this.minimum = minimum;
  this.maximum = maximum;
  this.average = average;
  this.hourlyArr = [];
  this.donutDemand = function() {
    var hourlyDemand;
    var numHours = hours.length - 2;
    var table = document.getElementsByTagName('table')[0];
    var row = table.insertRow(1);
    row.insertCell(0).innerHTML = this.locations;

    //loop through each hour from 7am - 6pm, 12 hours
    for(var i = 0; i < numHours ; i++) {
      // donut demand per hour
      hourlyDemand = (Math.floor(Math.random() * (this.maximum - this.minimum + 1)) + this.minimum) * this.average;
        this.hourlyArr.push(hourlyDemand.toFixed(0));
      // insert perHourDemand to row starting at cell index 1
      row.insertCell(1).innerHTML = hourlyDemand.toFixed(0);
    }

    // hourly total
    var total = this.hourlyArr.reduce(function(tot, hour){
      return Number(tot) + Number(hour);
    });

    // insert hourly total to row at last cell
    row.insertCell(numHours + 1).innerHTML = total;

  };
}

// hours array
var hours = ["Location", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
             "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "Total"];

// create table with locations, hours, and totals
var donutTable = document.createElement('table');
var row = document.createElement('tr');
hours.forEach(function(hour) {
  var th = document.createElement('th');
  th.textContent = hour;
  row.appendChild(th);
  donutTable.appendChild(row);
});

document.getElementById("donutTable").appendChild(donutTable);
//donut shop data.
var downtownDS = new DonutShop("Downtown", 8, 43, 4.50);
var capitolHillDS = new DonutShop("Capitol Hill", 4, 37, 2.00);
var southLakeUnionDS = new DonutShop("South Lake Union", 9, 23, 6.33);
var wedgewoodDS = new DonutShop("Wedgewood", 2, 28, 1.25);
var ballardDS = new DonutShop("Ballard", 8, 58, 3.75);

// donut shop array
var donutShopArr = [];
donutShopArr.push(ballardDS, wedgewoodDS, southLakeUnionDS, capitolHillDS, downtownDS);

// render the donut shops
function DonutShopArrRender(){
  donutShopArr.forEach(function(donutShop, i) {
    donutShopArr[i].donutDemand();
  })
}
DonutShopArrRender();

// delete table rows
function rowRemove(){
  donutShopArr.forEach(function() {
    var el = document.getElementsByTagName('table')[0];
    el.deleteRow(1);
  })
}

//create locations in dropdown list
function selectLocation(){
var select = document.getElementById("selectLocation");
  donutShopArr.forEach(function(donutShop, i){
    var opt = donutShopArr[i].locations;
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  })
}
selectLocation();

// handles submission of new donut shop location form
var handleLocationSubmit = function(event){
  event.preventDefault();
  var place = event.target.place.value;
  var minCust = Number(event.target.minCust.value);
  var maxCust = Number(event.target.maxCust.value);
  var averagePur = Number(event.target.averagePur.value);
  var updatePlace = event.target.locations.value;

  // match location name for updating
  if (updatePlace !== "blank"){
      donutShopArr.forEach(function(donutShop, i) {
      if(updatePlace === donutShopArr[i].locations){
        donutShopArr[i].minimum = minCust;
        donutShopArr[i].maximum = maxCust;
        donutShopArr[i].average = averagePur;
        rowRemove();
        // reset hourlyArr for chart
        donutShopArr.forEach(function(donutShop){
        donutShop.hourlyArr = [];
        });
        DonutShopArrRender();
        document.getElementById('updateForm').reset();

      }
    })
  }
  else {
    // add new location
    var newLocation = new DonutShop(place, minCust, maxCust, averagePur);
    newLocation.donutDemand();
     //push new location to donutShopArr
     donutShopArr.push(newLocation);
    document.getElementById('updateForm').reset();

  }
};

// Form and button event listener
var locationForm = document.getElementById('updateForm');
locationForm.addEventListener('submit', handleLocationSubmit);

