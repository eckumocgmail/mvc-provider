using System;

[EntityLabel("Массив простых значений")]
public class InputPrimitiveCollectionAttribute : InputTypeAttribute
{


    public InputPrimitiveCollectionAttribute(): base(InputTypes.PrimitiveCollection){
        
    }
}