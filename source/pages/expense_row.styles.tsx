import styled from "styled-components";
import { Device } from "../styles";

export const TableRow = styled.tr`
    cursor: pointer;
    transition: background-color 0.2s;

    @media ${Device.mobile} {
        td {
            display: block;
        }
    }
`;

export const TableData = styled.td`
    padding: 2px 10px;
`;
