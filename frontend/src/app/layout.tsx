"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { href: "/inicio", src: "/home.png", selectedSrc: "/home2.png", alt: "Inicio", label: "Inicio" },
    { href: "/funcionario", src: "/PeopleTeam.png", selectedSrc: "/PeopleTeam2.png", alt: "Funcionário", label: "Funcionário" },
    { href: "/veiculos", src: "/Car.png", selectedSrc: "/Car2.png", alt: "Veiculos", label: "Veiculos" },
    { href: "/clientes", src: "/customerlistsfill.png", selectedSrc: "/customerlistsfill2.png", alt: "Clientes", label: "Clientes" },
    { href: "/ordemservico", src: "/Notepad.png", selectedSrc: "/Notepad2.png", alt: "Ordem de Serviço", label: "Ordem de Serviço" },
  ];

  return (
    <html lang="en" style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "Arial, Helvetica, sans-serif",
          backgroundColor: "#E9E9E9", // Fixed the missing quotes around the color value
        }}
      >
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <aside
            style={{
              width: "175px",
              backgroundColor: "#08005B",
              color: "#fff",
              borderTopRightRadius: "35px",
              borderBottomRightRadius: "35px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              overflowY: "auto",
              height: "100%",
            }}
          >
            <nav>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {menuItems.map(({ href, src, selectedSrc, alt, label }, index, array) => {
                  const isSelected = href === pathname;
                  const isFirst = index === 0;
                  const isLast = index === array.length - 1;

                  return (
                    <li
                      key={href}
                      style={{
                        padding: "30px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isSelected ? "white" : "transparent",
                        borderBottom: index !== array.length - 1 ? "1px solid #fff" : "none",
                        borderTopRightRadius: isFirst ? "35px" : "0",
                        borderBottomRightRadius: isLast ? "35px" : "0",
                        cursor: "pointer", 
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => router.push(href)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isSelected ? "white" : "#3a3693"; // Efeito de hover
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isSelected ? "white" : "transparent";
                      }}
                    >
                      <a
                        style={{
                          color: isSelected ? "#08005B" : "white",
                          textDecoration: "none",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={isSelected ? selectedSrc : src}
                          alt={alt}
                          style={{ width: "72px", height: "72px" }}
                        />
                        <span
                          style={{
                            marginTop: "20px",
                            fontSize: "22px",
                            textAlign: "center",
                          }}
                        >
                          {label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
          <main style={{ flex: 5, padding: "0px", overflow: "auto" }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
