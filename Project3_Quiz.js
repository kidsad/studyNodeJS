const readlineSync = require('readline-sync');

const fs = require('fs');

const folderQuestions = "Questions/";   // путь к папке с вопросами относительно текущей папки
const amountQuestions = 6;				// количество вопросов
let listFilesQuestions = [];			// список имен файлов с вопросами

let textFileQuestion;					// текст файла, содержащего вопрос, правильный ответ, все ответы
let currentQuestions;					// текущий вопрос
let currentValidAnswer;					// текущий верный ответ		
let currentAnswers;						// текущие все ответы
let currentAnswer;						// текущий ответ введенный пользователем

let amountValidAnswers = 0;				// количество верно указанных ответов




function getRandom( max ) {
	// функция генерирует случайное целочисленное число от 0 до max
	return Math.floor( Math.random( ) * ( max + 1 ) ) ;
}



function getRandomList ( inputList, lengthOutputList ) {
	// функция выдает неповторяющийся случайно сгенерированный список из входного списка inputList, размером lengthOutputList
	// если размер входного списка inputList меньше указанного размера lengthOutputList выходного списка
	// то выходной список копируется в выходной
	let currentLengthInputList = inputList.length ;
	let outputList = [];
	let indexList = 0;
	
	if ( lengthOutputList < inputList.length ) {
		
		for ( let i = 0; i < lengthOutputList; i++ ) { 
			indexListn = getRandom( currentLengthInputList - 1 );			
			outputList.push (  inputList [ indexList ] );
			inputList [ indexList ] = inputList[ currentLengthInputList - 1 ];
			currentLengthInputList --;			
		}
		
	} else {
		outputList = inputList;	
	}
	
	return outputList;	
}


function findSymbolPosition ( seachString, subSeachString, numberIncluded ) {
	//  функция ищет позицию  numberIncluded-го вхождения строки subSeachString в строке seachString 
	//  если не находит выдает значение -1
	let positionSymbol = 0;
	let currentPositionSymbol;	
	
	if ( numberIncluded > 0 ) {
		for ( let i = 1; i <= numberIncluded; i ++ ) {
			currentPositionSymbol = seachString.indexOf( subSeachString );			
			if  ( currentPositionSymbol >= 0 ) {
				positionSymbol = positionSymbol + currentPositionSymbol + 1;
				seachString = seachString.slice ( currentPositionSymbol + 1 );				
			} else {
				return -1;
			}
		}	
		positionSymbol = positionSymbol - 1;		
		return positionSymbol;
	} else {
		return - 1;
	}		
}





try {
	const dirData = fs.readdirSync(folderQuestions);
			
	listFilesQuestions = getRandomList ( dirData, amountQuestions );
	for ( let i = 0; i < listFilesQuestions.length; i ++ ) {
		textFileQuestion = fs.readFileSync( folderQuestions + listFilesQuestions [ i ], "utf8" );
		currentQuestions = textFileQuestion.slice ( 1, textFileQuestion.indexOf( '\n' ) );
		console.log( currentQuestions );
		currentValidAnswer = textFileQuestion.slice ( textFileQuestion.indexOf( '\n' ) + 1, findSymbolPosition( textFileQuestion, '\n', 2 ) - 1 );		
		currentAnswers = textFileQuestion.slice ( findSymbolPosition( textFileQuestion, '\n', 2  ) + 1);
		console.log( currentAnswers );
		currentAnswer = readlineSync.question("Введите номер ответа: "  );				
		if (currentValidAnswer == currentAnswer ) {
			amountValidAnswers ++;
		}
		console.log( "" );
		
	}
	
	console.log( "Вы ответили правильно на: ",  amountValidAnswers, "вопросов" );
	
	
} catch (err) {
  console.log ( "Ошибка открытия файлов с вопросами" );
}



