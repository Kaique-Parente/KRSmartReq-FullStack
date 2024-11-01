package com.krsoftwares.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.krsoftwares.demo.models.ProdutoModel;

public interface ProdutoRepository extends JpaRepository<ProdutoModel, String> {
    
    Optional<ProdutoModel> findBySKU(String sku);

    boolean existsBySKU(String SKU);
}