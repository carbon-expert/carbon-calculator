var myBarChart = null;
var myPieChart = null;

   
$('.submit').on('click', function(e) {
  //e.preventDefault();
  thisfunction();
  /*var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  });*/
})

function thisfunction() {
	var average_footprint = document.getElementById('average-footprint'); //innerHTML req
	var average_country_footprint = document.getElementById('average-country-footprint'); //innerHTML req
  var country_name = document.getElementById("country-name"); //innerHTML req
  var calculation = document.getElementById("calculation");
  var tree_calculation = document.getElementById("tree-equivalent");
  //Object
  var dict_country = {"ch":14,"de":11.6,"at":11}
  var dict_living = {"alone":279,"two-peop":186,"three-peop":151,"four-peop":130,"five-peop":125};
  var dict_heating = {"elec":5,"oil":30.5,"natural-gas":22.8,"district":14.1,"wood":2.5,"heating-idk":19.6};
  var dict_mobility = {"pass-car":0.183,"suv":0.273,"hybrid":0.105,"electric":0.022,"motorbike":0.12,"public-transport":0.017,"bicycle":0,"mixed":0.094};
  var dict_nutrition = {"vegan":1124,"vegetarian":1750,"eat-all":2169,"eat-meat":2812};
  var dict_consumption = {"v-eco":1931,"eco":2663,"avg":4125,"generous":5588,"lux":7050};
  //var country = document.getElementById("country"); //innerHTML req
  var country_val = dict_country[document.getElementById("country").value]; //innerHTML req
  var num_people_val = dict_living[document.getElementById('people-in-household').value];
  var living_space_val = document.getElementById('living-space').value;
  var heating_val = dict_heating[document.getElementById('heating').value];
  var mobility_val = dict_mobility[document.getElementById('mobility').value];
  var distance_travelled_val = document.getElementById('distance-travelled').value;
  var food_val = dict_nutrition[document.getElementById('nutrition').value];
  var consumption_val = dict_consumption[document.getElementById('consumption').value];
  var short_flight_val = document.getElementById('short').value;
  var middle_flight_val = document.getElementById('middle').value;
  var long_flight_val = document.getElementById('long').value;
  var cat_num_val = document.getElementById('cat').value;
  var dog_num_val = document.getElementById('dog').value;
  var horse_num_val = document.getElementById('horse').value;
  var rabbit_num_val = document.getElementById('rabbit').value;
  var fish_num_val = document.getElementById('fish').value;
  var no_pets = document.getElementById('no-pets');
  ctx1 = document.getElementById("myBarChart");
  ctx2 = document.getElementById("myPieChart");///
  var pet_final = (cat_num_val*380)+(dog_num_val*790)+(horse_num_val*2400)+(rabbit_num_val*95)+(fish_num_val*89);
  var flight_final = (short_flight_val*311)+(middle_flight_val*907)+(long_flight_val*2630);
  var living_space_part_1 = (living_space_val*heating_val/2);
  var living_final = +living_space_part_1 + +num_people_val;
  var mobility_final = mobility_val * distance_travelled_val;
  var food_final = parseFloat(food_val);
  var consumption_final = parseFloat(consumption_val);
  //total co2 emission
  total_footprint = (+living_final + +mobility_final + +flight_final + +food_final + +consumption_final + +pet_final)/1000;
	trees_eq = Math.round(total_footprint) * 50;
  average_footprint.innerHTML = Math.round(total_footprint);
  average_country_footprint.innerHTML = country_val;
  tree_calculation.innerHTML = Math.round(trees_eq);
  var chosen_country = country.options[country.selectedIndex].text;
  country_name.innerHTML = chosen_country;
  barChart(Math.round(total_footprint), chosen_country, country_val);
  pieChart(living_final, mobility_final, flight_final, food_final, consumption_final, pet_final);
}
//Bar chart
function barChart(var1, var2, var3) {
 	var total_personal_footprint = var1;
	var chosen_country = var2;
  var country_avg_footprint = var3;
 	ctx1 = document.getElementById("myBarChart");
	//setup
  const data = {
  	labels: [chosen_country, "Global", "Your footprint"],
    datasets: [{
    	backgroundColor: ["#43c681","#aebcbb","#5f5f5e"],
      data: [country_avg_footprint, 4.8, total_personal_footprint]
      		}]
    };
	//config
	const config = {
  	type: 'bar',
    data,
    options: {
    	legend: {display: false},
      responsive: true,
      title: {
      	display: true,
        text: "Your annual CO2 emission in tonnes comparison with your country and global"},
       scales: {
       	xAxis: [{
        	display: true,
          gridLines: {
          	drawOnChartArea: false, tickMarkLength: 40 },
					scaleLabel: {
          	display: true,
            labelString: 'Comparison'}
								}],
				yAxis: [{
					display: true,
					ticks: {beginAtZero: true},
					scaleLabel: {display: true, labelString: 'Emission in tonnes'},
                }]
				},
    	tooltips: {
    		callbacks: {
      		label: tooltipItem => tooltipItem.yLabel + " tonnes"}
               }
          }
 };
 if(myBarChart == null) {myBarChart = new Chart(ctx1, config);}
else{myBarChart.destroy();myBarChart = new Chart(ctx1, config);}
     }
//Pie chart
function pieChart(var_living, var_mobility, var_flight, var_food, var_consumption, var_pet){
	var living_part = var_living;
  var mobility_part = var_mobility;
  var flight_part = var_flight;
  var food_part = var_food;
  var consumption_part = var_consumption;
  var pet_part = var_pet;
  ctx2 = document.getElementById("myPieChart");
  //setup
  const data = {
		labels: ["Living", "Mobility", "Flight", "Food", "Consumption", "Pet"],
    datasets: [{
    	backgroundColor: ["#43c681","#aebcbb","#8e8768","#1b6454","#5f5f5e"],
      data: [living_part, mobility_part, flight_part, food_part, consumption_part, pet_part]
      }]
      };
  //config
	const config = {
  	type: "pie",
    data,
    options: {
    	title: {
      	display: true,
        text: "Breakdown of your annual personal carbon footprint"
        },
      tooltips: {enabled: true},
			plugins: {
      	datalabels: {
        	formatter: (value, ctx2) => {
						const datapoints = ctx2.chart.config.data.datasets[0].data;
            function totalSum(total, datapoint) {
            	return total + datapoint;
              }
            const totalValue = datapoints.reduce(totalSum, 0);
            const percentageValue = Math.round((value / totalValue) * 100) + '%';
            return percentageValue;
            },
            color: '#fff',
            }
           }
}
};
		if(myPieChart == null) {myPieChart = new Chart(ctx2, config);}
			else{myPieChart.destroy();myPieChart = new Chart(ctx2, config);
                }
         }
         function wcqib_refresh_quantity_increments() {
    jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").each(function(a, b) {
        var c = jQuery(b);
        c.addClass("buttons_added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />')
    })
}
         String.prototype.getDecimals || (String.prototype.getDecimals = function() {
    var a = this,
        b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
}), jQuery(document).ready(function() {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("updated_wc_div", function() {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("click", ".plus, .minus", function() {
    var a = jQuery(this).closest(".quantity").find(".qty"),
        b = parseFloat(a.val()),
        c = parseFloat(a.attr("max")),
        d = parseFloat(a.attr("min")),
        e = a.attr("step");
    b && "" !== b && "NaN" !== b || (b = 0), "" !== c && "NaN" !== c || (c = ""), "" !== d && "NaN" !== d || (d = 0), "any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e) || (e = 1), jQuery(this).is(".plus") ? c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals())) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())), a.trigger("change")
});
function increaseCount(a, b) {
  var input = b.previousElementSibling;
  var value = parseInt(input.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;
}

function decreaseCount(a, b) {
  var input = b.nextElementSibling;
  var value = parseInt(input.value, 10);
  if (value > 0) {
    value = isNaN(value) ? 0 : value;
    value--;
    input.value = value;
  }
}
        </script>
