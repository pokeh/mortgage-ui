import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mortgage: '', error: ''}
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        // TODO: there must be a better way to do this
        var query = 'http://localhost:8080/calculate?' + 
        'propertyPrice=' + event.target.elements.propertyPrice.value + 
        '&downPayment=' + event.target.elements.downPayment.value + 
        '&annualInterestPercentage=' + event.target.elements.annualInterestPercentage.value + 
        '&amortizationPeriod=' + event.target.elements.amortizationPeriod.value + 
        '&paymentSchedule=' + event.target.elements.paymentSchedule.value

        axios.get(query)
        .then((res) => {
            this.setState({
                mortgage: 'Payment per payment schedule is : ' + res.data.mortgage, 
                error: ''
            })
        })
        .catch((err) => {
            if (err.response) {
                // <Alert variant='danger'>
                //     {err.response.data}
                // </Alert>
                console.log(err.response.data);
                this.setState({
                    mortgage: '', 
                    error: err.response.data
                })
            }
        })
      }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="propertyPrice">
                        <Form.Label>Property price (CAD)</Form.Label>
                        <Form.Control type="number" step="0.01" defaultValue="300000" />
                    </Form.Group>

                    <Form.Group controlId="downPayment">
                        <Form.Label>Down payment (CAD)</Form.Label>
                        <Form.Control type="number" step="0.01" defaultValue="50000" />
                    </Form.Group>

                    <Form.Group controlId="annualInterestPercentage">
                        <Form.Label>Annual interest rate (%)</Form.Label>
                        <Form.Control type="number" defaultValue="3.00" />
                    </Form.Group>

                    <Form.Group controlId="amortizationPeriod">
                        <Form.Label>Amortization period (years)</Form.Label>
                        <Form.Control as="select">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="paymentSchedule">
                        <Form.Label>Payment schedule</Form.Label>
                        <Form.Control as="select">
                            <option value="acceleratedBiWeekly">Accelerated bi-weekly</option>
                            <option value="biWeekly">Bi-weekly</option>
                            <option value="monthly">Monthly</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>

                <div>
                    <strong name="mortgage">{this.state.mortgage}</strong>
                </div>

                <div>
                    <strong color="red" name="error">{this.state.error}</strong>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <MyForm />,
    document.getElementById('root')
  );