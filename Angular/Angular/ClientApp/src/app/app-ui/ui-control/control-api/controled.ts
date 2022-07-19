import { Controlable } from "./controlable";

/**
 * Элемент представления реализует операции над элементами представления.
 * Такие как перетаскивание, выбор, управление фокусов, редактирование и т.д..
 */
export class Controled extends Controlable{

    public hidden:      boolean = false;
    public expanded:    boolean = true;
    public editabled:   boolean = false;
    public selected:    boolean = false;
    public focused:     boolean = false;
    public enabled:     boolean = true;
    public dragged:     boolean = false;
    public dropped:     boolean = false;



    constructor(   ){
        super( null );

    }
}
