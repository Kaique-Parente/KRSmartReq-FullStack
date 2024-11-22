package com.krsoftwares.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.krsoftwares.demo.models.ItemRequisicaoModel;
import com.krsoftwares.demo.models.ProdutoModel;
import com.krsoftwares.demo.models.RequisicaoModel;
import com.krsoftwares.demo.models.UserModel;
import com.krsoftwares.demo.repository.ProdutoRepository;
import com.krsoftwares.demo.repository.RequisicaoRepository;
import com.krsoftwares.demo.repository.UserRepository;

@RestController
@RequestMapping("/requisicao")
@CrossOrigin(origins = "*")
public class RequisicaoController {

    @Autowired
    private RequisicaoRepository requisicaoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @PostMapping("/requisitar")
    public RequisicaoModel gerar(@RequestBody RequisicaoModel objeto) {

        //Futuramente, trocar o método para um método com Spring Security...
        UserModel user = userRepository.findByEmail(objeto.getNome().getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        objeto.setNome(user);
        

        if (objeto.getItens() != null) {
            for (ItemRequisicaoModel item : objeto.getItens()) {
                // Encontra o produto pelo SKU
                ProdutoModel produto = produtoRepository.findBySKU(item.getProduto().getSKU())
                        .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

                item.setProduto(produto);//associa o item ao produto encontrado...
                item.setRequisicaoId(objeto);//associa a requisição ao item...
            }
        }

        objeto.setItemRequisicao(objeto.getItens());

        RequisicaoModel requisicao = requisicaoRepository.save(objeto);

        return requisicao;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable("id") Long id){

        RequisicaoModel requisicao = requisicaoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Requisição não encontrada"));
        
        requisicaoRepository.delete(requisicao);
        return ResponseEntity.ok("Requisição do ID " + id + " excluída com sucesso");
    }

    @GetMapping("/listar")
    public ResponseEntity listar() {
        Iterable<RequisicaoModel> requisicoes = requisicaoRepository.findAll();
        return ResponseEntity.ok(requisicoes);
    }
}