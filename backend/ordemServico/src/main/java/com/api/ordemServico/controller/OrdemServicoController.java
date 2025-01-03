package com.api.ordemServico.controller;

import com.api.ordemServico.model.OrdemServico;
import com.api.ordemServico.repository.OrdemServicoRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ordensServico")
@CrossOrigin(origins = "http://localhost:3000")
public class OrdemServicoController {

    @Autowired
    private OrdemServicoRepository ordemServicoRepository;

    @GetMapping
    public ResponseEntity<List<OrdemServico>> listarTodos() {
        List<OrdemServico> ordensServico = ordemServicoRepository.findAll();
        return ResponseEntity.ok(ordensServico);
    }

    @Transactional
    @PostMapping
    public ResponseEntity<OrdemServico> criarOrdemServico(@RequestBody OrdemServico ordemServico) {
        OrdemServico novaOrdemServico = ordemServicoRepository.save(ordemServico);
        return ResponseEntity.ok(novaOrdemServico);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrdemServico> buscarPorId(@PathVariable Long id) {
        return ordemServicoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrdemServico> atualizarOrdemServico(@PathVariable Long id, @RequestBody OrdemServico ordemServicoAtualizada) {
        return ordemServicoRepository.findById(id)
            .map(ordemServico -> {
                atualizarDadosOrdemServico(ordemServico, ordemServicoAtualizada);
                OrdemServico atualizado = ordemServicoRepository.save(ordemServico);
                return ResponseEntity.ok(atualizado);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarOrdemServico(@PathVariable Long id) {
        if (ordemServicoRepository.existsById(id)) {
            ordemServicoRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private void atualizarDadosOrdemServico(OrdemServico ordemServico, OrdemServico ordemServicoAtualizada) {
        ordemServico.setServico(ordemServicoAtualizada.getServico());
        ordemServico.setDataInicio(ordemServicoAtualizada.getDataInicio());
        ordemServico.setDataTermino(ordemServicoAtualizada.getDataTermino());
        ordemServico.setDescricao(ordemServicoAtualizada.getDescricao());
        ordemServico.setStatus(ordemServicoAtualizada.isStatus());
        ordemServico.setQuantidadeFuncionario(ordemServicoAtualizada.getQuantidadeFuncionario());
        ordemServico.setFuncionarios(ordemServicoAtualizada.getFuncionarios());
        ordemServico.setVeiculos(ordemServicoAtualizada.getVeiculos());
    }
}
