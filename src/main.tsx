import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TakeExam from "./pages/take-exam/take-exam";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TakeExam />
  </StrictMode>
);
