import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Buttons({ showTimes }) {
  return (
    <SessionsTime>
      {showTimes.map((time, index) => {
        return (
          <Link key={ index } to={ `/assentos/${time.id }`}>
            <button>{ time.name }</button>
          </Link>
        );
      })
      }
    </SessionsTime>
  );
}

const SessionsTime = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  button {
    padding: 10px 20px;
    background-color: #CD0077;
    border-radius: 4px;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 18px;
    margin-right: 8px;
  }
`;