import styled from 'styled-components';

export const Table = styled.table`
	width: 100%;
	border: 1px solid lightgrey;
	border-radius: 4px;
	margin: 25px 0;
`;

export const THead = styled.thead`
	font-weight: bold;

	tr {
		background-color: white !important;
	}
`;
export const TFoot = styled.tfoot`
	font-weight: bold;

	tr {
		background-color: white !important;
	}
`;

export const Tr = styled.tr`
	background-color: white;
	height: 60px;

	&:nth-of-type(odd) {
		background-color: #eaf1fd;
	}

	&:hover {
		background-color: #9dc1ff;
		cursor: pointer;
	}

`;

export const Td = styled.td`
	padding: 10px;
	text-transform: capitalize;

`;