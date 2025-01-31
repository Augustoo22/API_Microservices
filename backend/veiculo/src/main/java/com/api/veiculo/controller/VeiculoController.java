package com.api.veiculo.controller;

import com.api.veiculo.model.Veiculo;
import com.api.veiculo.repository.VeiculoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/veiculos")
@CrossOrigin(origins = "http://localhost:3000")
public class VeiculoController {

    @Autowired
    private VeiculoRepository veiculoRepository;

    @GetMapping
    public ResponseEntity<List<Veiculo>> listarTodos() {
        List<Veiculo> veiculos = veiculoRepository.findAll();
        return ResponseEntity.ok(veiculos);
    }

    @Transactional
    @PostMapping
    public ResponseEntity<Veiculo> criarVeiculo(@RequestBody Veiculo veiculo) {
        Veiculo novoVeiculo = veiculoRepository.save(veiculo);
        return ResponseEntity.ok(novoVeiculo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarPorId(@PathVariable Long id) {
        return veiculoRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veiculo> atualizarVeiculo(@PathVariable Long id, @RequestBody Veiculo veiculoAtualizado) {
        return veiculoRepository.findById(id)
            .map(veiculoExistente -> {
                atualizarDadosVeiculo(veiculoExistente, veiculoAtualizado);
                Veiculo atualizado = veiculoRepository.save(veiculoExistente);
                return ResponseEntity.ok(atualizado);
            }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVeiculo(@PathVariable Long id) {
        if (veiculoRepository.existsById(id)) {
            veiculoRepository.deleteById(id);
            return ResponseEntity.noContent().build();            
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private void atualizarDadosVeiculo(Veiculo veiculoExistente, Veiculo veiculoAtualizado) {
        veiculoExistente.setNome(veiculoAtualizado.getNome());
        veiculoExistente.setPlaca(veiculoAtualizado.getPlaca());
        veiculoExistente.setTipo(veiculoAtualizado.getTipo());
        veiculoExistente.setStatus(veiculoAtualizado.getStatus());
        veiculoExistente.setAnoFabricacao(veiculoAtualizado.getAnoFabricacao());
        veiculoExistente.setDataEntrada(veiculoAtualizado.getDataEntrada());
        veiculoExistente.setPrevisao(veiculoAtualizado.getPrevisao());
    }
}
