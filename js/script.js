/*
Any jquery function starts with either 'jQuery' or '$' for short. As an argument, it takes one thing: a selector.

Normally, this selector is in quotes and follows the same rules as CSS. But 'document' a catch-all word for the whole page is an exception, it doesn't need quotes. 

After we pass the selector, we use a dot followed by one of jQuery's 'methods' to do something with that.

In this case, we'll use 'ready.' That will watch the document and fire when the document is completely loaded. As a general rule, your code should always be wrapped in the document ready function. 

The ready function takes one argument, an unnamed function. It just wants to know what to do after the page is ready, it will run whatever is in that unnamed function as soon as it's ready. 
*/
$(document).ready(function() {
	
	/* Another jquery function! You can nest functions (parent/child), have functions at the same level (siblings), same as html tags. 

	This one takes a standard selector (in quotes) as it's argument. We're selecting the 'state-dropdown' (by its ID). Here, we're listening for 'change,' that is whenever a reader changes the current selection in the dropdown. like the ready function, it takes an unnamed function as an argument. */
	$("#state-dropdown").change(function() {
		// 'This' is a jquery selector that just refers to whatever is currently being watched. In this case, it's "#state-dropdown" and (in general) it only works inside another jquery function. 
		var stateName = $(this).val();
		
		// Because getRate (a function we define below) 'returns' something, if we set a variable to be equal to that called function, it will be set to whatever is returned. 
		var rate = getRate(stateName);
		
		// Now that we have all the information we need, we can call the function that writes the results (defined below)
		writeResultSentence(stateName, rate);
	});

	// Our new function, getRate takes one argument (stateName) in order to calulcate the how many electoral votes per 1 million people
	function getRate(stateName){
		// The first thing we need to calculate a rate is the population. In order to access the right state in our data, we need to use square brackets, because that allows us to pass in a 'dynamic' variable (like a state name that changes everytime a user changes a dropdown). Then, we can use a dot because we know exactly the property we'll want to access inside of that, in this case "population" 
		var statePopulation = stateData[stateName].population;

		// This is the same logic as above, but we're accessing the votes property instead of population.
		var stateVotes = stateData[stateName].votes;

		// Calculate how many electoral votes per million people
		var ratePerOneMillion = (stateVotes/statePopulation)*1000000;

		// Use a built in javascript function, Math.round, to round to the first decimal place (that's why we multiple by 10 and divide by 10), without that we'd just get a rounded number with no decimels. Don't get what it's doing? Try adding zeros to the end of each 10 below
		return Math.round(ratePerOneMillion*10)/10;
	};

	// Okay! We've got the rate, we've got the state they chose. Let's write a sentence and push it, as html, to the page
	function writeResultSentence(stateName, rate){
		// So, if we use the statename as we have it, it'll still be that two-letter code which isn't super readable. Instead, we can use string concatation to pass a very specific selector (square brackets in css allow you to include attributes in the selector) to get whichever state they chose, and then get the text of that. 
		var stateDisplayName = $('option[value=' + stateName + ']').text();

		// Using string concatation, write a sentence with the variables
		var sentence = "There are " + rate + " electoral votes for every million people in " + stateDisplayName + ".";

		// Wrap that sentence in a 'p' tag if you like, so you can control the styling more
		var html = "<p>" + sentence + "</p>";

		// Using jQuery's html function, we can pass that chunk as html, rather than plain text, so it recognizes the p tag
		$(".results").html(html);	
	};

// Closes our document ready function
});