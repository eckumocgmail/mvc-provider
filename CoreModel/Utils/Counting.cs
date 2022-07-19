using System;
using System.Collections.Generic;
using System.Text;

/// <summary>
/// Форматирует численность существительного по правилам англ. языка
/// </summary>
public class Counting
{
    /// <summary>
    /// Возвращает существительное во множественном числе
    /// </summary>
    /// <param name="table"></param>
    /// <returns></returns>
    public static string GetMultiCountName(string table)
    {
        //определение наименования в множественном числе и единственном                        
        string tableName = table;
        string multicount_name = null;
        if (tableName.EndsWith("s"))
        {
            if (tableName.EndsWith("ies"))
            {
                multicount_name = tableName;
            }
            else
            {
                multicount_name = tableName;
            }
        }
        else
        {
            if (tableName.EndsWith("y"))
            {
                multicount_name = tableName.Substring(0, tableName.Length - 1) + "ies";
            }
            else
            {
                multicount_name = tableName + "s";
            }
        }
        return multicount_name;
    }


    /// <summary>
    /// Возвращает существительное в единственном
    /// </summary>
    /// <param name="name"></param>
    /// <returns></returns>
    public static string GetSingleCountName(string name)
    {
        //определение наименования в множественном числе и единственном                        
        string tableName = name.Trim();
        string singlecount_name = null;
        if (tableName.EndsWith("s"))
        {
            if (tableName.EndsWith("ies"))
            {

                singlecount_name = tableName.Substring(0, tableName.Length - 3) + "y";
            }
            else
            {
                singlecount_name = tableName.Substring(0, tableName.Length - 1);
            }
        }
        else
        {
            if (tableName.EndsWith("y"))
            {

                singlecount_name = tableName;

            }
            else
            {
                singlecount_name = tableName;
            }
        }
        return singlecount_name;
    }
}
