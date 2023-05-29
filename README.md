# Calculator Web Page

Calculator app can do basic calculations like **+**, **-**, * ,  **/**, **%**, **^**, **SQRT**.

By **`%`** it is "modulo" and `^` it is "to the power of"

Following are some corner cases which are considered in the app:

1. If a decimal point is already entered and the user is trying to enter another decimal point then it will ignored
2. If a number and an Operator pressed followed by Evaluate(=).This app will perform the operation with already entered number

        `6 + = ` this displays `12`
        
3. If pressed Evaluation button (=) continously after few operations then it will   repat the last operation with the last number continously.

       `6 + = = = = =` displays `36` evaluation process `6+6 =12 +6 =18 +6= 24 +6=30 +6=36`


This application has 3 files:
* index.html - Basic HTML file for calculator layout
* calculator_functions.js - Javascript for performing operations for the event on the HTML
* style.css - Style sheet for the index.html

webpage: [Calculator](https://www.np-calculator.com) 
