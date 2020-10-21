const io = require('socket.io-client');
var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');
var slap_amount = 0;

const streamlabs = io(`https://sockets.streamlabs.com?token=${process.env.STREAMTOKEN}`, {transports: ['websocket']});
LED.write(1);
streamlabs.on('connect',() => console.log('connection successful'));

streamlabs.on('event', eventData => {
	console.log(eventData.type);
	if ((eventData.type === 'follow') || (eventData.type === 'subscription')){
	//	for(i=0; i<3; i++) {
	//		LED.writeSync(0);
			//setTimeout(function(){LED.write(1);}, 800);
	//		sleep(800);
	//		LED.writeSync(1);
	//	}
		slap_amount += 3;
	};
	if(eventData.type === 'bits') {
		console.log(eventData.message[0]);
		const bit_amount = parseInt(eventData.message[0].amount,10);
		var slap_amount_bits = bit_amount/100;
		var slap_amount = slap_amount_bits.toFixed(0);
		console.log(bit_amount);
		console.log(slap_amount);
		};


	if(slap_amount > 0){
	(function myLoop(i) {
		setTimeout(function(){
			LED.writeSync(0);
			LED.writeSync(1);
			//console.log(slap_amount);
			console.log(i);
			if (--i){
				myLoop(i);
			};
		}, 800)
		})(slap_amount);
	};
	
		
});


