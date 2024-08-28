import React from "react";
import { Card } from "react-bootstrap";

const KPICard = ({ title, value, icon, subtitle, style }) => (
  <Card
    className="shadow-sm border-0"
    style={{
      background: style.background,
      color: style.color,
      borderRadius: "10px",
      transition: "transform 0.3s ease-in-out",
      cursor: "pointer",
    }}
    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <Card.Body className="text-center">
      <h6>{title}</h6>
      <h3>
        {icon} {value}
      </h3>
      {subtitle && (
        <p style={{ marginTop: "10px", fontSize: "14px" }}>{subtitle}</p>
      )}
    </Card.Body>
  </Card>
);

export default KPICard;
