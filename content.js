//var elements = document.getElementsByTagName('*');
console.log("LOLOLO");
// Function to findById with regex (recursively)
function find_by_id(element, re, tag_name, s) {

	tag_name = tag_name || 'DIV';
    s = s || [];
    if (element.tagName === tag_name && re.exec(element.id) !== null) {
    //if (re.exec(element.id) !== null) {
        s.push(element);
    }

    var c = element.firstChild;
    while (c) {
        find_by_id(c, re, tag_name, s);
        c = c.nextSibling;
    }
   	return s;
}

// Find prices and convert them to numbers
var number, numbers = [];
price_spans = find_by_id(document.body, /^itemPrice_/, 'SPAN');
$.each(price_spans,function() {
    console.log(this.textContent);
    // NOTE: it doesn't handle ',' for Europe for example (locale issue)
	number = Number(this.textContent.replace(/[^0-9\.]+/g,""));
	numbers.push(number);
	console.log(number);
});


// Calculate sum
var sum = 0;
$.each(numbers,function() {
    sum += this;
});

console.log(sum);