// This function call will allow users to input something not technically right, but the computer will
// fix a little bit of it.

function fixSyntax(syntax)
{
    let charcount = 0;
    let wrap = false;
    //Get the count of characters.
    /*for(let i = 0; i < syntax.length; i++)
    {
        code = syntax.charCodeAt(i);
        if (((code > 47 && code < 58) || // numeric (0-9)
        (code > 64 && code < 91) || // upper alpha (A-Z)
        (code > 96 && code < 123)))
        charcount++;
    }*/
    if(syntax.indexOf("^") == -1)
    {
        charcount = 1;
    }
    // Check for some parentheses that confuse the system.
    if(syntax[0] == "(")
    {
        parencount = 1;
        for(i = 0; i < syntax.length; i++)
        {
            if(syntax[i] == "(")
            {
                parencount++;
            }
            else if(syntax[i] == ")")
            {
                parencount--;
            }
            if(parencount == 0 && i < syntax.length-1)
            {
                wrap = true;
                break;
            }
        }
    }
    else
        wrap = true;
    //Check that the entire statement is wrapped. It needs to be. Avoid double wrapping.
    if(wrap = true && charcount != 1)
    {
        syntax = "(" + syntax + ")";
    }
    //Check for wrappings around each character. If not there, wrap the character.
    for(let i = 0; i < syntax.length; i++)
        if(syntax[i] == " ")
        {
            syntax = syntax.slice(0, i) + syntax.slice(i+1);
        }
    for(let i = 0; i < syntax.length; i++)
    {
        code = syntax.charCodeAt(i);
        // Destroy all spaces in the string.
        
        if (((code > 47 && code < 58) || // numeric (0-9)
        (code > 64 && code < 91) || // upper alpha (A-Z)
        (code > 96 && code < 123)) && !(syntax[i-1] == "(" && syntax[i+1] == ")"))// lower alpha (a-z)
        {
            // If its a character, we wrap it in parentheses.
            syntax = syntax.slice(0,i) + "(" + syntax.slice(i,i+1) + ")" + syntax.slice(i+1);
            i++;
        }
    }
    while(syntax.indexOf("|") != -1 || syntax.indexOf(">") != -1)
    {
        impl = syntax.indexOf(">");
        disj = syntax.indexOf("|");
        if(impl != -1 && impl < disj || disj == -1)
        {
            dex = impl;
            disj = -1;
        }
        else
        {
            dex = disj;
            impl = -1
        }
        let beforedex = 0;
        let afterdex = 0;
        let paren = 0;
        //Find what is before the unparsable beast.
        for(let b = dex-1; b > 0; b--)
        {
            if(syntax[b] == ")")
            {
                paren++;
            }
            else if(syntax[b] == "(")
            {
                paren--;
            }
            if(paren == 0)
            {
                if(syntax[b-1] == "!")
                    beforedex = b-1;
                else
                    beforedex = b;
                break;
            }
        }
        //Find what is after the unparsable beast.
        for(let f = dex+1; f < syntax.length; f++)
        {
            if(syntax[f] == "(")
            {
                paren++;
            }
            else if(syntax[f] == ")")
            {
                paren--;
            }
            if(paren == 0)
            {
                afterdex = f;
                break;
            }
        }
        // Extract the two necessary parts.
        let first = syntax.substring(beforedex, dex);
        let second = syntax.substring(dex+1, afterdex+1);

        if(disj != -1)
            syntax = syntax.substring(0, beforedex) + "!(!(" + first + ")^!(" + second +"))" + syntax.substring(afterdex+1);
        else
            syntax = syntax.substring(0, beforedex) + "!(" + first + "^!(" + second +"))" + syntax.substring(afterdex+1);
    }
    // Now that everything SHOULD be uniform. Perform the conversion of implications and disjunctions to conjunctions and negations.
    /*while(syntax.indexOf(">") != -1)
    {
        impl = syntax.indexOf(">");
        let beforedex = 0;
        let afterdex = 0;
        let paren = 0;
        //Find what is before the unparsable beast.
        for(let b = impl-1; b > 0; b--)
        {
            if(syntax[b] == ")")
            {
                paren++;
            }
            else if(syntax[b] == "(")
            {
                paren--;
            }
            if(paren == 0)
            {
                if(syntax[b-1] == "!")
                    beforedex = b-1;
                else
                    beforedex = b;
                break;
            }
        }
        //Find what is after the unparsable beast.
        for(let f = impl+1; f < syntax.length; f++)
        {
            if(syntax[f] == "(")
            {
                paren++;
            }
            else if(syntax[f] == ")")
            {
                paren--;
            }
            if(paren == 0)
            {
                afterdex = f;
                break;
            }
        }
        // Extract the two necessary parts.
        let first = syntax.substring(beforedex, impl);
        let second = syntax.substring(impl+1, afterdex+1);

        syntax = syntax.substring(0, beforedex) + "!(" + first + "^!(" + second +"))" + syntax.substring(afterdex+1);
    }
    */
    return syntax;
}