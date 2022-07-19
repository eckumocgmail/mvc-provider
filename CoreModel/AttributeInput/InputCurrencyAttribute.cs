[EntityLabel("Баланс")]
[EntityIcon("attach_money")]
public class InputCurrencyAttribute : InputTypeAttribute
{
    public InputCurrencyAttribute() : base(InputTypes.Currency) { }

}