using System;

public abstract class Function<TResolvedMessage>
{
    private readonly Func<TResolvedMessage> _call;

    public Function( Func<TResolvedMessage> call )
    {
        _call = call;        
    }


    public void Call( Action<TResolvedMessage> resolve, Action<Exception> reject = null)
    {
        try
        {
            var response = _call();
            resolve(response);
        }
        catch (Exception ex)
        {
            if(reject == null)
            {
                throw new Exception("�� ������������ �����",ex);
            }
            else
            {
                reject(ex);
            }
        }
    }
}