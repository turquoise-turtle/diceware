if ('serviceWorker' in navigator) {
	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/diceware/service-worker.js')
		.then(function (reg){
			console.log('sw registered:', reg);
		}, /*catch*/ function(error) {
			console.log('Service worker registration failed:', error);
		});
	});
}

var app = new Vue({
	el: '#app',
	data: {
		dicewarelist: {
			starwars: {
				minmax: [1,20],
				number: 3,
				list: window.starwars,
				join: '-'
			},
			largewordlist: {
				minmax: [1,6],
				number: 5,
				list: window.eff_large_wordlist,
				join: ''
			},
			shortwordlist1: {
				minmax: [1,6],
				number: 4,
				list: window.eff_short_wordlist_1,
				join: ''
			},
			shortwordlist2: {
				minmax: [1,6],
				number: 4,
				list: window.eff_short_wordlist_2,
				join: ''
			},
			originaldiceware: {
				minmax: [1,6],
				number: 5,
				list: window.diceware_wordlist,
				join: ''
			},
			startrek: {
				minmax: [1,20],
				number: 3,
				list: window.startrek,
				join: '-'
			},
			gameofthrones: {
				minmax: [1,20],
				number: 3,
				list: window.gameofthrones,
				join: '-'
			},
			mnemonicencoding: {
				minmax: [1,6],
				number: 4,
				list: window.mnemonicencoding,
				join: ''
			}
		},
		phraselength: 5,
		selected: 'starwars',
		options: {
			1: {
				name: 'Star Wars',
				shortcode: 'starwars'
			},
			2: {
				name: 'EFF Large Wordlist',
				shortcode: 'largewordlist'
			},
			3: {
				name: 'EFF Short Wordlist #1',
				shortcode: 'shortwordlist1'
			},
			4: {
				name: 'EFF Short Wordlist #2',
				shortcode: 'shortwordlist2'
			},
			5: {
				name: 'Original Diceware Wordlist',
				shortcode: 'originaldiceware'
			},
			6: {
				name: 'Star Trek',
				shortcode: 'startrek'
			},
			7: {
				name: 'Game Of Thrones',
				shortcode: 'gameofthrones'
			},
			8: {
				name: 'Mnemonic Encoding',
				shortcode: 'mnemonicencoding'
			}
		},
		curcode: [],
		manual: ''
	},
	methods: {
		cryptorandom: function(min, max) {
			/* https://github.com/password-diet/password.diet/blob/master/app/scripts/components/home.js */
			var byteArray = new Uint8Array(1);
			window.crypto.getRandomValues(byteArray);
			var range = max - min + 1;
			var max_range = 256;
			if (byteArray[0] >= Math.floor(max_range / range) * range) {
				return this.cryptorandom(min, max);
			}
			return min + (byteArray[0] % range);
		},
		newrandom: function() {
			this.curcode = [];
			for (var j = 0; j<this.phraselength; j++) {
				var dwlist = this.dicewarelist[this.selected];
				var nums = dwlist.minmax;
				var num = dwlist.number;
				var newcode = [];
				for (var i = 0; i<num; i++) {
					newcode.push(this.cryptorandom(nums[0], nums[1]));
				}
				this.curcode.push(newcode);
			}
		}
	},
	watch: {
		selected: function (newv, oldv) {
			this.newrandom();
		}
	},
	computed: {
		phrase: function() {
			var sentence = '';
			for (var code of this.curcode) {
				code = code.join(this.dicewarelist[this.selected].join);
				sentence = sentence + this.dicewarelist[this.selected].list[code] + ' ';
			}
			sentence = sentence.substring(0, sentence.length-1);
			return sentence;
			//return this.dicewarelist[this.selected].list[this.curcode]
		},
		evaluated: function() {
			var code = this.manual.split(',').join(this.dicewarelist[this.selected].join);
			var word = this.dicewarelist[this.selected].list[code]
			return word;
		}
	},
	created: function () {
		this.newrandom();
	}
	//dicewarelist[selected].list[curcode]
});