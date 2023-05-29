const calculator = document.querySelector('.calculator')
const push_buttons = calculator.querySelector('.calc-buttons')
const display = document.querySelector('.display-screen')
push_buttons.addEventListener("click",record)

function record()
{
  console.log("*********** Event Triggered **************")
  const pushed_button = event.target
  const action = pushed_button.dataset.action
  const pushed_val = pushed_button.id
  var display_num = display.textContent
  const arthematic_ops = ['add','subtract','multiply','divide','mod','power']
  const prev_type = calculator.dataset.prev_button_type

  const val1 = calculator.dataset.v1
  const op = calculator.dataset.op
  const val2 = calculator.dataset.v2
  const is_digit = /^[+-]?([0-9]*[.])?[0-9]+$/

  // If any Error messeges is on the display screen and resetting all custom attributes
  //This will match formats like: 123, 123.456, .456
  if (! display_num.match(is_digit)){
    clear_everything(calculator)
  }

  console.log("val1 = %s , op = %s , val2 = %s , prev_type =%s", val1,op,val2,prev_type)

  if (action === 'digit') {
    console.log("--- action === 'digit' ---")
    if (display_num === '0' || prev_type === 'operator' || prev_type === 'evaluate') {
      display.textContent = pushed_val
    }
    else {
      display.textContent = display_num + pushed_val
    }
    calculator.dataset.prev_button_type = 'number'
  }
  else if (action === 'decimal') {
    console.log("--- action === 'decimal' ---")
    //If the value in the display contains decimal(.)
    // then Do Nothing else append it with content in display
    if (! display_num.includes('.')){
      display.textContent = display_num + '.'
    }
    calculator.dataset.prev_button_type = 'decimal'
  }
  else if (arthematic_ops.includes(action)) {
    console.log("--- arthematic_ops.includes(action) ---")
    // If an Operator is pressed without Evaluate(=)
    //Then execute stored val1 and display_num with the previous operator
    // 12+6-3*5+9 ---> output: { evaluation process--> 12+6- :18, 18-3* :15, 15*5+ :75 ,75+9....}
    if (prev_type ==='number' && op) {
      calculator.dataset.v2 = display_num
      display_num = evaluate(val1,op,display_num)
      display.textContent = display_num
    }
    //Updating the 'data-v1' attribute with display_num
    //[display_num = User input (or) evaluated output from the above IF]
    //Updating the 'dataset-op' with currently pressed Operator
    calculator.dataset.v1 = display_num
    calculator.dataset.op = action
    calculator.dataset.prev_button_type = 'operator'
  }
  else if (action === 'evaluate') {
    console.log("--- action === 'evaluate' ---")
    // If a number and Operator were already passed and Second number is on display, evaluate expression {Eg: 5+16= ---> output:21}
    // OR If number and Operator were already passed followed by Evaluate(=) {Eg: 6+= --> output:12}
    if ((prev_type === 'number' && op) || (prev_type === 'operator' && val1)){
      calculator.dataset.v2 = display_num
      var temp = evaluate(val1,op,display_num)
      display.textContent = evaluate(val1,op,display_num)
    }
    // If pressed Evaluation button (=) Continously after few operations
    // then Repating the last operation with the last number continously on display_num
    // Eg: 6+===== ---> output:36 { evaluation process--> 6+6=12+6=18+6=24+6=30+6=36 }
    else if(prev_type === 'evaluate' && val2) {
      calculator.dataset.v1 = display_num
      display.textContent = evaluate(display_num,op,val2)
    }
    calculator.dataset.prev_button_type = 'evaluate'
  }
  else if (action === 'clear_screen') {
    clear_everything(calculator)
    display.textContent= '0'
  }
  else if (action === 'SQRT')
  {
    display.textContent = evaluate(display_num,action)
    calculator.dataset.prev_button_type = 'operator'
  }
  console.log("val1 = %s , op = %s , val2 = %s , prev_type =%s", calculator.dataset.v1,calculator.dataset.op,calculator.dataset.v2,calculator.dataset.prev_type)
}

function clear_everything(calculator){
  console.log("*** clear_everything ***")
  calculator.dataset.v1 =''
  calculator.dataset.op = ''
  calculator.dataset.v2 = ''
  calculator.dataset.prev_type= ''
}

function convert_type(num)
{
  if (num.indexOf('.')){
    return parseFloat(num)
  }
  else{
    return parseInt(num)
  }
}

function evaluate(first_num, op, second_num = '0')
{
  console.log("========Evaluate=========")
  console.log("num1 = %s, op = %s, num2= %s",first_num,op,second_num)
  var result
  first_num = convert_type(first_num)
  second_num = convert_type(second_num)
  try
  {
    if (op === 'add'){
      result = first_num + second_num
    }else if (op === 'subtract'){
      result = first_num - second_num
    }else if ( op === 'multiply'){
      result = first_num * second_num
    }else if (op === 'divide'){
      if(second_num == 0){ throw 'Cannot divide by zero'}
      result = first_num/second_num
    }else if (op === 'mod') {
      result = first_num % second_num
    }else if (op === 'power'){
      result = Math.pow(first_num,second_num)
    }else{
      if (first_num < 0){ throw 'Invalid input'}
      result = Math.sqrt(first_num)
    }
  }
  catch (error){
    result = error
  }
  return result
}
