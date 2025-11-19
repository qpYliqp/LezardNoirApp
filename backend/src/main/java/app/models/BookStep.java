package app.models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "book_step")
public class BookStep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(name = "end_date")
    public LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "status_id")
    public Status status;

    @ManyToOne
    @JoinColumn(name = "step_id")
    public ProductionStep productionStep;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;
}
