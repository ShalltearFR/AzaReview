"use client";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  plugins,
  Decimation,
  Interaction,
  SubTitle,
} from "chart.js";
import { plugin } from "mongoose";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Decimation
);

interface RadarChartProps {
  data: any;
  width: number;
  height: number;
  maxPercent: number;
}

const RadarChart: React.FC<RadarChartProps> = ({
  data,
  width,
  height,
  maxPercent,
}) => {
  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: maxPercent, // Pour que toutes les valeurs soient sur une échelle de 0 à 100
        ticks: {
          display: false, // Afficher les valeurs sur chaque cercle du graphique
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // Couleur des lignes de la grille
        },
        angleLines: {
          color: "rgba(255, 255, 255, 0.1)", // Couleur des lignes radiales
        },
        pointLabels: {
          font: {
            size: 16, // Taille de la police pour les labels autour du graphique
          },
          color: "#666", // Couleur des labels
        },
      },
    },
  };

  return <Radar data={data} options={options} width={width} height={height} />;
};

export default RadarChart;
