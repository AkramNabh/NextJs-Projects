"use client";
import Image from "next/image";
import { ChangeEvent } from "react";

export default function Home() {
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: { [key: string]: string } = {};
    Array.from(e.currentTarget.elements).forEach((field) => {
      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement
      ) {
        formData[field.name] = field.value;
      }
    });
    fetch("/api/hello", {
      method: "post",
      body: JSON.stringify(formData),
    });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="flex  flex-col justify-center items-center border-xl border-black"
      >
        <input
          type="text"
          name="name"
          placeholder="name"
          className="border-xl border-black"
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          className="border-xl border-black"
        />
        <textarea
          name="message"
          placeholder="message"
          className="border-xl border-black"
        />
        <button type="submit">submit</button>
      </form>
    </main>
  );
}
