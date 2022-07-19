using CoreModel;

[EntityLabel("Связанные наборы")]
public class TargetObjectDatasets: BaseEntity
{
    public int TargetObjectID { get; set; }
    public int DatasetID { get; set; }
}