var stack = [];
document.getElementById("clear").addEventListener("click", clear);
var number = document.querySelectorAll(".number");
var res = document.getElementById("displayText").value;
var operatorBtn = document.querySelectorAll(".slash");
var clicked = 0;
var isEmpty = false;

number.forEach((button) => {
    button.addEventListener("click", function () {
        var num1 = button.innerText;
        clicked = 1;
        if (isEmpty) {
            document.getElementById("displayText").value = "";
            isEmpty = false;
        }
        document.getElementById("displayText").value += num1;
    });
});

function calculateOperator(num1, num2, op) {
    switch (op) {
        case "+":
            return (num1 + num2);
        case "-":
            return (num1 - num2);
        case "*":
            return (num1 * num2);
        case "/":
            return (num1 / num2);
    }
}
operatorBtn.forEach((button) => {
    button.addEventListener("click", function () {
        var operator = button.innerText;
        if (isOperator()) {
            var num2 = document.getElementById("displayText").value;
            var fetch = stack.pop();
            var num1 = stack.pop();
            var result = calculateOperator(parseInt(num1), parseInt(num2), fetch);
            console.log(`${num1} ${fetch} ${num2} = ${result}`);
            document.getElementById("displayText").value = result;
            clicked = 0;
        }

        if (operator !== "=") {
            stack.push(document.getElementById("displayText").value);
            stack.push(operator);
            isEmpty = true;
            if (isEmpty) {
                document.getElementById("displayText").value = stack[0];
            }
        }
    });
});


function clear() {
    document.getElementById("displayText").value = "";
    stack.length = 0;
}


function passes() {
    return stack[stack.length - 1];
}


function isOperator() {
    if (passes() == "+" || passes() == "-" || passes() == "*" || passes() == "/") {
        return true;
    } else {
        return false;
    }
}

