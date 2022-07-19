using System;

[EntityLabel("Массив структурированного типа")]
public class InputStructureCollectionAttribute : InputTypeAttribute
{

    public Type ItemType { get; }

    public InputStructureCollectionAttribute(): base(InputTypes.StructureCollection){        
    }

    public InputStructureCollectionAttribute(string type) : base(InputTypes.StructureCollection)
    {

        this.ItemType = ReflectionService.TypeForName(type);
        if( ItemType == null)
        {
            throw new Exception("Тип элемент коллекции задан неверно");
        }

    }

}