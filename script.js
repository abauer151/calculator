let display = document.getElementById('display');

function listen()
{
    let buttons = document.querySelectorAll('button');
    buttons = Array.from(buttons);
    buttons.forEach((current) => current.addEventListener('click', click));
}

function click()
{
    if(this.textContent === "AC")
    {
        clear();
        return;
    }

    if(this.textContent === "=")
    {
        operate(display.value);
        return;
    }

    display.value += this.textContent;
}

function operate(string)
{
    //Remove spaces and commas
    string = string.replaceAll(" ", "");
    string = string.replaceAll(",", "");

    if(string.charAt(0) === "\u221A")
    {
        clear();
        display.value = evaluate(string.slice(1), 0.5, "^");
        return;
    }

    let operatorIndex = findOperator(string);

    if(operatorIndex === -1)
    {
        clear();
        display.value = "ERROR";
        return;
    }

    console.log(string.substring(0, operatorIndex) + " " + string.slice(operatorIndex + 1) + " " + string.substring(operatorIndex, operatorIndex + 1))
    let solution = evaluate(string.substring(0, operatorIndex), string.slice(operatorIndex + 1), string.substring(operatorIndex, operatorIndex + 1));

    clear();
    display.value = solution;
}

function evaluate(num1, num2, operator)
{
    num1 = parseFloat(num1);
    console.log(num1);
    num2 = parseFloat(num2);
    
    if(operator === "+")
        return num1 + num2;
    if(operator === "-")
        return num1 - num2;
    if(operator === "\xD7")
        return num1 * num2;
    if(operator === `\xF7`)
        return num1 / num2;
    if(operator === "%")
        return num1 % num2;
    if(operator === "^")
        return Math.pow(num1, num2);
    return "ERROR";
}

function isOperator(string)
{
    if(string.length === 1 && 
        string.charAt(0) === "+" ||
        string.charAt(0) === "-" ||
        string.charAt(0) === "%" ||
        string.charAt(0) === "\xF7" ||
        string.charAt(0) === "^" ||
        string.charAt(0) === "\xD7")
        return true;
    return false;
}

function findOperator(string)
{
    console.log("hell00");
    for(let i = 1; i < string.length; i++)
    {
        if(isOperator(string.substring(i, i + 1)))
            return i;
    }
    return -1;
}


function clear()
{
    display.value = "";
}

listen();