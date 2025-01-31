package com.api.funcionario.controller;

import com.api.funcionario.model.Funcionario;
import com.api.funcionario.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
@CrossOrigin(origins = "http://localhost:3000")
public class FuncionarioController {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @GetMapping
    public ResponseEntity<List<Funcionario>> listarTodos() {
        List<Funcionario> funcionarios = funcionarioRepository.findAll();
        return ResponseEntity.ok(funcionarios);
    }

    @Transactional
    @PostMapping
    public ResponseEntity<Funcionario> criarFuncionario(@RequestBody Funcionario funcionario) {
        Funcionario novoFuncionario = funcionarioRepository.save(funcionario);
        return ResponseEntity.ok(novoFuncionario);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> buscarPorId(@PathVariable Long id) {
        return funcionarioRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> atualizarFuncionario(@PathVariable Long id, @RequestBody Funcionario funcionarioAtualizado) {
        return funcionarioRepository.findById(id)
            .map(funcionarioExistente -> {
                atualizarDadosFuncionario(funcionarioExistente, funcionarioAtualizado);
                Funcionario atualizado = funcionarioRepository.save(funcionarioExistente);
                return ResponseEntity.ok(atualizado);
            }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarFuncionario(@PathVariable Long id) {
        if (funcionarioRepository.existsById(id)) {
            funcionarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private void atualizarDadosFuncionario(Funcionario funcionarioExistente, Funcionario funcionarioAtualizado) {
        funcionarioExistente.setNome(funcionarioAtualizado.getNome());
        funcionarioExistente.setCpf(funcionarioAtualizado.getCpf());
        funcionarioExistente.setCargo(funcionarioAtualizado.getCargo());
        funcionarioExistente.setDataNascimento(funcionarioAtualizado.getDataNascimento());
        funcionarioExistente.setEspecialidade(funcionarioAtualizado.getEspecialidade());
        funcionarioExistente.setAnosExperiencia(funcionarioAtualizado.getAnosExperiencia());
    }
}
