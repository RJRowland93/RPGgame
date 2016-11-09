//============================================
			//Javascript
//============================================
	//global variables
//============================================
//character objects 
	//name, HP, AP, defense
var characters = {
	rick: {
		name: "Rick",
		HP: 125,
		AP: 20,
		def: 20,
	},
	meatwad: {
		name: "Meatwad",
		HP: 200,
		AP: 8,
		def:10
	},
	peter: {
		name: "Peter Griffin",
		HP: 150,
		AP: 12,
		def: 15
	},
	zoidberg: {
		name: "Zoidberg",
		HP: 175,
		AP: 15,
		def: 12
	}
};

var winCount = 0;
var loseCount = 0;
var defeated = 0;
var heroChosen = false;
var enemyChosen = false;
var gameRun = true;
var heroAP;
var heroHP;
var enemyHP;
var enemyDef;
var grindAP;

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
gameRun = true;
heroAP;
grindAP;
heroHP;
enemyHP;
enemyDef;
	})
};

function gameOver(){
//win condition
	//all enemies defeated health <= 0
	if (defeated === 3 && heroHP > 0) {
	//show congrats
	winCount++;
	$("#info").html("<p>Congratulations! You have defeated all of the enemies. You are victorious!</p>");
	$("#wins").text(winCount);
	gameRun = false;
	}
//lose condition
	//hero character health <=0
	if (heroHP <= 0) {
	//show game over
	loseCount++;
	$("#info").html("<p>Defeat has befallen you! You have failed...</p>");
	$("#losses").text(loseCount);
	gameRun = false;
	}
}; 

function charGen() {
	$(".peter").data("stats", characters.peter);
	$(".rick").data("stats", characters.rick);
	$(".zoidberg").data("stats", characters.zoidberg);
	$(".meatwad").data("stats", characters.meatwad);
};

function statDisplay() {
	$("#meatwadName").text(characters.meatwad.name);
	$("#meatwadHP").text("Health: "+characters.meatwad.HP);
	$("#meatwadAP").text("Attack: "+characters.meatwad.AP);
	$("#meatwadDef").text("Defense: "+characters.meatwad.def);
	$("#peterName").text(characters.peter.name);
	$("#peterHP").text("Health: "+characters.peter.HP);
	$("#peterAP").text("Attack: "+characters.peter.AP);
	$("#peterDef").text("Defense: "+characters.peter.def);
	$("#rickName").text(characters.rick.name);
	$("#rickHP").text("Health: "+characters.rick.HP);
	$("#rickAP").text("Attack: "+characters.rick.AP);
	$("#rickDef").text("Defense: "+characters.rick.def);
	$("#zoidbergName").text(characters.zoidberg.name);
	$("#zoidbergHP").text("Health: "+characters.zoidberg.HP);
	$("#zoidbergAP").text("Attack: "+characters.zoidberg.AP);
	$("#zoidbergDef").text("Defense: "+characters.zoidberg.def);
};

//============================================
	//logic
//============================================
//game start
$(document).ready(function(){
	//create character stats
	charGen();
	statDisplay();

	//choose hero
$(".character").on("dblclick", function() {
	if (heroChosen === false){
	$( this ).addClass("hero");
	$( this ).appendTo("#hero");
	heroChosen = true;
	heroName = $( this ).data("stats").name;
	heroAP = $( this ).data("stats").AP;
	grindAP = $( this ).data("stats").AP;
	heroHP = $( this ).data("stats").HP;
//choose enemy
} else if (enemyChosen === false) {
	$( this ).addClass("enemy");
	$( this ).appendTo("#enemy");
	enemyChosen = true;
	enemyName = $( this ).data("stats").name;
	enemyHP = $( this ).data("stats").HP;
	enemyDef = $( this ).data("stats").def;
	};
});

//attack rounds
$("#attack").on("click", function() {
if (gameRun){
	if (heroChosen && enemyChosen){
	//hero deals damage to enemys hp
	enemyHP -= heroAP;
	//hero recieves defense damage
	heroHP -= enemyDef;
	//double heros AP
	heroAP += grindAP;
	//show changes in stats
	$(".hero .topRight").text("Health: "+heroHP);
	$(".hero .botLeft").text("Attack: "+heroAP);
	$(".enemy .topRight").text("Health: "+heroHP);
	//if health <=0 add class display:none
	if (enemyHP <= 0) {
		$(".enemy").addClass("defeated");
		defeated++;
		enemyChosen = false;
		};
	if (heroHP <=0) {
		$(".hero").addClass("defeated");
		};
		console.log(heroHP);
		console.log(heroAP);
		console.log(grindAP);
		console.log(enemyHP);
		console.log(enemyDef);
	};
	gameOver();
};
});
//reset button
	$("#reset").on("click", reset);
});




