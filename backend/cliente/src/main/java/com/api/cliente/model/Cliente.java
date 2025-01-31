package com.api.cliente.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tb_cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cpf;
    private String dataNascimento;
    private int quantidadeVeiculos;

    @ElementCollection
    @CollectionTable(name = "tb_veiculos", joinColumns = @JoinColumn(name = "cliente_id"))
    @Column(name = "veiculo")
    private List<String> veiculos;  // Lista de veículos

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public int getQuantidadeVeiculos() {
        return quantidadeVeiculos;
    }

    public void setQuantidadeVeiculos(int quantidadeVeiculos) {
        this.quantidadeVeiculos = quantidadeVeiculos;
    }

    public List<String> getVeiculos() {
        return veiculos;
    }

    public void setVeiculos(List<String> veiculos) {
        this.veiculos = veiculos;
    }
}
