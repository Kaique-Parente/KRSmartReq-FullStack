package com.krsoftwares.demo.controllers;

import java.util.Optional;
import org.hibernate.PropertyValueException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.models.ProdutoModel;
import com.krsoftwares.demo.repository.ProdutoRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/produto")
@CrossOrigin(origins = "*")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/listar")
    public Iterable<ProdutoModel> listarProdutos() {
        return produtoRepository.findAll();
    }

    @PostMapping("/cadastrar")
    public String Cadastrar(@RequestBody @Valid ProdutoModel produto) {

        try {
            if (produtoRepository.existsBySKU(produto.getSKU())) {
                return "SKU já cadastrado.";
            } else {
                produtoRepository.save(produto);
                return "Produto cadastrado!";
            }

        } catch (PropertyValueException e) {
            return "Preencha todos os campos.";
        }
    }

    @PutMapping("/{SKU}")
    public ResponseEntity<ProdutoModel> editar(@PathVariable String SKU, 
    @RequestBody ProdutoModel produtoAtt){ //PathVariable captura o SKU pela URL
      Optional<ProdutoModel> produto = produtoRepository.findBySKU(SKU);  

      if(produto.isPresent()){
        ProdutoModel produtoExistente = produto.get();
        
        produtoExistente.setNome(produtoAtt.getNome());
        produtoExistente.setCategoria(produtoAtt.getCategoria());
        produtoExistente.setStatus(produtoAtt.isStatus());
        produtoExistente.setUnMedida(produtoAtt.getUnMedida());

        return ResponseEntity.ok(produtoRepository.save(produtoExistente));
      } else {
        return ResponseEntity.notFound().build();
      }
    }
}