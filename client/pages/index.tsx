import { useState } from "react";
import styled from "styled-components";
import SafeInput from "../components/SafeInput";

const SubmitButton = styled.button`
  color: red;
`;

const Container = styled.div`
  display: grid;
  width: 100vw;
  padding: 2em;
  place-items: center;
`;

export default function Home() {
  const [passwordName, setPasswordName] = useState("");
  const [passwordDoc, setPasswordDoc] = useState(null);
  const [secret, setSecret] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const result = await fetch(
      `http://localhost:3333/api/passwords/${passwordName}`
    );
    const passwordDoc = await result.json();
    setPasswordDoc(passwordDoc);
  }

  return (
    <Container>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          value={passwordName}
          onChange={(event) => setPasswordName(event.target.value)}
        />
        <SubmitButton type="submit">send</SubmitButton>
        <p></p>
      </form>
      {passwordDoc && (
        <>
          {passwordDoc.name} {passwordDoc.value}
        </>
      )}
      <SafeInput
        value={secret}
        onChange={(event) => setSecret(event.target.value)}
        type="password"
      />
    </Container>
  );
}
