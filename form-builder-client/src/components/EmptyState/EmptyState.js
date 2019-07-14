import React from 'react';
import { ReactComponent as EmptyState } from '../../assets/images/empty.svg';
import { Paper } from '../../style/Paper/Paper';
import { Row, Col } from '../../style/Grid';

export default props => {
	return (
		<Paper>
			<Row>
				<Col style={{alignItems: 'center', maxHeight: 'calc(90vh - 100px)'}}>
					<h1>We Couldn't Pull Any Data =(</h1>
					{/* <img src={LoadingImage} style={{maxHeight: '70%'}}/> */}
					<EmptyState />
					{props.children}
				</Col>
			</Row>
		</Paper>
	);
};