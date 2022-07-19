using System;

public abstract class ControlAttribute : Attribute
{

    public abstract ViewItem CreateControl(FormField field);
}