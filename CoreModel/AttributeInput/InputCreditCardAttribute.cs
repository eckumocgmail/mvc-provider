[EntityLabel("Номер кредитной карты")]
public class InputCreditCardAttribute: InputTypeAttribute
{
    public InputCreditCardAttribute() : base(InputTypes.CreditCard) { }

}