var myBarChart = null;
var myPieChart = null;
var footprint_final = 0;
var trees_eq = 0;

   
$('.submit').on('click', function(e) {
  //e.preventDefault();
  footprintCalculate();
  /*var jqxhr = $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    data: $form.serializeObject()
  });*/
})

function footprintCalculate() {

  /*const submitSuccess = document.querySelector('.submit-success')
  const submitError = document.querySelector('.submit-error')
  submitSuccess.style.display = 'block'; submitError.style.display = null;
  submitError.style.display = 'block'; submitSuccess.style.display = null;*/

  let country = document.getElementById("country").value;
  let area = document.getElementById("area").value; //input
  let people = document.getElementById("people").value; //input
  let heating = document.getElementById("heating").value;
  let mobility = document.getElementById("mobility").value;
  let distance = document.getElementById("distance").value;
  let short = document.getElementById("short").value; //input
  let medium = document.getElementById("medium").value; //input
  let long = document.getElementById("long").value; //input
  let nutrition = document.getElementById("nutrition").value;
  let consumption = document.getElementById("consumption").value;
  let dog = document.getElementById("dog").value; //input
  let cat = document.getElementById("cat").value; //input
  let horse = document.getElementById("horse").value; //input
  let rabbit = document.getElementById("rabbit").value; //input
  let fish = document.getElementById("fish").value; //input
  var energy_usage_ef = 0;
  var mobility_ef = 0;
  var heating_ef = 0;

const obj_country = {"ch": "der Schweiz", "de": "Deutschland", "at":"Österreich"};
const obj_country_average = {"ch": 14, "de": 11.6, "at":11};
  const obj_num_people = {"alone":1,"two-peop":2,"three-peop":3,"four-peop":4,"five-peop":5};
  const obj_ch_living = {"alone":230,"two-peop":179,"three-peop":154,"four-peop":134,"five-peop":110};
  const obj_de_living = {"alone":781,"two-peop":608,"three-peop":521,"four-peop":456,"five-peop":373};
  const obj_at_living = {"alone":364,"two-peop":283,"three-peop":242,"four-peop":212,"five-peop":174};
  const obj_ch_heating = {"heat-pump":3.3, "oil":30.9,"natural-gas":23,"district":10.5,"wood":2.6,"heating-idk":18.1};
  const obj_de_heating = {"heat-pump":14.3, "oil":30.9,"natural-gas":23,"district":10.5,"wood":2.6,"heating-idk":18.1};
  const obj_at_heating = {"heat-pump":6.6, "oil":30.9,"natural-gas":23,"district":10.5,"wood":2.6,"heating-idk":18.1};
  const obj_ch_mobility = {"pass-car":0.183,"suv":0.273,"hybrid":0.105,"electric":0.022,"motorbike":0.118, "public":0.017, "bicycle":0, "mix":0.094};
  const obj_de_mobility = {"pass-car":0.183,"suv":0.273,"hybrid":0.105,"electric":0.086,"motorbike":0.118, "public":0.017, "bicycle":0, "mix":0.094};
  const obj_at_mobility = {"pass-car":0.183,"suv":0.273,"hybrid":0.105,"electric":0.004,"motorbike":0.118, "public":0.017, "bicycle":0, "mix":0.094};
  const obj_flight = {"short":311,"medium":625,"long":2630};
  const obj_pet = {cat:380, dog:790, horse:2400, rabbit:95, fish:89};

  switch(country){
  case "ch":  {energy_usage_ef = obj_ch_living[people]; mobility_ef = obj_ch_mobility[mobility];heating_ef = obj_ch_heating[heating]};
  case "de": {energy_usage_ef = obj_de_living[people]; mobility_ef = obj_de_mobility[mobility];heating_ef = obj_de_heating[heating]};
  case "at": {energy_usage_ef = obj_at_living[people];mobility_ef = obj_at_mobility[mobility];heating_ef = obj_at_heating[heating]};
}


  let living_final = (area * heating_ef / obj_num_people[people]) + energy_usage_ef;
  let mobility_final = distance * mobility_ef;
  let flight_final = (short * obj_flight["short"]) + (medium * obj_flight["medium"]) + (long * obj_flight["long"]);
  let nutrition_final = nutrition;
  let consumption_final = consumption;
  let pet_final = (cat * obj_pet[cat]) + (dog * obj_pet[dog]) + (horse * obj_pet[horse]) + (rabbit * obj_pet[rabbit]) + (fish * obj_pet[fish]);
  let footprint_final = ((+living_final + +mobility_final + +flight_final + +nutrition_final + +consumption_final + +pet_final)/1000).toFixed(2);
let trees_eq = Math.round(footprint_final) / 0.028;
console.log(living_final, mobility_final, flight_final, nutrition_final, consumption_final, pet_final, footprint_final, trees_eq);

  document.getElementById("average-footprint").innerHTML = footprint_final;
document.getElementById("country-name").innerHTML = obj_country[country];
document.getElementById("average-country-footprint").innerHTML = obj_country_average[country];
document.getElementById("tree-equivalent").innerHTML = Math.round(trees_eq);
barChart(footprint_final, country.options[country.selectedIndex].text, obj_country[country]);
    pieChart(living_final, mobility_final, flight_final, nutrition_final, consumption_final, pet_final);

}

//Bar chart
function barChart(var1, var2, var3) {
 	var total_personal_footprint = var1;
	var chosen_country = var2;
  var country_avg_footprint = var3;
 	ctx1 = document.getElementById("myBarChart");
	//setup
  const data = {
  	labels: [chosen_country, "Weltweit", "Ihr Fussabdruck"],
    datasets: [{
    	backgroundColor: ["#43c681","#aebcbb","#5f5f5e"],
      data: [country_avg_footprint, 4.8, total_personal_footprint],
      datalabels: {
      color: 'black',
      anchor: 'end',
      align: 'top',
      offset: 5,
      formatter: (value) => {
      return [`${value} Tonnen CO\u2082`];
      }}
      		}]
    };
	//config
	const config = {
			type: 'bar',
      data,
      options: {
      	plugins:{
        	legend: {display: false},
          responsive: true,
            },
            scales: {
            	x: {
              	display: true,
                gridLines: {drawOnChartArea: false,tickMarkLength: 40}
                                },
							y: {
              	beginAtZero: true,grace: '5%'}
									}
                    },
                  plugins: [ChartDataLabels]
                };
 if(myBarChart == null) {myBarChart = new Chart(ctx1, config);}
else{myBarChart.destroy();myBarChart = new Chart(ctx1, config);}
     }
//Pie chart
function pieChart(var_living, var_mobility, var_flight, var_nutrition, var_consumption, var_pet){
	var living_part = var_living;
  var mobility_part = var_mobility;
  var flight_part = var_flight;
  var nutrition_part = var_nutrition;
  var consumption_part = var_consumption;
  var pet_part = var_pet;
  ctx2 = document.getElementById("myPieChart");
  //setup
  const data = {
		labels: ["Wohnen", "MobilitÃ¤t", "Reisen", "ErnÃ¤hrung", "Konsum", "Haustiere"],
    datasets: [{
    	backgroundColor: ["#43c681","#aebcbb","#8e8768","#1b6454","#5f5f5e","#4e7c7c"],
      data: [living_part, mobility_part, flight_part, nutrition_part, consumption_part, pet_part]
      }]
      };
  //config
	const config = {
		type: "pie",
    data,
    options: {
    	layout: {
      	padding: 10
        },
      plugins: {
      	tooltip: {enabled: false},
        labels: {
        	render: 'percentage',
          fontColor: 'black',
          fontStyle: 'bolder',
          position: 'outside',
          textMargin: 6
          },
     		datalabels: {color:'white',
		textAlign: "center",
		anchor:"center",
		font: {size: 15},
        	formatter: (value) => {
			if(value>0){return [`${(value/1000).toFixed(2)} Tonnen \nCO\u2082`];}
			else{return "";}
          }}
          }                    
          },
          plugins:  [ChartDataLabels]     
};
		if(myPieChart == null) {myPieChart = new Chart(ctx2, config);}
			else{myPieChart.destroy();myPieChart = new Chart(ctx2, config);
                }
         }

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

