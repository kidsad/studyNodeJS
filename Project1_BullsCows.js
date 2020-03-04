const readlineSync = require('readline-sync');

const hiddenNumber = '54321';								// загаданное число
const amountSymbolsOfHiddenNumber = hiddenNumber.length;	// количество цифр в загаданном числе

const amountAttempts = 5;									// количество попыток игрока для отгадывания числа
let counterAttempts = amountAttempts     					// счетчик попыток

let numberEnteredPlayer = '';								// число введенное игроком




function checkLengthNumber ( stringToCheck, lengthNumber ) {
	let result = false;
	
	if ( stringToCheck.length == lengthNumber ) {
				result = true;			
	}
	return result;
}	



function checkNonNumericSymbol ( stringToCheck ) {
	let result = true;
	
	for ( let i = 0; i < stringToCheck.length ; i++ ) {
		if ( stringToCheck[ i ] < '0' ||  stringToCheck[ i ] > '9' ) {
				result = false;
				return result;
		}	
	}
	return result;
}	



function checkDuplicateNumeric ( stringToCheck ) {
	let result = true;
	
	for ( let i = 0; i < stringToCheck.length - 1 ; i++ ) {
		if ( stringToCheck.includes( stringToCheck[ i ], i + 1 ) ) {
				result = false;
				return result;
		}	
	}	
	return result;
}	




function findAmounNumericOutPlace ( sourceNumber, numberToCheck) {
	let ammountNumericOutPlace = 0;
	
	for ( let i = 0; i < numberToCheck.length ; i++ ) {
		if ( sourceNumber.includes( numberToCheck[ i ] ) && numberToCheck[ i ] !=  sourceNumber[ i ] ) {			
				ammountNumericOutPlace++;
		}	
	}	
	
	return ammountNumericOutPlace;
}	



function findAmounNumericInPlace ( sourceNumber, numberToCheck ) {
	let ammountNumericInPlace = 0;
	
	for ( let i = 0; i < numberToCheck.length ; i++ ) {
		if ( sourceNumber[ i ] == numberToCheck[ i ] ) {					
				ammountNumericInPlace++;
		}	
	}
	
	return ammountNumericInPlace;	
}

function checkValidNumber ( numberToCheck, amountSymbolsNumber) {
	let result = true;
	if ( !checkLengthNumber ( numberToCheck, amountSymbolsNumber )) {
		console.log( `В введенном числе неверное количество цифр. Введите число состоящие из следующего количества цифр: ${amountSymbolsOfHiddenNumber}` );
		result = false;
	} else if ( !checkNonNumericSymbol ( numberToCheck )) {
		console.log( 'Введенное сообщение содержит символы или буквы. Введите только цифры' );
		result = false;
	} else if ( !checkDuplicateNumeric ( numberToCheck )) {	
		console.log( 'Введенное число содержит одинаковые цифры. Введите разные цифры' );		
		result = false;
	} 		
	return result;
}



console.log( `Уважаемый игрок, отгадайте заданное компьютером число.
Число состоит из ${amountSymbolsOfHiddenNumber} различающихся цифр. У Вас ${amountAttempts} попыток.
После каждой попытки компьютер сообщит следующее:
- количество совпавших цифр стоящих не на своих местах,
- количество правильных цифр на своих местах.
 ` );
 
 
while ( counterAttempts > 0 )  {
	console.log( 'Отсалось попыток: ', counterAttempts  );
	do {
		numberEnteredPlayer = readlineSync.question( 'Введите число либо введите q для выхода из игры: ' );
		console.log( '' );
		if ( numberEnteredPlayer == 'q' ) {
			break;
		}
	} while ( !checkValidNumber( numberEnteredPlayer, amountSymbolsOfHiddenNumber ) );
	
	if ( numberEnteredPlayer == hiddenNumber ) {
		console.log('Поздравляем! Вы угадали занаданное компьютером число. Игра закончена');
		break;	
	} else if ( numberEnteredPlayer == 'q' ) {
		console.log( 'Вы вышли из игры' );
		break;
	} else  {
		console.log( 'количество совпавших цифр стоящих не на своих местах: ', findAmounNumericOutPlace ( hiddenNumber, numberEnteredPlayer ) );
		console.log( 'количество правильных цифр на своих местах: ', findAmounNumericInPlace ( hiddenNumber, numberEnteredPlayer ) );
		counterAttempts--;
	}

}

if ( counterAttempts == 0) {
	console.log( 'У Вас закончились попытки. Игра закончена' );	
}	