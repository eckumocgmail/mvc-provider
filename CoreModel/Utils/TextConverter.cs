


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

 
public class TextConverter
{

       
    /*
    internal static Dictionary<string,object> toObjectsDictionary(string[] cells, TableMetaData metadata)
    {
        Dictionary<string, object> dic = new Dictionary<string, object>();
        ColumnMetaData[] metadatas = metadata.columns.Values.ToArray();
        for (int i=0; i<cells.Length; i++)
        {
            cells[i] = cells[i].Replace("\r", "").Replace("\t", "").Replace("\n", "");
            string textValue = cells[i];
            string requiredType = metadatas[i].type;
            //Writing.ToConsole(requiredType+" <= "+textValue);
            switch (metadatas[i].type)
            {
                case "date":
                    if (cells[i] == "NULL")
                    {
                        dic[metadatas[i].name] = null;
                    }
                    else
                    {
                        dic[metadatas[i].name] = parseDate(cells[i]);
                    }
                    break;
                case "datetime":
                    if (cells[i] == "NULL")
                    {
                        dic[metadatas[i].name] = null;
                    }
                    else
                    {
                        dic[metadatas[i].name] = parseDateTime(cells[i]);
                    }
                    break;
                case "smallint":
                case "int":
                    if (cells[i] == "NULL")
                    {
                        dic[metadatas[i].name] = null;
                    }
                    else
                    {
                        dic[metadatas[i].name] = int.Parse(cells[i]);
                    }                        
                    break;
                case "nvarchar":
                case "text":
                case "varchar":
                    dic[metadatas[i].name] = cells[i];
                    break;
                case "float":
                    if(cells[i] == "NULL")
                    {
                        dic[metadatas[i].name] = null;
                    }
                    else
                    {
                        dic[metadatas[i].name] = float.Parse(cells[i].Replace(".", ","));
                    }                        
                    break;
                default: throw new Exception("Тип данных "+ metadatas[i].type+" пока не поддерживается");
            }
        }
        return dic;
    }
    */

    public static DateTime? parseDate(string text)
    {
        if(string.IsNullOrEmpty(text))
        {
            return null;
        }
        string dateSeparator =
            (text.IndexOf("/") != -1) ? "/" :
            (text.IndexOf("-") != -1) ? "-" : ".";
        int year = 0;
        int month = 0;
        int day = 0;
        bool yearReaded = false;
        bool monthReaded = false;
        bool dayReaded = false;
        string[] spices = text.Split(dateSeparator);
        foreach (string word in spices)
        {
            if(word.Length  == 4)
            {
                year = int.Parse(word);
                yearReaded = true;
            }
            else
            {
                if (yearReaded)
                {
                    if(monthReaded == false)
                    {
                        month = int.Parse(word);
                        monthReaded = true;
                    }
                    else
                    {
                        day = int.Parse(word);
                        dayReaded = true;
                    }
                }
                else
                {
                    if (dayReaded == true)
                    {
                        month = int.Parse(word);
                        monthReaded = true;
                    }
                    else
                    {
                        day = int.Parse(word);
                        dayReaded = true;
                    }
                }
            }
        }
        return new DateTime(year,month,day);
    }


    public static DateTime? parseDateTime(string text)
    {
        string[] parts = text.Split(" ");
        DateTime? date = parseDate(parts[0]);
            
        if(date == null)
        {
            return null;
        }
        DateTime dateValue = (DateTime)date;

        string timeString = parts[1];
        string timeSeparator =
            (text.IndexOf(":") != -1) ? ":" : ".";
        string[] s = timeString.Split(timeSeparator);
        if(s.Length < 3)
        {
            return null;
        }
        int h = int.Parse(s[0]);
        int m = int.Parse(s[1]);
        int sec = int.Parse(s[2]);
        return new DateTime(dateValue.Year, dateValue.Month, dateValue.Day, h,m, sec);
    }
} 