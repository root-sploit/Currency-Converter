const [selectBox1, selectBox2] = [document.querySelector(".select-box1"), document.querySelector(".select-box2")];

const [optionContainer1, optionContainer2] = [document.querySelector(".options-container-1"), document.querySelector(".options-container-2")];

const [optionsList1, optionsList2] = [document.querySelectorAll(".options-1"), document.querySelectorAll(".options-2")];

let [selectedOption1, selectedOption2] = ["", ""];

let [currencyCode1, currencyCode2] = ["", ""];

let searchBox = document.querySelector(".search-box-1 input");

let convertButton = document.querySelector(".convert-button");


selectBox1.addEventListener("click", () => {  			optionContainer1.classList.toggle("active-1");
				
				});
				
optionsList1.forEach( o => {
				o.addEventListener("click", () => {
								selectBox1.innerHTML = o.querySelector("label").innerHTML;								optionContainer1.classList.remove("active-1");
								selectedOption1 = o.querySelector("label");								
				});				
});


selectBox2.addEventListener("click", () => {
				optionContainer2.classList.toggle("active-2")
				});

optionsList2.forEach( o => {
				o.addEventListener("click", () => {
								selectBox2.innerHTML = o.querySelector("label").innerHTML;									optionContainer2.classList.remove("active-2");
								selectedOption2 = o.querySelector("label");
				});
});


function apiCall() {
												
				const host = 'api.frankfurter.app';
				currencyCode1 = selectedOption1.querySelectorAll("span");
				currencyCode2 = selectedOption2.querySelectorAll("span");
			 let amount = document.getElementById("input-amt").value;
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
			optionContainer1.classList.remove("active-1");	optionContainer2.classList.remove("active-2");						
}


function change() {		
								
				[selectBox1.innerHTML, selectBox2.innerHTML] = [selectBox2.innerHTML, selectBox1.innerHTML];
				
				selectedOption1.innerHTML = `${selectBox1.innerHTML}`;
				selectedOption2.innerHTML = `${selectBox2.innerHTML}`;				
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



// whenever the user inputs amount in the input box it'll take that amount and perform a conversion

/*  
let amount = document.getElementById("input-amt");

amount.addEventListener("keyup", e => {
				console.log(e.key);
})
*/
