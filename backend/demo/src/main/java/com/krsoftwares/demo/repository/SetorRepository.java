package com.krsoftwares.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.krsoftwares.demo.models.SetorModel;

public interface SetorRepository extends JpaRepository<SetorModel, Integer> {
    
}