interface BmiValues {
  height: number,
  weight: number
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  const parsedArgs = args.map(element => Number(element));
  if (parsedArgs.some(element => isNaN(element))) {
    throw new Error('Provided values were not numbers!');
  } else {
    return {
      height: parsedArgs[0],
      weight: parsedArgs[1]
    }
  }
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight / height / height) * 10000;
  
  if (bmi < 18.4) {
    return "Abnormal (underweight)"
  } else if (bmi < 24.9) {
    return "Normal (healthy weight)"
  } else {
    return "Abnormal (overweight)"
  }
}

const calculator = (arg1: string, arg2: string): string => {
  try {
    const { height, weight } = parseBmiArguments([arg1, arg2]);
    return calculateBmi(height, weight)
  } catch (error: unknown) {
    let errorMessage = 'Oops! '
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
    return "malformatted parameters"
  }
}

export default calculator