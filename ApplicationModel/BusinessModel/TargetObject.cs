using CoreModel;

using System;
using System.Collections.Generic;
using System.Text;
using ApplicationDb.Types;

[EntityLabel("Целевые обьекты оценки")]
public partial class TargetObject : HierDictionaryTable<TargetObject>
{

    [ManyToMany("Datasets")]
    public virtual List<TargetObjectDatasets> TargetObjectDatasets { get; set; }
}