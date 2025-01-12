package com.krsoftwares.demo.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.krsoftwares.demo.dto.ProdutoDTO;
import com.krsoftwares.demo.dto.SetorRequisicaoDTO;
import com.krsoftwares.demo.models.RequisicaoModel;

@Repository
public interface RequisicaoRepository extends JpaRepository<RequisicaoModel, Long> {

    @Query("SELECT new com.krsoftwares.demo.dto.SetorRequisicaoDTO(s.setorId, s.setorNome, r.status, COUNT(r.requisicaoId)) " +
    "FROM RequisicaoModel r " +
    "JOIN r.usuario u " +
    "JOIN u.setor s " + 
    "WHERE r.status = true " +
    "GROUP BY s.setorNome, s.setorId, r.status")
    List<SetorRequisicaoDTO> findRequisicaoPorSetor();


    @Query("SELECT r.requisicaoId " +
       "FROM RequisicaoModel r " +
       "JOIN r.usuario u " +
       "JOIN u.setor s " +
       "WHERE s.setorId = :setorId " +
       "AND r.status = true")
    List<Long> findRequisicaoPendente(@Param("setorId") Integer setorId);

    @Query("SELECT DISTINCT new com.krsoftwares.demo.dto.ProdutoDTO( " +
       "p.SKU, p.nome, p.unMedida, " +
       "ir.quantidade, " +
       "ie.quantidade, " +
       "re.observacao) " +
       "FROM RequisicaoModel r " +
       "JOIN r.itens ir " +
       "JOIN ir.produto p " +
       "LEFT JOIN r.entregaId re " +
       "LEFT JOIN re.itens ie " +
       "WHERE r.requisicaoId = :requisicaoId " +
       "AND r.status = false")
    List<ProdutoDTO> buscarProdutosPorRequisicao(@Param("requisicaoId") Long requisicaoId);
    
    Optional<RequisicaoModel> findById (Long id);
}
