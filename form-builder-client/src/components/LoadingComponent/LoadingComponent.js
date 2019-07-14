import React, { Component } from 'react';
import { Paper } from '../../style/Paper/Paper';
import { Row, Col } from '../../style/Grid';
import { ReactComponent as LoadingImage } from '../../assets/images/loading.svg';
import { ReactComponent as ErrorImage } from '../../assets/images/error.svg';
import { ReactComponent as NotFoundError } from '../../assets/images/404.svg';

export const ApiLoader = props => {
	if (props.error) {
		switch (props.error.response.status) {
		case 404:
			return (
				<Paper>
					<Row>
						<Col style={{alignItems: 'center', maxHeight: 'calc(90vh - 100px)'}}>
							<h1>Oops! Content Not Found...</h1>
							{/* <img src={LoadingImage} style={{maxHeight: '70%'}}/> */}
							<NotFoundError />
							<p style={{margin: 'auto'}}>Wanna Head Back?</p>
						</Col>
					</Row>
				</Paper>
			);
		default:
			return (
				<Paper>
					<Row>
						<Col style={{alignItems: 'center', maxHeight: 'calc(90vh - 100px)'}}>
							<h1>We Have Encountered A Problem...</h1>
							{/* <img src={LoadingImage} style={{maxHeight: '70%'}}/> */}
							<ErrorImage />
							<p style={{margin: 'auto'}}>Might Just Send The Elves To Do That</p>
						</Col>
					</Row>
				</Paper>
			);
		}

		
	}
	return (
		<Paper>
			<Row>
				<Col style={{alignItems: 'center', maxHeight: 'calc(90vh - 100px)'}}>
					<h1>Your Content Is Loading...</h1>
					{/* <img src={LoadingImage} style={{maxHeight: '70%'}}/> */}
					<LoadingImage />
					<p style={{margin: 'auto'}}>Sorry It's Taking So Long...</p>
				</Col>
			</Row>
		</Paper>
	);
};