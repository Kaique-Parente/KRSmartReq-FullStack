package com.krsoftwares.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Setor")
public class SetorModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer setorId;

    @Column(nullable = false, unique = true)
    private String setorNome;
        
}
