import styled from "styled-components";

export const PokemonTableStyles = styled.div`
	display: block;
	padding: 1rem;
	border-collapse: collapse;

	.table {
		width: 100%;
		border-spacing: 0;
	}

	.td,th{
	border: 1px solid #dbdbdb;
	border-width: 0 0 1px;
	vertical-align: top;
	}

	.thead{
		vertical-align: middle;
		overflow-y: hidden;
		overflow-x: auto;

		.th, .td {
			border-color: #dbdbdb;
			border-width: 0 0 2px;
			border-style: solid;
			color: #363636;
			padding: 0.5rem 0; 
			font-weight: bold;
		}
	}

	.tr{
	display: table-row;
	vertical-align: inherit;
	border-color: inherit;
	}

	.tbody .td {

	}

	.filters{
	border: 1px solid #dbdbdb;
	border-width: 0 0 1px;
	padding: 0.5rem 0;
	}
	
	.cellId{
		text-align: center;
		height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
	}

	.cellId span {
		display: inline-block;
	}

  .stat{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: 100%
  }

  .name {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap; 
    height: 100%;
  }
  .capitalized::first-letter{
    text-transform: capitalize;
  }
`;