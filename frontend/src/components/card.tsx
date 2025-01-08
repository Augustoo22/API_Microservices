"use client";
import React from "react";

const Card = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row", // Muda a direção para linha (lado a lado)
        alignItems: "center", // Alinha a imagem e o texto verticalmente
        justifyContent: "center",
        backgroundColor: "#08005B",
        color: "white",
        borderRadius: "35px",
        padding: "20px", // Diminuí o padding para evitar sobrecarga no tamanho
        boxSizing: "border-box", // Garante que o padding não altere o tamanho do elemento
        boxShadow: "0px 8px 0px #1500FF",
        cursor: "pointer",
        transition: "transform 0.2s",
        width: "390px",
        height: "190px",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={icon}
        alt="icon"
        style={{
          width: "82px",
          height: "82px",
          marginRight: "50px", 
        }}
      />
      <span style={{ fontSize: "32px", fontWeight: "500" }}>{text}</span>
    </div>
  );
};

export default Card;
