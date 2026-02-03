import DangerState from "@/components/DangerState";
import { useSimulation } from "@/context/SimulationContext";
import React from "react";

export default function DangerScreen() {
  const { resetToSafe } = useSimulation();
  return <DangerState onReset={resetToSafe} />;
}
