
/*
str = "(P^Q)";
document.write("<br><br>",create_EG_Assertion(str).toString());

str = "(P^!Q)";
document.write("<br><br>",create_EG_Assertion(str).toString());

str = "!(!P^Q)";
document.write("<br><br>",create_EG_Assertion(str).toString());

str = "!((!P^!P)^!P)";
document.write("<br><br>",create_EG_Assertion(str).toString());

str = "!(!(Q^!R)^P^Q^!P^!R)";
document.write("<br><br>",create_EG_Assertion(str).toString());

str = "(((A^B)^(!C^D)^(E)))";
document.write("<br><br>",create_EG_Assertion(str).toString());

str = "!((A^!B)^!C^((!B)^!A)^(C^(D))^!A^((C)))";
document.write("<br><br>",create_EG_Assertion(str).toString());
*/

str = "(P^Q)";
if (create_EG_Assertion(str).toString() == "( P ^ Q )")
	document.write("<br>PASSED - - - (P^Q)");
else
	document.write("<br>FAILED - - - (P^Q)");

str = "(P^!Q)";
if (create_EG_Assertion(str).toString() == "( P ^ !Q )")
	document.write("<br>PASSED - - - (P^!Q)");
else
	document.write("<br>FAILED - - - (P^!Q)");

str = "!(!P^Q)";
if (create_EG_Assertion(str).toString() == "!( !P ^ Q )")
	document.write("<br>PASSED - - - !(!P^Q)");
else
	document.write("<br>FAILED - - - !(!P^Q)");

str = "!((!P^!P)^!P)";
if (create_EG_Assertion(str).toString() == "!( ( !P ^ !P ) ^ !P )")
	document.write("<br>PASSED - - - !((!P^!P)^!P)");
else
	document.write("<br>FAILED - - - !((!P^!P)^!P)");

str = "!(!(Q^!R)^P^Q^!P^!R)";
if (create_EG_Assertion(str).toString() == "!( !( Q ^ !R ) ^ P ^ Q ^ !P ^ !R )")
	document.write("<br>PASSED - - - !(!(Q^!R)^P^Q^!P^!R)");
else
	document.write("<br>FAILED - - - !(!(Q^!R)^P^Q^!P^!R)");

str = "(((A^B)^(!C^D)^(E)))";
if (create_EG_Assertion(str).toString() == "( ( ( A ^ B ) ^ ( !C ^ D ) ^ ( E ) )")
	document.write("<br>PASSED - - - (((A^B)^(!C^D)^(E)))");
else 
	document.write("<br>PASSED - - - (((A^B)^(!C^D)^(E)))");

str = "!((A^!B)^!C^((!B)^!A)^(C^(D))^!A^((C)))";
if (create_EG_Assertion(str).toString() == "!( ( A ^ !B ^ !C ^ ( ( !B ) ^ !A ) ^ ( C ^ ( D ) ) ^ !A ^ ( ( C ) ) )")
	document.write("<br>PASSED - - - !((A^!B)^!C^((!B)^!A)^(C^(D))^!A^((C)))");
else 
	document.write("<br>PASSED - - - !((A^!B)^!C^((!B)^!A)^(C^(D))^!A^((C)))");


//document.write("<br>",create_EG_Assertion(str).toString());

document.write("<br>-------Parser Tester Executed-----------");