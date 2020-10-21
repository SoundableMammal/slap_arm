const io = require('socket.io-client');
var Gpio = require('onoff').Gpio;
var LED = new Gpio(4, 'out');
var slap_amount = 0;
var is_running = 0;

const streamlabs = io(`https://sockets.streamlabs.com?token=${process.env.STREAMTOKEN}`, {transports: ['websocket']});
LED.write(1);
streamlabs.on('connect',() => console.log('connection successful'));

streamlabs.on('event', eventData => {
	console.log(eventData);
	switch(eventData.type){
		case 'follow':
			slap_amount += 3;
		break;
		case 'subscription':
		case 'resub':
			slap_amount += 5;
		break;
		case 'donation':
		case 'bits':
			const amount = Number(eventData,message[0].amount);
			if(eventData.type === 'bits'){
				amount = amount/100;
			}
			else if(eventData.type === 'donation'){
			
			}
			slap_amount += Math.trunc(amount);
		break;

	default:
	}

	if (is_running === 0){ //check if function is currently running	
		(function myLoop(i) {
			if (slap_amount>0){
				is_running = 1; //set running flag
				setTimeout(function(){
					LED.writeSync(0); //trigger hand
					LED.writeSync(1); //reset hand
					console.log(slap_amount);
					if (--slap_amount){	//if slap_amount is not 0, decrement slap_amount and repeat
						is_running = 1; //keep running
						myLoop(i);	
					}
					else {is_running = 0;} //slap_amount is 0; no longer running
				}, 800); // delay in ms
			};
		})(slap_amount);
	};

	
		
});


