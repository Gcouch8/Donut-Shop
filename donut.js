//function constructor for the Donut Shops
var DonutShop = function(location, minimum, maximum, average){
  this.locations = location;
  this.minimum = minimum;
  this.maximum = maximum;
  this.average = average;
  this.donutsHourlyTotal = [];
  this.donutsDailyTotal = [];
  this.randomCust = function(minimum, maximum){
    return Math.floor(Math.random() * (this.maximum - this.minimum) + this.minimum);
};

//calculates donuts per hour
  this.donutsHourly = function(){
    for(var i = 0; i < 11; i++){
      var hourly = Math.round(this.average * this.randomCust());
      this.donutsHourlyTotal.push(hourly);
    };
  };
  this.donutsHourly();


//Use reduce to get daily totals
  this.donutsDaily = function(){
      var total = this.donutsHourlyTotal.reduce(function(total, number){
      return total + number;
    });
    this.donutsDailyTotal.push(total);
    //old way
    //var total = 0;
    //for(var i = 0; i < this.donutsHourlyTotal.length; i++)
      //total += this.donutsHourlyTotal[i];
    //this.donutsDailyTotal.push(total);
  };
  this.donutsDaily();
};

//renders each shop to the page.
DonutShop.prototype.render = function(){
    var tr = document.createElement('tr');
    tr.id= this.locations;
    var tbody = document.getElementById('tBody');

//function to render location to page
  function locations(location){
    var td = document.createElement('td');
    td.innerHTML = location;
    // console.log(location);
    tr.appendChild(td);
  };
  locations(this.locations);

//function to render donuts per hour
  function hourlyDonuts(donutsHourlyTotal){
    for(var i =0; i < donutsHourlyTotal.length; i++){
      var td = document.createElement('td');
      td.innerHTML = donutsHourlyTotal[i];
      tr.appendChild(td);
    }
  };
  hourlyDonuts(this.donutsHourlyTotal);

//function to render daily totals
  function dailyDonuts(donutsDailyTotal){
    var td = document.createElement('td');
    td.innerHTML = donutsDailyTotal;
    tr.appendChild(td);
    tbody.appendChild(tr);

  };
  dailyDonuts(this.donutsDailyTotal);

};

// DonutShop.prototype.update = function(){
//   var update = document.getElementById(donutShopArr[i].locations);
//   for(var i = 0;  )
// }


//should I store these in an array, and what is the correct syntax for this?
//use objects to store shop data.
var downtown = new DonutShop('Downtown', 8, 43, 4.5);
var ballard = new DonutShop('Ballard', 8, 58, 3.75);
var capitolHill = new DonutShop('Capitol Hill', 4, 37, 2);
var wedgewood = new DonutShop('Wedgewood', 2, 28, 1.25);
var southLakeUnion = new DonutShop('South Lake Union', 9, 23, 6.33);
//an array to hold the donut shops.
var donutShopArr = [];
donutShopArr.push(downtown);
donutShopArr.push(ballard);
donutShopArr.push(capitolHill);
donutShopArr.push(wedgewood);
donutShopArr.push(southLakeUnion);
console.log(donutShopArr);

downtown.render();
ballard.render();
capitolHill.render();
wedgewood.render();
southLakeUnion.render();

//call the functions for each location.
/*downtown.donutsHourly();
downtown.donutsDaily();

ballard.donutsHourly();
ballard.donutsDaily();

capitolHill.donutsHourly();
capitolHill.donutsDaily();

wedgewood.donutsHourly();
wedgewood.donutsDaily();

southLakeUnion.donutsHourly();
southLakeUnion.donutsDaily();
*/

//popuate a dropdown list
function selectLocation(){
  var select = document.getElementById('update');
  for(var i = 0; i < donutShopArr.length; i++){
    var opt = donutShopArr[i].locations;
    var el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
};
selectLocation();

    /*var addOrUpdateLocation =*/ function addOrUpdateLocation(event){
        event.preventDefault();
      //variables to store input from the submit form
      var shop = document.getElementById('shop').value;
      var minC = document.getElementById('minCPH').value;
      var maxC = document.getElementById('maxCPH').value;
      var avrg = document.getElementById('avrg').value;
      console.log(avrg);
      var update = document.getElementById('update').value;
      console.log(update);
      //var selected = update.value;
      //console.log(selected.value);
      //var selected = update.options[update.selectedIndex].text;
       if(update !== 'blank'){
          for(var i = 0; i < donutShopArr.length; i++){
              var updateTable = document.getElementById(donutShopArr[i].locations);
              console.log(updateTable);
              if(updateTable.hasChildNodes){
                var children = updateTable.childNodes;
                for (var i = 1; i < 11; i++){
                    //children[i].value = this.donutsHourlyTotal[i];
              this.donutsHourly;
              this.donutsDaily;
              donutShopArr[i].minimum = minC;
              donutShopArr[i].maximum = maxC;
              donutShopArr[i].average = avrg;
                    console.log(children[i]);
                    console.log(this.donutsHourlyTotal);
                }
                    children[12].value = this.donutsDailyTotal[i];

              }
            if(update === donutShopArr[i].locations){
              //console.log(donutShopArr[0]);

            }
            //console.log(donutShopArr[i].maximum);
          }
        }
      else {
          var newShop = new DonutShop(shop, Number(minC), Number(maxC), Number(avrg));
          //console.log(avrg);
          donutShopArr.push(newShop);

          //renders a new shop to the page
          //newShop.donutsHourly();
          //newShop.donutsDaily();
          newShop.render();
          //renderChart();
      }

      //resets the input fields
      var newForm = document.getElementById('newForm');
      newForm.reset();
  };

//console.log(donutShopArr);
//event to submit a new location to the table
var submitBtn = document.getElementById('submitButton');
submitBtn.addEventListener('click', addOrUpdateLocation);


/*function renderChart() {
  var elCanvas = document.createElement("canvas");
  document.getElementById("donutChart").appendChild(elCanvas);

  var ctx = document.getElementsByTagName("canvas")[0].getContext("2d");
  var data = {
      labels: ["7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"],
      datasets: []
      };

  var Dataset = function(label, fillColor, strokeColor, highlightFill, highlightStroke, data) {
    this.label = label;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.highlightFill = highlightFill;
    this.highlightStroke = highlightStroke;
    this.data = data;
    };

  var colors = ["#0000FF", "#8A2BE2", "#A52A2A", "#DEB887", "#5F9EA0", "#7FFF00", "#D2691E", "#FF7F50", "#6495ED", "#DC143C"];

  var i = 0;
  donutShopArr.forEach(function(donutShop){
    var color = colors[i];
    i++;
  //var color = '#' + (Math.random() * 0xFFFFFF<<0).toString(16); //colors not always disticnt
    var newDataSet = new Dataset(donutShop.locations, color, color, color, color, donutShop.donutsHourlyTotal);
    data.datasets.push(newDataSet);
    });

  var options = {
    legendTemplate : '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>'
    };

  var barChart = new Chart(ctx).Bar(data, options);
  var legend = barChart.generateLegend();

  document.getElementById("donutLegend").innerHTML = legend;

}
renderChart();
*/
