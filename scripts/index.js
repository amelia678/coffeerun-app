// ==================
// Constants
// ==================

const API_URL = 'https://dc-coffeerun.herokuapp.com/api/coffeeOrders';

// ==================
// DOM selection
// ==================
const orderForm = document.querySelector('[data-form]');
const notificationArea = document.querySelector('[data-notification]');
const resetButton = document.querySelector('[data-reset-button]');

const orderListingArea = document.querySelector('[data-order-area]');
const orderListingButton = document.querySelector('[data-load-orders]');

// ==================
// Helper functions
// ==================

function notifyUser(notificationText) {
	// create a div
	const notificationBox = document.createElement('div');

	// add some text content
	notificationBox.textContent = notificationText;
	// must check for the exisitence of a .firstChild

	notificationArea.innerHTML = '';

	// if (notificationArea.firstChild)
	// notificationArea.removeChild(notificationArea.firstChild);
	// append to...something .... somewhere ...???
	notificationArea.appendChild(notificationBox);
}

function handleSubmit(event) {
	event.preventDefault();
	console.log('You get a coffee!');
	console.log(event.target);

	// we're gonna AJax tha thang.
	// Call fetch()
	// pass it the URL
	// and an object with a method and a body
	const url = API_URL;
	const method = event.target.method;
	const elements = event.target.elements;
	const data = {
		strength: elements.strength.value,
		flavor: elements.flavor.value,
		size: elements.size.value,
		coffee: elements.coffee.value,
		emailAddress: elements.emailAddress.value
	};
	fetch(url, {
		method: method,
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
			// "Content-Type": "application/x-www-form-urlencoded",
		},
		body: JSON.stringify(data)
	})
		.then((r) => r.json())
		.then((orderInfo) => {
			//   check the order info for errors
			// is a "falsey hunter"
			// moves from left to right , and will stop moving
			// when it finds the first falsey expression
			const indivOrderText = `${orderInfo.size} ${orderInfo.flavor} ${orderInfo.coffee} strength ${orderInfo.strength}`;
			if (orderInfo.name && orderInfo.name === 'ValidationError') {
				notifyUser(`I'm sorry. Please fill out the coffee AND email address field. Thx`);
			} else {
				notifyUser(`Your ${indivOrderText} is being prepared by gnomes`);
			}

			//gotta wrap it in an anonymous function
		});
}

function confirmReset(e) {
	let doesWantToReset = confirm('Really?');
	if (!doesWantToReset) {
		e.preventDefault();
	}
}

// working with one coffee order
function convertOrderToElement(orderInfo) {
	const orderElement = document.createElement('p');
	const orderText = `
        ${orderInfo.size} ${orderInfo.flavor} ${orderInfo.coffee} for 
        ${orderInfo.emailAddress}
        <br>
        (${orderInfo.strength})
    `;
	orderElement.innerHTML = orderText;

	return orderElement;
}
// working with an array of coffee orders
function convertArrayOfOrdersToElements(giantFrigginOrderObject) {
	let orderArray = Object.values(giantFrigginOrderObject);
	let elementsArray = orderArray.map(convertOrderToElement);
	return elementsArray;
}
function getAndShowOrders(event) {
	console.log('hey! a click!');
	// console.log(event);
	fetch(API_URL).then((response) => response.json()).then(convertArrayOfOrdersToElements).then((elementsArray) => {
		elementsArray.forEach((e) => orderListingArea.appendChild(e));
	});
}

// ==================
// Main event listeners
// ==================
console.log('about to add event listenter!');
orderForm.addEventListener('submit', handleSubmit);
resetButton.addEventListener('click', confirmReset);
orderListingButton.addEventListener('click', getAndShowOrders);
