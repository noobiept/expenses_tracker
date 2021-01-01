import styled from "styled-components";

export const Device = {
    mobile: `only screen and (max-width: 600px)`,
};

export const ErrorMessage = styled.div`
    color: darkred;
    font-weight: bold;
`;

export const NavList = styled.ul`
    display: flex;
    list-style-type: none;
    margin: 20px;
    padding: 0;

    li {
        margin: 2px 10px;
    }
`;
