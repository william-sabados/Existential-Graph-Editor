// This function call will allow users to input something not technically right, but the computer will
// fix a little bit of it.

function fixSyntax(syntax)
{
    //Check that the entire statement is wrapped. It needs to be.
    if((syntax[0] != "(" || syntax[0] != "!") && syntax[syntax.length-1] != ")")
    {
        syntax = "(" + syntax + ")";
    }
    //Check for wrappings around each character. If not there, wrap the character.
    for(i = 0; i < syntax.length; i++)
    {
        code = syntax.charCodeAt(i)
        if ((code > 47 && code < 58) || // numeric (0-9)
        (code > 64 && code < 91) || // upper alpha (A-Z)
        (code > 96 && code < 123) && !(syntax[i-1] == "(" && syntax[i+1] == ")"))// lower alpha (a-z)
        {
            // If its a character, we wrap it in parentheses.
            syntax = syntax.slice(0,i) + "(" + syntax.slice(i,i+1) + ")" + syntax.slice(i+1);
            i++;
        }
        // Destroy all spaces in the string.
        else if(syntax[i] == " ")
        {
            syntax = syntax.slice(0, i) + syntax.slice(i+1);
            i--;
        }
    }
    return syntax;
}