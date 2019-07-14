import styled from 'styled-components';

const getHoverStyle = props => {
	return `
		color: ${props.disabled ? 'grey' : '#ffffff'};
		background-color: ${props.disabled ? '#ffffff' : '#4287f5'};
	`;
};
export const Button = styled.button`
	display: block;
	max-width: 250px;
	min-height: 40px;
	padding: 5px 10px;
	margin: auto;

	box-shadow: 2px 2px 5px -1px rgba(0,0,0,0.75);
	border: 2px solid ${props => props.disabled ? 'grey' : '#4287f5'};
	border-radius: 4px;
	background-color: #ffffff;
	
	color: ${props => props.disabled ? 'grey' : '#4287f5'};
	text-decoration: none;
	text-transform: capitalize;
	text-align: center;

	&:hover {
		/* color: #ffffff;
		background-color: #4287f5; */
		${getHoverStyle}
	}

	&:focus {
		outline: none;
	}
`;

export const DangerButton = styled(Button)`
	border: 2px solid red;
	color: red;

	&:hover {
		color: white;
		background-color: red;
	}
`;
