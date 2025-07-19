"use client";

type ErrorComponentProps = {
  error: Error;
};

export default function ErrorComponent({ error }: ErrorComponentProps) {
  return <p>Could not fetch the list of notes. {error.message}</p>;
}