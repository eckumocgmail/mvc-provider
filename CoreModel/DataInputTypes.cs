using System.Collections.Generic;

public class DataInputTypes
{
    public static Dictionary<string, string> DATATYPERS = new Dictionary<string, string>() {
        {"int",         "Целое число"},
        {"float",       "Вещественное число"},
        {"date",        "Дата"},
        {"datetime",    "Дата время"},
        {"varchar",     "Текстовый"},
        {"varbinary",   "Бинарный"}
    };


    public static Dictionary<string, string> INPUTTYPES = new Dictionary<string, string>() {
        {"number",      "Числа"},
        {"text",        "Текст"},
        {"password",    "Пароль"},
        {"email",       "Электронная почта"},
        {"url",         "URL"},
        {"file",        "Файл"},
        {"color",       "Цвет"},
        {"image",       "Изображение"},
        {"icon",        "Иконка"},
    };



    
}