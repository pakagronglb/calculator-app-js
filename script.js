const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

let expression = '';
let result = '';

function buttonClick(event) {
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    // console.log(target, action, value);

    // Switch case in case of if else to control calculator
        switch (action) {
            case 'number':
                addValue(value);
                break;
            case 'clear':
                clear();
                break;
            case 'backspace':
                backspace();
                break;
            case 'addition':
            case 'subtraction':
            case 'multiplication':
            case 'division':
                if (expression === '' && result !== '') {
                    startFromResult(value);
                } else if (expression !== '' && !isLastCharOperator()) {
                    addValue(value);
                }
                break;
            case 'submit':
                submit();
                break;
            case 'negate':
                negate();
                break;
            case 'mod':
                percentage();
                break;
            case 'decimal':
                decimal(value);
                break;
        }

    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);

function addValue(value) {
    if (value === '.') {
        const lastOperatorIndex = expression.search(/[+\-*/]/);
        const lastDecimalIndex = expression.lastIndexOf('.');
        const lastNumberIndex = Math.max(
            expression.lastIndexOf('+'),
            expression.lastIndexOf('-'),
            expression.lastIndexOf('*'),
            expression.lastIndexOf('/')
          );

          if (
            (lastDecimalIndex < lastOperatorIndex ||
              lastDecimalIndex < lastNumberIndex ||
              lastDecimalIndex === -1) &&
            (expression === '' ||
              expression.slice(lastNumberIndex + 1).indexOf('-') === -1)
          ) {
            expression += value;
          }
        } else {
          expression += value;
        }
      }

function updateDisplay(expression, result) {
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

function clear() {
    expression = '';
    result = '';
}

function backspace() {
    expression = expression.slice(0, -1);
}

function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)));
}

function startFromResult(value) {
    expression += result + value;
}

function submit() {
    result = evaluateExpression();
    expression = '';
}

function evaluateExpression() {

    const evalResult = eval(expression);
    return isNaN(evalResult) || !isFinite(evalResult) ? ' '

    : evalResult < 1 
    ? parseFloat(evalResult.toFixed(10))
    : parseFloat(evalResult.toFixed(2));
}

function negate() {
    if (expression === '' && result !== '') {
        result = -result;
    } else if (!expression.startsWith('-') && expression !== '') {
        expression = '-' + expression;
    } else if (expression.startsWith('-')) {
        expression = expression.slice(1);
    }
}

function percentage() {
    if (expression !== '') {
        result = evaluateExpression();
        expression = '';
        if (!isNaN(result) && isFinite(result)) {
            result /= 100;
        } else {
            result = '';
        }
    } else if (result !== '') {
        result = parseFloat(result) / 100;
    }
}

function decimal(value) {
    if (!expression.endsWith('.') && !isNaN(expression.slice(-1))) {
        addValue(value);
    }
}

