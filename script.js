const alertBox = document.querySelector(".alert");
const closeAlert =()=>{
  alertBox.style.display="none";
}
if(window.innerWidth<900){
  closeAlert();
}
/* Calculator Function */
class stack {
  constructor() {
    this.top = -1;
    this.l = [];
  }
  Push(op) {
    this.top = this.top + 1;
    this.l.push(op);
    // console.log(`${op} inserted at ${this.top}`);
  }
  Pop() {
    if (this.top > -1) {
      var term = this.l[this.top];
      this.l.pop();
      this.top = this.top - 1;
      return term;
    }
    return null;
  }
  display() {
    return this.l;
  }
  Empty() {
    this.l = [];
    this.top = -1;
  }
  Top() {
    return this.top;
  }
  Pos(i) {
    return this.l[i];
  }
  Val() {
    var data = "";
    for (let i = 0; i <= this.Top(); i++) {
      data += this.Pos(i);
    }
    return data;
  }
}
function evaluatePostfix(s) {
  var stack1 = new stack();
  for (let i = 0; i <= s.Top(); i++) {
    if (Number.isFinite(s.Pos(i))) {
      stack1.Push(s.Pos(i));
    } else {
      let val1 = stack1.Pop();
      let val2 = stack1.Pop();
      switch (s.Pos(i)) {
        case "f":
          if (val2) {
            stack1.Push(val2);
          }
          stack1.Push(1 / val1);
          break;
        case "s":
          if (val2) {
            stack1.Push(val2);
          }
          stack1.Push(val1 ** 2);
          break;
        case "r":
          if (val2) {
            stack1.Push(val2);
          }
          stack1.Push(val1 ** (1 / 2));
          break;
        case "^":
          stack1.Push(val2 ** val1);
          break;
        case "%":
          if (val2) {
            stack1.Push(val2);
          }
          stack1.Push(val1 / 100);
          break;
        case "*":
          stack1.Push(val2 * val1);
          break;
        case "/":
          stack1.Push(val2 / val1);
          break;
        case "+":
          stack1.Push(val2 + val1);
          break;
        case "-":
          stack1.Push(val2 - val1);
          break;
        case "rem":
          stack1.Push(val2 % val1);
          break;
        case "m":
          if (val2) {
            stack1.Push(val2);
          }
          stack1.Push(Math.abs(val1));
          break;
        case "+/-":
          if (val2) {
            stack1.Push(val2);
          }
          stack1.Push(-val1);
          break;
      }
    }
  }
  return stack1.Pop();
}

function prec(c) {
  if (c == "^") return 3;
  else if (c == "/" || c == "*" || c=="rem") return 2;
  else if (c == "+" || c == "-") return 1;
  else return -1;
}

function isUnary(c) {
  if (c == "f" || c == "s" || c == "r" || c == "%" || c == "m" || c == "+/-")
    return true;
  return false;
}

function evaluateInfix(s) {
  var st = new stack();
  var result = new stack();
  st.Push("(");
  s.Push(")");
  for (let i = 0; i <= s.Top(); i++) {
    let c = s.Pos(i);

    if (Number.isFinite(c) || isUnary(c)) result.Push(c);
    else if (c == "(") {
      st.Push("(");
    } else if (c == ")") {
      while (st.Pos(st.Top()) != "(") {
        result.Push(st.Pos(st.Top()));
        st.Pop();
      }
      st.Pop();
    } else {
      while (st.Top() != -1 && prec(s.Pos(i)) <= prec(st.Pos(st.Top()))) {
        result.Push(st.Pos(st.Top()));
        st.Pop();
      }
      st.Push(c);
    }
  }
  // console.log(result.display());
  return evaluatePostfix(result);
}

function submit() {
  document.querySelector(".exp").value = exp.Val();
}
var all = document.querySelectorAll(".btn");
for (let i = 0; i < all.length; i++) {
  all[i].addEventListener("click", submit);
}

var displayOp = document.querySelector(".display-box");
const sol = new stack();
const opt = new stack();
var exp = new stack();
{
  // s.Push(89)
  // s.Push("+")
  // s.Push(96)
  // s.Push("*")
  // s.Push(58)
  // s.Push("-")
  // s.Push(25)
  // s.Push("/")
  // s.Push(5)
  // s.Push("%")
  // console.log(infixToPostfix(s));
}
var display = "none";
var preDisplay = "none";
function ce() {
  if (display == "none") return;
  else if (sol.Top() == -1) {
    display = "none";
  } else {
    display = preDisplay;
  }
  for (let i = 0; i <= opt.Top(); i++) {
    exp.Pop();
  }
  opt.Empty();
  displayOp.value = "";
}
function c() {
  exp.Empty();
  opt.Empty();
  sol.Empty();
  display = "none";
  preDisplay = "none";
  displayOp.value = "All Clear";
}

function erase() {
  if (opt.Top() == 0) {
    ce();
    return;
  }
  exp.Pop();
  opt.Pop();
  displayOp.value = opt.Val();
}
function inverse() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    sol.Push(parseFloat(displayOp.value));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("f");
  exp.Push("1/x");
  displayOp.value = "1/x";
  preDisplay = display;
  display = "operator";
}
function sqr() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    sol.Push(parseFloat(displayOp.value));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("s");
  exp.Push("^2");
  displayOp.value = "x^2";
  preDisplay = display;
  display = "operator";
}
function sqRoot() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    sol.Push(parseFloat(displayOp.value));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("r");
  exp.Push("root");
  displayOp.value = "root";
  preDisplay = display;
  display = "operator";
}
function pow() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    if (parseFloat(opt.Val())) sol.Push(parseFloat(opt.Val()));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("^");
  exp.Push("^");
  displayOp.value = "^";
  preDisplay = display;
  display = "operator";
}
function perc() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    sol.Push(parseFloat(displayOp.value));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("%");
  exp.Push("%");
  displayOp.value = "%";
  preDisplay = display;
  display = "operator";
}
function add7() {
  if (display == "none") {
    display = "number";
  } else if (display == "operator") {
    if (opt.Val() != "") sol.Push(opt.Val());
    opt.Empty();
  } else if (display == "equal") {
    displayOp.value = "";
    exp.Empty();
    opt.Empty();
  }
  opt.Push(7);
  exp.Push(7);
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function add8() {
  if (display == "none") {
    display = "number";
  } else if (display == "operator") {
    if (opt.Val() != "") sol.Push(opt.Val());
    opt.Empty();
  } else if (display == "equal") {
    displayOp.value = "";
    exp.Empty();
    opt.Empty();
  }
  opt.Push(8);
  exp.Push(8);
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function add9() {
  if (display == "none") {
    display = "number";
  } else if (display == "operator") {
    if (opt.Val() != "") sol.Push(opt.Val());
    opt.Empty();
  } else if (display == "equal") {
    displayOp.value = "";
    opt.Empty();
    exp.Empty();
  }
  opt.Push(9);
  exp.Push(9);
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function mul() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    if (parseFloat(opt.Val())) sol.Push(parseFloat(opt.Val()));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("*");
  exp.Push("*");
  displayOp.value = "*";
  preDisplay = display;
  display = "operator";
}
function div() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    if (parseFloat(opt.Val())) sol.Push(parseFloat(opt.Val()));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("/");
  exp.Push("/");
  displayOp.value = "/";
  preDisplay = display;
  display = "operator";
}
function add4() {
  if (display == "none") {
    display = "number";
  } else if (display == "operator") {
    if (opt.Val() != "") sol.Push(opt.Val());
    opt.Empty();
  } else if (display == "equal") {
    displayOp.value = "";
    opt.Empty();
    exp.Empty();
  }
  opt.Push(4);
  exp.Push(4);
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function add5() {
  if (display == "none") {
    display = "number";
  } else if (display == "operator") {
    if (opt.Val() != "") sol.Push(opt.Val());
    opt.Empty();
  } else if (display == "equal") {
    displayOp.value = "";
    opt.Empty();
    exp.Empty();
  }
  opt.Push(5);
  exp.Push(5);
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function add6() {
  if (display == "none") {
    display = "number";
  } else if (display == "operator") {
    if (opt.Val() != "") sol.Push(opt.Val());
    opt.Empty();
  } else if (display == "equal") {
    displayOp.value = "";
    opt.Empty();
    exp.Empty();
  }
  opt.Push(6);
  exp.Push(6);
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function plus() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    if (parseFloat(opt.Val())) sol.Push(parseFloat(opt.Val()));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("+");
  exp.Push("+");
  displayOp.value = "+";
  preDisplay = display;
  display = "operator";
}
function minus() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    if (parseFloat(opt.Val())) sol.Push(parseFloat(opt.Val()));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("-");
  exp.Push("-");
  displayOp.value = "-";
  preDisplay = display;
  display = "operator";
}
function add1() {
  if (display == "none") {
    display = "number";
  } else if (display == "operator") {
    if (opt.Val() != "") sol.Push(opt.Val());
    opt.Empty();
  } else if (display == "equal") {
    displayOp.value = "";
    opt.Empty();
    exp.Empty();
  }
  opt.Push(1);
  exp.Push(1);
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function add2() {
  if (display == "none") {
    display = "number";
  } else if (display == "operator") {
    if (opt.Val() != "") sol.Push(opt.Val());
    opt.Empty();
  } else if (display == "equal") {
    displayOp.value = "";
    opt.Empty();
    exp.Empty();
  }
  opt.Push(2);
  exp.Push(2);
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function add3() {
  if (display == "none") {
    display = "number";
  } else if (display == "operator") {
    if (opt.Val() != "") sol.Push(opt.Val());
    opt.Empty();
  } else if (display == "equal") {
    displayOp.value = "";
    opt.Empty();
    exp.Empty();
  }
  opt.Push(3);
  exp.Push(3);
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function rem() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    if (parseFloat(opt.Val())) sol.Push(parseFloat(opt.Val()));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("rem");
  exp.Push("rem");
  displayOp.value = "remainder";
  preDisplay = display;
  display = "operator";
}
function equal() {
  if (display == "none") {
    displayOp.value = "0";
    return;
  } else if (isUnary(opt.Val())) {
    sol.Push(opt.Val());
  } else if (display == "number") {
    if (displayOp.value) sol.Push(parseFloat(opt.Val()));
  }
  else if(display=="equal"){
    return;
  }
  var ans = parseFloat(evaluateInfix(sol).toFixed(5));
  opt.Empty();
  exp.Empty();
  function afterDecimal(num){
    if(Number.isInteger(num)){
      return 0;
    }
    return num.toString().split('.')[1].length;
  }
  if(afterDecimal(ans)>5)
  {
    ans=ans.toFixed(5);
  }
  displayOp.value = ans;
  opt.Push(ans);
  exp.Push(ans);
  preDisplay = display;
  display = "equal";
  sol.Empty();
  submit();
}
function negate() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    sol.Push(parseFloat(displayOp.value));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("+/-");
  exp.Push("+/-");
  displayOp.value = "negate";
  preDisplay = display;
  display = "operator";
}
function addZero() {
  if (display == "none") {
    display = "number";
  } else if (display == "operator") {
    sol.Push(opt.Val());
    opt.Empty();
  } else if (display == "equal") {
    displayOp.value = "";
    opt.Empty();
  }
  opt.Push(0);
  exp.Push(0);
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function addDec() {
  if (display == "none") {
    display = "number";
    opt.Push(0);
    exp.Push(0);
  } else if (display == "operator") {
    sol.Push(opt.Val());
    opt.Empty();
    opt.Push(0);
    exp.Push(0);
  } else if (display == "equal") {
    displayOp.value = "";
    opt.Empty();
    exp.Empty();
    opt.Push(0);
    exp.Push(0);
  }
  opt.Push(".");
  exp.Push(".");
  displayOp.value = opt.Val();
  preDisplay = display;
  display = "number";
}
function absolute() {
  if (display == "operator") {
    opt.Empty();
    exp.Pop();
  } else if (display == "equal" || display == "number") {
    sol.Push(parseFloat(displayOp.value));
  } else if (display == "none") {
    displayOp.value = "no operand";
    return;
  }
  opt.Empty();
  opt.Push("m");
  displayOp.value = "mod";
  exp.Push("mod");
  preDisplay = display;
  display = "operator";
}

document.addEventListener(
  "keypress",
  (event) => {
    var name = event.key;
    switch (name) {
      case "^":
        pow();
        break;
      case "%":
        perc();
        break;
      case "7":
        add7();
        break;
      case "8":
        add8();
        break;
      case "9":
        add9();
        break;
      case "*":
        mul();
        break;
      case "/":
        div();
        break;
      case "4":
        add4();
        break;
      case "5":
        add5();
        break;
      case "6":
        add6();
        break;
      case "+":
        plus();
        break;
      case "-":
        minus();
        break;
      case "1":
        add1();
        break;
      case "2":
        add2();
        break;
      case "3":
        add3();
        break;
      case "0":
        addZero();
        break;
      case ".":
        addDec();
        break;
      case "=":
        equal();
        break;
    }
    submit();
  },false);
document.addEventListener("keydown", (event) => {
  var name = event.key;
  if (name == "Backspace") {
    erase();
    submit();
  } else if (name == "Delete") {
    ce();
    submit();
  } else if (name == "Enter") {
    equal();
    submit();
  }
});
