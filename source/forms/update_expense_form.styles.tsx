import styled from "styled-components";
import { Device } from "../styles";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 100px 300px;
    grid-row-gap: 5px;

    @media ${Device.mobile} {
        grid-template-columns: auto;
        grid-template-rows: auto auto;
        grid-row-gap: 0;

        label:not(:first-child) {
            margin-top: 10px;
        }
    }
`;

export const Buttons = styled.div`
    display: flex;
    margin: 15px 0;
`;
