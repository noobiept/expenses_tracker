import styled from "styled-components";

export const Table = styled.table``;

export const THead = styled.thead`
    background-color: rgba(0, 0, 255, 0.3);
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

export const TableHeader = styled.th`
    padding: 0 5px;
`;

export const Controls = styled.div`
    margin: 10px;
`;
