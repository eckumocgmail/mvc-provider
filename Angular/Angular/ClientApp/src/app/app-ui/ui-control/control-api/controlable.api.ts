/**
 * Интерфейс описывает параметры управления представлением
 */
export interface ControlableApi {      
    isSearchable():     boolean;
    isSortable():       boolean;
    isSelectable():     boolean;
    isFocusable():      boolean;
    isEditable():       boolean;
    isDraggable():      boolean;
    isDroppable():      boolean;
}