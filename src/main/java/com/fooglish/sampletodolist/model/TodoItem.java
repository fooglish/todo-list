package com.fooglish.sampletodolist.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class TodoItem {

    private @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id;
    @NotBlank(message = "Title can't be blank.")
    private String title;
    @NotNull(message = "Set the task priority.")
    @Min(1)
    @Max(4)
    private Integer priority;
    private boolean done;
}
