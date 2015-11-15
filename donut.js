var DonutShop = function(location, data){
  this.locations = location;
  this.minCPH = data.minCPH;
  this.maxCPH = data.maxCPH;
  this.avgDonutsPerCust = data.avgDonutsPerCust;
  this.donutsHourlyTotal = [];
  this.donutsDailyTotal = [];
  this.randomCust = function(minCPH, maxCPH){
    return Math.floor(Math.random() * (this.maxCPH - this.minCPH) + this.minCPH);
};

  this.donutsHourly = function(){
    for(var i = 0; i < 11; i++){
      var hourly = Math.round(this.avgDonutsPerCust * this.randomCust());
      this.donutsHourlyTotal.push(hourly);
    };
  };

  this.donutsDaily = function(){
    var total = 0;
    for(var i = 0; i < this.donutsHourlyTotal.length; i++)
      total += this.donutsHourlyTotal[i];
    this.donutsDailyTotal.push(total);
  };
};
//renders each shop to the page.
DonutShop.prototype.render = function(){
    var tr = document.createElement('tr');
    var tbody = document.getElementById('tBody');

  function locations(location){
    var td = document.createElement('td');
    td.innerHTML = location;
    console.log(location);
    tr.appendChild(td);
  };
  locations(this.locations);

  function hourlyDonuts(donutsHourlyTotal){
    for(var i =0; i < donutsHourlyTotal.length; i++){
      var td = document.createElement('td');
      td.innerHTML = donutsHourlyTotal[i];
      tr.appendChild(td);
    }
  };
  hourlyDonuts(this.donutsHourlyTotal);

  function dailyDonuts(donutsDailyTotal){
    var td = document.createElement('td');
    td.innerHTML = donutsDailyTotal;
    tr.appendChild(td);
    tbody.appendChild(tr);

  };
  dailyDonuts(this.donutsDailyTotal);

};
//use objects to store shop data.
var downtown = new DonutShop('Downtown', {minCPH: 8, maxCPH: 43, avgDonutsPerCust: 4.5});
var ballard = new DonutShop('Ballard', {minCPH: 8, maxCPH: 58, avgDonutsPerCust: 3.75});
var capitolHill = new DonutShop('Capitol Hill', {minCPH: 4, maxCPH: 37, avgDonutsPerCust: 2});
var wedgewood = new DonutShop('Wedgewood', {minCPH: 2, maxCPH: 28, avgDonutsPerCust: 1.25});
var southLakeUnion = new DonutShop('South Lake Union', {minCPH: 9, maxCPH: 23, avgDonutsPerCust: 6.33});

//call the functions for each location.
downtown.donutsHourly();
downtown.donutsDaily();
downtown.render();

ballard.donutsHourly();
ballard.donutsDaily();
ballard.render();

capitolHill.donutsHourly();
capitolHill.donutsDaily();
capitolHill.render();

wedgewood.donutsHourly();
wedgewood.donutsDaily();
wedgewood.render();

southLakeUnion.donutsHourly();
southLakeUnion.donutsDaily();
southLakeUnion.render();

//events

