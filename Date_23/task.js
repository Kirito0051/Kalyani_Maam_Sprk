function Add() {
  var num1 = parseFloat(document.querySelector("#Num1").value);
  var num2 = parseFloat(document.querySelector("#Num2").value);

  if (isNaN(num1) || isNaN(num2)) {
    return;
  }
  var sum = num1 + num2;
  document.getElementById("result").innerText = "The sum is : " + sum;
}

function toggleAdd() {
  document.querySelector("#Addbtn").removeEventListener("click", Add);
}

document.querySelector("#Addbtn").addEventListener("click", Add);
//tell me when the disable btn is on
console.log("Disable button is ON: Add button is now disabled.");

// another way of usinf on click using addEventListener
// change is the change in the value of input field

document.querySelector("#BtnDisable").addEventListener("click", toggleAdd);
