const readlineSync = require('readline-sync');

const monster = {
        maxHealth: 10,
		currentHealth: 10,
        name: "Лютый",
		currentPhysicalDmg: 0,
		currentMagicDmg: 0,
		currentPhysicArmorPercents: 0,
		currentMagicArmorPercents: 0,
		
        moves: [
            {
                "name": "Удар когтистой лапой",
                "physicalDmg": 3, // физический урон
                "magicDmg": 0,    // магический урон
                "physicArmorPercents": 20, // физическая броня
                "magicArmorPercents": 20,  // магическая броня
                "cooldown": 0,     // ходов на восстановление
				"currentCooldown": 0
            },
            {
                "name": "Огненное дыхание",
                "physicalDmg": 0,
                "magicDmg": 4,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 3,
				"currentCooldown": 0
            },
            {
                "name": "Удар хвостом",
                "physicalDmg": 2,
                "magicDmg": 0,
                "physicArmorPercents": 50,
                "magicArmorPercents": 0,
                "cooldown": 2,
				"currentCooldown": 0
            },
        ]
    }

let monsterListAvailableAttackTypes = [];	
let monsterIndexAttackType = 0;	
	
const magician = {
        maxHealth: 30,
		minHealth: 5,
		currentHealth: 10,
        name: "Евстафий",
		currentPhysicalDmg: 0,
		currentMagicDmg: 0,
		currentPhysicArmorPercents: 0,
		currentMagicArmorPercents: 0,
        moves: [
            {
                "name": "Удар боевым кадилом",
                "physicalDmg": 2,
                "magicDmg": 0,
                "physicArmorPercents": 0,
                "magicArmorPercents": 50,
                "cooldown": 0,
				"currentCooldown": 0
            },
            {
                "name": "Вертушка левой пяткой",
                "physicalDmg": 4,
                "magicDmg": 0,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 4,
				"currentCooldown": 0
            },
            {
                "name": "Каноничный фаербол",
                "physicalDmg": 0,
                "magicDmg": 5,
                "physicArmorPercents": 0,
                "magicArmorPercents": 0,
                "cooldown": 3,
				"currentCooldown": 0
            },
            {
                "name": "Магический блок",
                "physicalDmg": 0,
                "magicDmg": 0,
                "physicArmorPercents": 100,
                "magicArmorPercents": 100,
                "cooldown": 4,
				"currentCooldown": 0
            },
        ]
    }	
	
let magicianListAvailableAttackTypes = [];
let magicianIndexAttackType = 0;


let stepCounter = 1;


function checkRange( numberInRange, min, max ) {
	let result = false;
	if ( numberInRange >= min && numberInRange <= max ) {
		result = true;
	}
	return result;	
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getListAvailableAttackTypes ( person ) {
	let listAvailableAttackTypes = [];
	for ( let i = 0; i < person.moves.length ; i++ ) {
		if ( person.moves[ i ].currentCooldown == 0 ) {
			listAvailableAttackTypes.push( i );
		}
	}
	return listAvailableAttackTypes;
}

function getRandomAvailableAttackType ( listAvailableAttackTypes ) {
	let randomAvailableAttackType = -1;
	if ( listAvailableAttackTypes.length > 0 ) {
		randomAvailableAttackType = getRandomInRange( 0, listAvailableAttackTypes.length - 1 );
	}
	return randomAvailableAttackType;	
}

function calcCooldown ( person ) {
	for ( let i = 0; i < person.moves.length ; i++ ) {
		if ( person.moves[ i ].currentCooldown > 0 ) {
			person.moves[ i ].currentCooldown--;
		}
	}
}

function calcCurrentHealth ( person ) {
	person.currentHealth = person.currentHealth - ( person.currentPhysicalDmg * ( 100 - person.currentPhysicArmorPercents ) / 100 + person.currentMagicDmg * ( 100 - person.currentMagicArmorPercents ) / 100 );		
}

function attack (attackingPerson, indexAttackType, defendingPerson) {
	attackingPerson.currentPhysicArmorPercents = attackingPerson.moves[ indexAttackType ].physicArmorPercents; 	
	attackingPerson.currentMagicArmorPercents = attackingPerson.moves[ indexAttackType ].magicArmorPercents;
	
	attackingPerson.moves[ indexAttackType ].currentCooldown = attackingPerson.moves[ indexAttackType ].cooldown;
	
	defendingPerson.currentPhysicalDmg = attackingPerson.moves[ indexAttackType ].physicalDmg;
	defendingPerson.currentMagicDmg = attackingPerson.moves[ indexAttackType ].magicDmg;
}


console.log( `Уважаемый игрок, Вы боевой маг Евстафий.
Вы сражаетесь с монстром Лютый.
Бой идет по ходам. 
Каждый ход монстр случайно выбирает одно из доступных действий
и сообщает, что он собирается делать. 
В ответ на Вы долженф выбрать свое действие.
После происходит взаимное нанесение урона. 
Магическая броня блокирует магический урон,
 физическая броня блокирует физический урон.
После совершения действия, 
оно не может быть повторно выбрано в течение определенного количества ходов
Бой идет до победы одного из противников.
 ` );
 
  
do {
	console.log( "Введите уровень сложности (здоровье боевого мага, чисдо от", magician.minHealth, " до ", magician.maxHealth, "):" );	
	magician.currentHealth = readlineSync.questionInt(  );		
 }	while ( !checkRange( magician.currentHealth, magician.minHealth, magician.maxHealth ) );
 
 
 
console.log( "\nСражание началось!\n" );
console.log( "Здоровье монстра: ", monster.currentHealth );
console.log( "Здоровье мага: ", magician.currentHealth, "\n" );


 
while ( monster.currentHealth > 0 && magician.currentHealth > 0) {

	console.log( stepCounter,  "Ход\n" );
	
	monsterListAvailableAttackTypes = getListAvailableAttackTypes ( monster );
	monsterIndexAttackType = getRandomAvailableAttackType ( monsterListAvailableAttackTypes );
		
	console.log( "\nМонстру доступны следующие виды атак: \n" );
		for ( let i = 0; i < monster.moves.length ; i++ ) {
			console.log(monster.moves[ i ].name );
			console.log( "Осталось ходов на восстановление: ", monster.moves[ i ].currentCooldown );
	}	
		
	if ( monsterIndexAttackType >= 0 ) {
		console.log( "Монстр атакует следующим видом удара: " );
		console.log( monster.moves[ monsterListAvailableAttackTypes[ monsterIndexAttackType ] ].name );
		console.log( "Физический урон: ", monster.moves[ monsterListAvailableAttackTypes[ monsterIndexAttackType ] ].physicalDmg );
		console.log( "Магический урон: ", monster.moves[ monsterListAvailableAttackTypes[ monsterIndexAttackType ] ].magicDmg );
		console.log( "Физическая броня: ", monster.moves[ monsterListAvailableAttackTypes[ monsterIndexAttackType ] ].physicArmorPercents );
		console.log( "Магическая броня: ", monster.moves[ monsterListAvailableAttackTypes[ monsterIndexAttackType ] ].magicArmorPercents );
		console.log( "Ходов на восстановление: ", monster.moves[ monsterListAvailableAttackTypes[ monsterIndexAttackType ] ].cooldown );
	
		attack( monster, monsterListAvailableAttackTypes[ monsterIndexAttackType ], magician );
	} else {
		console.log( "Монстр пропускает ход. Нет доступных атак" );
	}	
	
	
	
	console.log( "\nМаг обладает следующими видами атак: " );
	for ( let i = 0; i < magician.moves.length ; i++ ) {
		console.log( magician.moves[ i ].name );
		console.log( "Осталось ходов на восстановление: ", magician.moves[ i ].currentCooldown );
	}	
	
	magicianListAvailableAttackTypes = getListAvailableAttackTypes ( magician );
	
	if ( magicianListAvailableAttackTypes.length > 0 ) {
		console.log( "\nВам доступны следующие виды атак: \n" );
		for ( let i = 0; i < magicianListAvailableAttackTypes.length ; i++ ) {
			console.log( i, " - ", magician.moves[ magicianListAvailableAttackTypes [ i ] ].name );
			console.log( "физический урон: ", magician.moves[ magicianListAvailableAttackTypes [ i ] ].physicalDmg );
			console.log( "магический урон: ", magician.moves[ magicianListAvailableAttackTypes [ i ] ].magicDmg );
			console.log( "физическая броня: ", magician.moves[ magicianListAvailableAttackTypes [ i ] ].physicArmorPercents );
			console.log( "магическая броня: ", magician.moves[ magicianListAvailableAttackTypes [ i ] ].magicArmorPercents );
			console.log( "Ходов на восстановление: ", magician.moves[ magicianListAvailableAttackTypes [ i ] ].cooldown );
			console.log( "*************", );			
		}
		
	do {
		console.log( "Выберете доступный вид атаки (введите число от 0 до ", magicianListAvailableAttackTypes.length - 1, "):" );
		magicianIndexAttackType = readlineSync.questionInt(  );		
	} while ( !checkRange( magicianIndexAttackType, 0, magicianListAvailableAttackTypes.length - 1 ) );
	
		
		console.log("Вы выбрали: ", magician.moves[ magicianListAvailableAttackTypes [ magicianIndexAttackType ] ].name);
		attack( magician, magicianListAvailableAttackTypes [ magicianIndexAttackType ], monster );
	} else {
		console.log( "Вы пропускает ход. Нет доступных атак" );
	}	
	
	
	calcCooldown ( monster );
	calcCooldown ( magician );
	
	calcCurrentHealth ( monster );
	calcCurrentHealth ( magician );
	stepCounter++;
	
	console.log( "Здоровье монстра: ", monster.currentHealth );
	console.log( "Здоровье мага: ", magician.currentHealth, "\n" );	
}

console.log( "Сражение окончено!");
 
 if ( monster.currentHealth > magician.currentHealth ) {
	 console.log( "Монстр победил Вас");
 } else if ( monster.currentHealth < magician.currentHealth ) {
	 console.log( "Вы победили монстра");
 } else  {
	console.log( "Ничья. Бой не вывел сильнейшего");
 }
 






	


