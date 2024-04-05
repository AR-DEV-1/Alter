function getAssessment() {
    const inputArray = captureAndTransformInput()
    let ourNetwork = ourNeuralNetwork
    const result = arrayToHTML(resultToArray(ourNetwork.run(inputArray)))

    document.getElementById('assessment').innerHTML = result
}
function captureAndTransformInput() {
    const boxes = Array.from(document.getElementsByClassName('cell'))
    const toOnesOrZeros = box => box.style.backgroundColor === 'red' ? 1 : 0
    return boxes.map(toOnesOrZeros)
}
ourNeuralNetwork.run(...)
const inputArray = captureAndTransformInput()
const result = arrayToHTML(resultToArray(ourNeuralNetwork.run(inputArray)))
The output of the run() method - i.e., our network’s prediction - is then passed to another “transformer” function we have created called resultToArray():

function resultToArray(resultToConvert) {
    let arrayToReturn = []

    arrayToReturn.push({ label: 'Zero', likelihood: resultToConvert.Zero, topChoice: 0, ordinal: 0 })
    arrayToReturn.push({ label: 'One', likelihood: resultToConvert.One, topChoice: 0, ordinal: 1 })
    arrayToReturn.push({ label: 'Two', likelihood: resultToConvert.Two, topChoice: 0, ordinal: 2 })
    arrayToReturn.push({ label: 'Three', likelihood: resultToConvert.Three, topChoice: 0, ordinal: 3 })
    arrayToReturn.push({ label: 'Four', likelihood: resultToConvert.Four, topChoice: 0, ordinal: 4 })
    arrayToReturn.push({ label: 'Five', likelihood: resultToConvert.Five, topChoice: 0, ordinal: 5 })
    arrayToReturn.push({ label: 'Six', likelihood: resultToConvert.Six, topChoice: 0, ordinal: 6 })
    arrayToReturn.push({ label: 'Seven', likelihood: resultToConvert.Seven, topChoice: 0, ordinal: 7 })
    arrayToReturn.push({ label: 'Eight', likelihood: resultToConvert.Eight, topChoice: 0, ordinal: 8 })
    arrayToReturn.push({ label: 'Nine', likelihood: resultToConvert.Nine, topChoice: 0, ordinal: 9 })

    const byLikelihood = (x, y) => x.likelihood < y.likelihood ? 1 : -1
    const byOrdinal = (x, y) => x.ordinal < y.ordinal ? -1 : 1

    const topChoiceDesignation = (e, i, a) => {
        e.topChoice = i === 0 ? 1 : 0  // mark the first entry (index 0) as the top choice - we can do this because we've already sorted them to ensure that the top choice is the first item 
        return e
    }

    return arrayToReturn.sort(byLikelihood)
        .map(topChoiceDesignation)
        .sort(byOrdinal)
}
// a possible payload for resultToConvert - this data came from the DNN
{
    Zero: 0.1927014673128724,
    One: 1.588071696460247,
    Two: 0.09038684074766934,
    Three: 0.0014367527001013514,
    Four: 94.81642246246338,
    Five: 0.8259298279881477,
    Six: 0.10091685689985752,
    Seven: 0.46726344153285027,
    Eight: 0.30299206264317036,
    Nine: 41.01988673210144
}
function arrayToHTML(arr) {
    let htmlToReturn = ''
    htmlToReturn = arr.map(x => {
        let styleToUse = x.topChoice === 1 ? 'background-color: yellow;' : ''
        return `<div style="${styleToUse}">${x.label} Confidence: ${x.likelihood * 100}%</div>`
    }).join('')

    return htmlToReturn;
}
// setting up a BrainJS DNN object with two specified hyper parameters
ourNeuralNetwork = new brain.NeuralNetwork({
    activation: 'sigmoid',
    learningRate: 0.1
})
const ourTrainingData = getTrainingData()
ourNeuralNetwork.train(ourTrainingData)

{ "input": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    "output": { 
        Zero: 1, 
        One: 0, 
        Two: 0, 
        Three: 0, 
        Four: 0, 
        Five: 0, 
        Six: 0, 
        Seven: 0, 
        Eight: 0, 
        Nine: 0 
        } 
    }
