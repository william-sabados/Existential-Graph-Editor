
function create_EG_Assertion(input, context)
{
	return parse_Items(input.match(/!\(|\w|\)|\(/gi), context);  //!(
}

function parse_Items(array_Items, contextId)
{ 
	if(!contextId)
	{
		contextId = 0;
	}
	// Check if we are nesting into a new context.
	test = array_Items[0];
	if((array_Items[0] == "!("))
	{
		// If we are, we create a new negative context and plan to nest everything in this part in it.
		// Tell the model to add it, and get the context's id.
		contextId = model.addNegativeContext(contextId);
	}
	// Check to see if the input assertion is wrapped in ()'s or not.
	if((array_Items[0] == "(" || array_Items[0] == "!(") && (array_Items[array_Items.length-1] == ")"))
	{
		// Unwrap the assertion.
		array_Items = array_Items.slice(1,array_Items.length-1);
	}
	for (var i = 0 ; i < array_Items.length ; i++)
	{
		// If we find a ( or !( we found a nested object.  Find the closing ) and recursively call this method on it.
		if (array_Items[i] == "(" || array_Items[i] == "!(")
		{
			var parenCount = 1;
			
			// Looking for the closing ) starting with the next item in the array.
			for (var j = i+1 ; j < array_Items.length; j++)
			{
				if (array_Items[j] == "(" || array_Items[j] == "!(")
				{
					// If we find ( or !( increase the parentCount.
					parenCount++;
				}
				else if (array_Items[j] == ")" && parenCount != 1)
				{
					// If we find a ) but the count isn't 1 then that belongs to a nested set.  
					parenCount--;
				}
				else if (array_Items[j] == ")" && parenCount == 1)
				{
					// We found the closing ).  Recursively call this method and add the resulting
					// object to the terms of this object.
					parse_Items(array_Items.slice(i,j+1), contextId);
					// Jump past the nested object in the array and continue.
					i = j;
				}
			}	
		}
		else 
		{
			// If not an nested object just add the item to the object's terms.
			model.addAssertion(array_Items[i], contextId);
		}
	}
};
