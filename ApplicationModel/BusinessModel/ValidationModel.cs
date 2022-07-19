
using CoreModel;

[EntityLabel("Проверка достоверности данных")]
public class ValidationModel: BaseEntity
{
    public string ValidationName { get; set; }
    public string JavaScript { get; set; }
}
