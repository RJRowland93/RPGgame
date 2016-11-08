//============================================
			//Javascript
//============================================
	//global variables
//============================================
//character objects 
	//name, AP (if hero, doubles every turn), HP, defense
var characters = {
	rick: {
		name: "Rick",
		HP: 0,
		AP: 0,
		defense: 0,
		pic: 0,
	},
	meatwad: {
		name: "Meatwad",
		HP: 0,
		AP: 0,
		defense:0,
	},
	peter: {
		name: "Peter Griffin",
		HP: 0,
		AP: 0,
		defense:0,
	},
	zoidberg: {
		name: "Zoidberg",
		HP: 0,
		AP: 0,
		defense: 0,
	}
};

var winCount = 0;
var loseCount = 0;
var defeated = 0;
var charsLeft = 4;
var charsSelected = 0;
var heroChosen = false;
var enemyChosen = false;
var heroAP;
var heroHP;
var heroDefense;
var enemyAP;
var enemyHP;
var enemyDefense;

//============================================
	//functions
//============================================
//game reset
function reset(){
	$("#reset").click(function(){	
	//dont reset win/lose count
	//reset character selection and health
defeated = 0;
heroChosen = false;
enemyChosen = false;
heroAP;
heroHP;
heroDefense;
enemyAP;
enemyHP;
enemyDefense;
	})
};
//attack
function attack() {
	$("#attack").click(function(){	
	if (heroChosen && enemyChosen){
	//hero deals damage to enemys hp
	enemyHP = enemyHP - heroAP;
	//hero recieves defense damage
	heroHP = heroHP - enemyDef;
	//double heros AP
	heroAP += heroAP;
	//if health <=0 add class display:none
	if (enemyHP <= 0) {
		$(".enemy").addClass("defeated");
		defeated++;
		enemyChosen = false;
		};
	if (heroHP <=0) {
		$(".hero").addClass("defeated");
			};
		};
	});
};
	

function combatLog(){
	$("#combatLog").html(heroName + "<p> has dealt " + heroAP + " damage!</p>\n" + enemyName + "<p> has dealt " + enemyAP + " damage!</p>\n" + heroName + "<p> has " + heroHP + " health remaining.</p>");
};

function gameOver(){
//win condition
	//all enemies defeated health <= 0
	if (defeated === 3 && heroHP > 0) {
	//show congrats
	$("#combatLog").html("<p>Congratulations! You have defeated all of the enemies. You are victorious!</p>");
	winCount++;
	}
//lose condition
	//hero character health <=0
	if (heroHP <= 0) {
	//show game over
	$("#combatLog").html("<p>Defeat has befallen you! You have failed...</p>");
	loseCount++;
	}
}; 

function charGen() {
	$(".peter").data("stats", {"name":"peter", "HP": 400, "AP": 50, "def": 25});
	$(".rick").data("stats", {"name":"rick", "HP": 200, "AP": 100, "def": 50});
	$(".zoidberg").data("stats", {"name":"zoidberg", "HP": 300, "AP": 75, "def": 35});
	$(".meatwad").data("stats", {"name":"meatwad", "HP": 1000, "AP": 10, "def": 10});
};

//============================================
	//logic
//============================================
//game start
$(document).ready(function(){
	//create character stats
	charGen();
	//choose hero
$(".character").on("dblclick", function() {
	if (heroChosen == false){
	$( this ).addClass("hero");
	$( this ).appendTo("#hero");
	heroChosen = true;
	heroName = $( this ).data("stats").name;
	heroAP = $( this ).data("stats").AP;
	heroHP = $( this ).data("stats").HP;
	heroDef = $( this ).data("stats").def;
//choose enemy
} else if (enemyChosen == false) {
	$( this ).addClass("enemy");
	$( this ).appendTo("#enemy");
	enemyChosen = true;
	enemyName = $( this ).data("stats").name;
	enemyAP = $( this ).data("stats").AP;
	enemyHP = $( this ).data("stats").HP;
	enemyDef = $( this ).data("stats").def;
	}
});

$("#attack").on("click", function() {
//attack button only enabled if both hero and enemy selected
	attack();
//show combat log
	combatLog();
//run win/lose conditions on each attack click
	gameOver();
});

$("#reset").on("click", function() {
	reset();
	});
});


