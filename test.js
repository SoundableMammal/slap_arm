var slap_amount ={
	initial: 0,
	set follow(x) {
		this.initial += x;
	}
};

console.log(slap_amount.a);
slap_amount.follow = 3;
console.log(slap_amount.a);
