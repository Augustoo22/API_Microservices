package com.api.ordemServico.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tb_ordemServico")
public class OrdemServico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String servico;
    private String dataInicio;
    private String dataTermino;
    private String descricao;
    private boolean status;
    private int quantidadeFuncionario;

    @ElementCollection
    @CollectionTable(name = "tb_funcionario", joinColumns = @JoinColumn(name = "id"))
    @Column(name = "nome")
    private List<String> funcionarios;

    @ElementCollection
    @CollectionTable(name = "tb_veiculo", joinColumns = @JoinColumn(name = "cliente_id"))
    @Column(name = "nome")
    private List<String> veiculos;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServico() {
        return servico;
    }

    public void setServico(String servico) {
        this.servico = servico;
    }

    public String getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(String dataInicio) {
        this.dataInicio = dataInicio;
    }

    public String getDataTermino() {
        return dataTermino;
    }

    public void setDataTermino(String dataTermino) {
        this.dataTermino = dataTermino;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public int getQuantidadeFuncionario() {
        return quantidadeFuncionario;
    }

    public void setQuantidadeFuncionario(int quantidadeFuncionario) {
        this.quantidadeFuncionario = quantidadeFuncionario;
    }

    public List<String> getFuncionarios() {
        return funcionarios;
    }

    public void setFuncionarios(List<String> funcionarios) {
        this.funcionarios = funcionarios;
    }

    public List<String> getVeiculos() {
        return veiculos;
    }

    public void setVeiculos(List<String> veiculos) {
        this.veiculos = veiculos;
    }
}
