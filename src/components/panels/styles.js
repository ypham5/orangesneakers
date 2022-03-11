import styled from 'styled-components';

const PanelStyles = styled.section`
 flex: 1;
 box-shadow: 0  0 2px 0 rbga(0,0,0,0.3);
 background-color: white;
 border-radius: 3px;
 padding: 3rem;
`;

const PanelHeader = styled.header`
 h2 {
     font-size: 2rem;
     font-weight: 600;
     text-transform: uppercase;
     letter-spacing: 1px;
     color: #A5A5A5;
 }
`;

const PanelBody = styled.div`
    margin: ${props => props.margin || "3rem"};
`;

export {PanelStyles, PanelBody, PanelHeader};