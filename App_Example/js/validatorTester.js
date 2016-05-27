
//  Runs the validate function with the given inputs
//  and checks the expected outcome

///// Known correct cases (should pass) //////


str = "()";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "(A)";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "((A^B)^C)";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "(A^(B^C))";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "!(!(A^!B)^!C)";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "(!A^!(B^!C))";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "!(H^(A^B)^C^!(E^!F)^D)";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "(!A^!(A))^(C^(!D^!(E)))^!(A)";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "()^()^()^()";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "(!A)";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "!(A)";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

str = "((()))";
if (validate_input(str) == false)
	document.write("<BR>:FAILED: - - - ",str);

//////Known incorrect cases (not pass) ///////

str = "A";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "A^";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "^A";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "(A";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "(A(B";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "(A^B^)";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "(A^^B)";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "(!^B)";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "(A^B^C)!";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "())";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "'('A^B)";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "<(>SD^B^D))";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "twelve)";
if (validate_input(str) == true)
	document.write("<BR>INCORRECT - - - ",str);

str = "!(A)^!(B)^F76^((A))^(673628)";
if (validate_input(str) == true)
	document.write("<BR>:INCRORRECT: - - - ",str);

str = "!(!A^!B)!";
if (validate_input(str) == true)
	document.write("<BR>:INCRORRECT: - - - ",str);

str = "()(A^!!B)";
if (validate_input(str) == true)
	document.write("<BR>:INCRORRECT: - - - ",str);

str = "(AB)";
if (validate_input(str) == true)
	document.write("<BR>:INCRORRECT: - - - ",str);

str = "(A)(A)";
if (validate_input(str) == true)
	document.write("<BR>:INCRORRECT: - - - ",str);

str = "((A)B)";
if (validate_input(str) == true)
	document.write("<BR>:INCRORRECT: - - - ",str);

str = "(((A)!)!)";
if (validate_input(str) == true)
	document.write("<BR>:INCRORRECT: - - - ",str);

document.write("<br>------Validator Tester Executed---------");












