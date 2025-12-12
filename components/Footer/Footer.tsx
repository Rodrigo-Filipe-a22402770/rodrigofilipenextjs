"use client";
import { useState, useEffect } from "react";
import Relogio from "../Relogio/Relogio";

export default function Footer() {
  return (
    <footer className="bg-green-600 p-4 text-white text-center">
      <p>Footer Content</p>
      <Relogio />
    </footer>
  );
}