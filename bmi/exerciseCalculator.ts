interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface CalculatorValues {
  exercise: number[]
  target: number
}


const calculateExercises = (exercise: number[], target: number): Result => {
  const average = exercise.reduce((a, b): number => a + b)/ exercise.length;
  let rating
  let ratingDescription

  if (average < target) {
    rating = 1;
    ratingDescription = 'You can do better than that!';
  } else if (average == target ) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better.';
  } else {
    rating = 3;
    ratingDescription = 'Well done!!!';
  }

  return { 
    periodLength: exercise.length,
    trainingDays: exercise.filter(num => num > 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
}

const parseArguments = (args: string[]): CalculatorValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const parsedArgs = args.slice(2).map(element => Number(element));
  
  if (parsedArgs.some(element => isNaN(element))) {
    throw new Error('Provided values were not numbers!');
  } else {
    return {
      exercise: parsedArgs.slice(1, parsedArgs.length),
      target: parsedArgs[0]
    }
  }
} 

try {
  const { exercise, target } = parseArguments(process.argv);
  console.log(calculateExercises(exercise, target))
} catch (error: unknown) {
  let errorMessage = 'Oops! '
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage)
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))