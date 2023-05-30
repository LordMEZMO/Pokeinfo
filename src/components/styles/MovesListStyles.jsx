import styled from "styled-components"

export const MovesListStyles = styled.div`
	display: block;
  padding: 1rem;
  border-collapse: collapse;

  .capitalized::first-letter{
    text-transform: capitalize;
  }

  .table {
		width: 100%;
    border-spacing: 0;
    }

    .td{
      display: inline-flex;
      height: 100%;
      align-items: center;
    }

    .td,th{
      border: 1px solid #dbdbdb;
      border-width: 0 0 1px;
      padding: .5em .75em;
      vertical-align: top;
    }

    .thead{
      vertical-align: middle;
      overflow-x: auto;
      overflow-y: hidden;
          .th, .td {
            border-color: #dbdbdb;
            border-width: 0 0 2px;
            border-style: solid;
            color: #363636;  
            padding: 1.1rem 0;
            font-weight: bold;
          }
    }

    .tr{
      display: table-row;
      vertical-align: inherit;
      border-color: inherit;
    }

    .filters{
      border: 1px solid #dbdbdb;
      border-width: 0 0 1px;
      padding: 0.2rem 0;
    }`
