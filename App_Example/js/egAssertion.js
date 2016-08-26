// The egAssertion is a glorified string, as all it has is an id tied to it.
function egAssertion(assertion, id)
{
    this.value = assertion;
    this.id = id;
    this.copy = function(target)
    {
        if(target == this.id)
            return;
        model.addAssertion(this.value, target);
    };
}