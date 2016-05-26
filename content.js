// Function to findById with regex (recursively)
function find_by_id(element, re, tag_name, s) {

	tag_name = tag_name || 'DIV'; // div is the default tag
    s = s || [];
    if (element.tagName === tag_name && re.exec(element.id) !== null) {
        s.push(element);
    }

    var c = element.firstChild;
    while (c) {
        find_by_id(c, re, tag_name, s);
        c = c.nextSibling;
    }
   	return s;
}

// Find prices and convert them to numbers (takes care of range by averaging)
var number, numbers = [], text, total = 0, ave;
price_spans = find_by_id(document.body, /^itemPrice_/, 'SPAN');
$.each(price_spans,function() {
    // NOTE: it doesn't handle ',' for Europe for example (locale issue)
	text = this.textContent.split('-');
	$.each(text, function(){
		number = Number(this.replace(/[^0-9\.]+/g,""));
		total += number;
	});
	ave = total/text.length;
	numbers.push(ave);
	total = 0;
});


// Calculate sum
var sum = 0;
$.each(numbers,function() {
    sum += this;
});

var div = document.createElement( 'div' );
var p = document.createElement('p');

// Append elements
document.body.appendChild(div);
div.appendChild(p);

div.style.position = 'fixed';
div.style.bottom = '10%';
div.style.left = '10%';
div.style.border = '3px outset rgba(35, 47, 62, 0.7)';
div.style.borderRadius = '10px';
div.style.padding = '5px';
div.style.backgroundColor = '#f5f5f5';

p.style.color = '#444444';
p.innerHTML = 'Total Cost: '+sum.toFixed(2);
console.log(sum);

