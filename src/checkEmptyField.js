import React from "react";

function checkEmptyField(enteredValue)
{
    if(enteredValue.trim().length===0)
    {
        return true;
    }
    else
    {
        return false;
    }
}
export default checkEmptyField;