import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        const form = new FormData();
        form.set('PropertyPrice', 10000);
        form.set('DownPayment', event.target.DownPayment.value);
        form.set('AnnualInterestRate', event.target.AnnualInterestRate.value);
        form.set('AmortizationPeriod', event.target.AmortizationPeriod.value);
        form.set('PaymentSchedule', event.target.PaymentSchedule.value);

        alert(form["PropertyPrice"]);

        const response = await axios.post(
            "http://localhost:8000/calculate",
            form,
            { headers: { 'Content-Type': 'x-www-form-urlencoded' }})

        console.log(await response.data);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Property price:
                        <input type="text" name="PropertyPrice" defaultValue="10000"/>
                    </label>
                    <br/><br/>
                    <label>
                        Down payment:
                        <input type="text" name="DownPayment" defaultValue="1000"/>
                    </label>
                    <br/><br/>
                    <label>
                        Annual interest rate:
                        <input type="text" name="AnnualInterestRate" defaultValue="3"/>
                    </label>
                    <br/><br/>
                    <label>
                        Amortization period:
                        <select name="AmortizationPeriod">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="30">30</option>
                        </select>
                    </label>
                    <br/><br/>
                    <label>
                        Payment schedule:
                        <select name="PaymentSchedule">
                            <option value="1">Accelerated bi-weekly</option>
                            <option value="2">Bi-weekly</option>
                            <option value="3">Monthly</option>
                        </select>
                    </label>
                    <br/><br/>
                    <input type="submit" value="Submit" />
                </form>

                <div>
                    <strong name="result"></strong>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Form />,
    document.getElementById('root')
  );