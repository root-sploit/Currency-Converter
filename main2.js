let selected1 = document.querySelector(".selected-1");

const optionsContainer1 = document.querySelector(".options-container-1");

const optionsList1 = document.querySelectorAll(".options-1");

let selected2 = document.querySelector(".selected-2");

const optionsContainer2 = document.querySelector(".options-container-2");

const optionsList2 = document.querySelectorAll(".options-2");

let searchBox = document.querySelector(".search-box-1 input")

let selectedOption1 = "";
let selectedOption2 = "";

let currencyCode1 = "";
let currencyCode2 = "";



selected1.addEventListener("click", () => {  			optionsContainer1.classList.toggle("active-1");
				});
				
optionsList1.forEach( o => {
				o.addEventListener("click", () => {
								selected1.innerHTML = o.querySelector("label").innerHTML;								optionsContainer1.classList.remove("active-1");
								selectedOption1 = o.querySelector("label");								
				});				
});


selected2.addEventListener("click", () => {
				optionsContainer2.classList.toggle("active-2")
				});

optionsList2.forEach( o => {
				o.addEventListener("click", () => {
								selected2.innerHTML = o.querySelector("label").innerHTML;									optionsContainer2.classList.remove("active-2");
								selectedOption2 = o.querySelector("label");
				});
});


function apiCall() {
												
				const host = 'api.frankfurter.app';
				currencyCode1 = selectedOption1.querySelectorAll("span");
				currencyCode2 = selectedOption2.querySelectorAll("span");
			 let amount = document.getElementById("amt").value;
			 let converted = "";

fetch(`https://${host}/latest?amount=1&from=${currencyCode1[0].innerHTML}&to=${currencyCode2[0].innerHTML}` )
  .then(resp => resp.json())
  .then((data) => {
  				converted = `${data.rates[`${currencyCode2[0].innerHTML}`]}`;
  				
  				// To show converted results
  				let conversionResult = document.getElementById("conversion-result");  
  conversionResult.style.display = "block";
				  				  
				  conversionResult.innerHTML = `<p class="para-1"><b>${amount} ${currencyCode1[1].innerHTML} = </b></p>
												<p class="para-2"><b>${parseFloat(converted*amount).toFixed(3)}</b> ${currencyCode2[1].innerHTML}</p>
												<p class="para-3">1 ${currencyCode1[0].innerHTML} = ${converted} ${currencyCode2[0].innerHTML}</p>
												<p class="para-4">1 ${currencyCode2[0].innerHTML} = ${parseFloat(1/converted).toFixed(3)} ${currencyCode1[0].innerHTML}</p>
												<p class="para-5"><a href="">${currencyCode1[1].innerHTML}</a> to <a href="">${currencyCode2[1].innerHTML}</a> conversion — Last updated Oct 27, 2021, 07:40 UTC</p>`				 
  				  });			
}


function exitSearch() {
			optionsContainer1.classList.remove("active-1");	optionsContainer2.classList.remove("active-2");						
}


function change() {		
								
				[selected1.innerHTML, selected2.innerHTML] = [selected2.innerHTML, selected1.innerHTML];
				
				selectedOption1.innerHTML = `${selected1.innerHTML}`;
				selectedOption2.innerHTML = `${selected2.innerHTML}`;				
}


searchBox.addEventListener("keyup", function(e) {
				filterList(e.target.value);
});

const filterList = searchTerm => {
				searchTerm = searchTerm.toLowerCase();
				optionsList1.forEach(option => {
								let label = option.firstElementChild.nextElementSibling.innerHTML.toLowerCase();
								if (label.indexOf(searchTerm) != -1) {
												option.style.display = "block";
								} else {																								
												option.style.display = "none";
								}
				});
};
