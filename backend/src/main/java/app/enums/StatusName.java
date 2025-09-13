package app.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter @AllArgsConstructor
public enum StatusName {
    TODO("A faire"),
    ONGOING("En cours"),
    DONE("Terminé"),
    OVERDUE("En retard");

    private final String value;
}