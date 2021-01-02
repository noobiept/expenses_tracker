import styled, { css } from "styled-components";
import { Device } from "../styles";

export const Table = styled.table`
    @media ${Device.mobile} {
        width: 100%;
    }
`;

export const THead = styled.thead`
    background-color: rgb(156, 172, 233);

    @media ${Device.mobile} {
        position: sticky;
        top: 0;

        th {
            display: block;
        }
    }
`;

export const TBody = styled.tbody`
    & > tr:nth-child(even) {
        background-color: rgba(0, 0, 255, 0.07);
    }

    & > tr:hover {
        background-color: rgba(0, 0, 255, 0.2);
    }
`;

export const TableRow = styled.tr``;

export const TableHeader = styled.th<{ selected?: boolean }>`
    padding: 0 5px;
    cursor: pointer;

    ${({ selected }) =>
        selected &&
        css`
            color: white;
            background-color: rgb(64, 91, 199);
        `}
`;

export const Controls = styled.div`
    margin: 10px;
`;
