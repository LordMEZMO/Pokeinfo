import styled from "styled-components";

export const AbilitiesListStyles = styled.div`
  display: block;
  padding: 1rem;
  border-collapse: collapse;

  .capitalize::first-letter {
    text-transform: uppercase;
  }

  .centerXY {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  .centerY {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 100%;
  }

  .table {
    width: 100%;
    border-spacing: 0;
  }

  .td,
  th {
    border: 1px solid #dbdbdb;
    border-width: 0 0 1px;
    padding: 0.5em 0.75em;
    vertical-align: top;
  }

  .thead {
    vertical-align: middle;
    overflow-y: hidden;
		overflow-x: auto;
    
    .th,
    .td {
      border-color: #dbdbdb;
      border-width: 0 0 2px;
      border-style: solid;
      color: #363636;
      padding: 1.1rem 0;
      font-weight: bold;
    }
  }

  .tbody .td {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  .filters {
    border: 1px solid #dbdbdb;
    border-width: 0 0 1px;
    padding: 0.2rem 0;
  }
`;
