import styled from "styled-components";

type Props = {
  value: string;
};

function calcColor(length: number): string {
  return `hsl(${length * 12 < 120 ? length * 12 : 120},100%,50%)`;
}

const SafeInput = styled.input<Props>`
  background: ${(props) => calcColor(props.value.length)};
`;
export default SafeInput;
