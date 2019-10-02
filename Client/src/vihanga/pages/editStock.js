import React, { Component } from 'react'
import axios from 'axios';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBAnimation, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBBtn
} from "mdbreact";
import SectionContainer from "../../components/sectionContainer";

export default class editStock extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onfinal =this.onfinal.bind(this);
        this.ongenqty=this.ongenqty.bind(this);
        this.state = {
           stock_no :'',
            order_no:'',
            po_number:'',
            currency: '',
            subtotal: '',
            person_name:'',
            business_name:'',
            qty:'',
            cusqty:'',
            payment:'',
            bill_address:'',
            ship_address:'',
            slot:'',
            status:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/stock/edits/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    stock_no:response.data.stock_no,
                    order_no :response.data.order_no,
                    po_number:response.data.po_number,
                    currency: response.data.currency,
                    subtotal: response.data.subtotal,
                    person_name: response.data.person_name,
                    business_name:response.data.business_name,
                    qty:response.data.qty,
                    cusqty:response.data.cusqty,
                    payment:response.data.payment,
                    bill_address:response.data.bill_address,
                    ship_address:response.data.ship_address,
                    slot:response.data.slot,
                    status:response.data.status });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }


    onclick(type){
        this.setState(prevState => {
            return {order_no: type === 'add' ? prevState.order_no + 1: prevState.order_no - 1}
        });
    }

    handleClick = () => {
        this.setState(prevState => {
            return {order_no: prevState.order_no + 1}
        })
    }


    onSubmit(e) {
        e.preventDefault();
        const obj = {
           stock_no:this.state.stock_no,
            order_no :this.state.order_no,
            po_number:this.state.po_number,
            currency: this.state.currency,
            subtotal: this.state.subtotal,
            person_name: this.state.person_name,
            business_name:this.state.business_name,
            qty:this.state.qty,
            cusqty:this.state.cusqty,
            payment:this.state.payment,
            bill_address:this.state.bill_address,
            ship_address:this.state.ship_address,
            slot:this.state.slot,
            status:this.state.status
        };
        axios.post('http://localhost:4000/business/add/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        //  this.props.history.push('/index');*/
    }

   ongenqty(e){
        if(this.state.order_no==null){
           alert("Order No is Null");
       }
        else  if(this.state.po_number==null){
           alert("Po No is Null");
       }

        else if(this.state.person_name==null){
            alert("Person Name is Null");
        }

        else if(this.state.business_name==null){
            alert("business name is Null")
        }

        else if(this.state.bill_address==null){
            alert("bill address is Null")
        }

        else if(this.state.ship_address==null){
            alert("ship address is Null")
        }

        else if(this.state.slot==null){
            alert("slot is Null")
        }

       else  if(this.state.cusqty==null){
            alert("quantity is null please enter quantity");
        }
        else if(this.state.qty<=this.state.cusqty){
            alert("quantity is more than the system stock");
        }

        else{

            this.onfinal();
            this.toggle();
        }
   }






    onfinal(e) {
        // e.preventDefault();
        // this.ongenqty();
        const obj = {
            order_no: this.state.order_no,
            po_number: this.state.po_number,
            currency: this.state.currency,
            subtotal: this.state.subtotal,
            person_name: this.state.person_name,
            business_name: this.state.business_name,
            qty: this.state.qty,
            cusqty: this.state.cusqty,
            payment: this.state.payment,
            bill_address: this.state.bill_address,
            ship_address: this.state.ship_address,
            slot: this.state.slot,
            status: this.state.status
        };
            axios.post('http://localhost:4000/business/add', obj)
                .then(res => console.log(res.data));

            this.setState({
                order_no: '',
                po_number: '',
                currency: '',
                subtotal: '',
                person_name: '',
                business_name: '',
                qty: '',
                cusqty: '',
                payment: '',
                bill_address: '',
                ship_address: '',
                slot: '',
                status: ''
            })
        }

    state = {

        modal2: false,
        backdrop: false,
        mailAddress: "@mdo"
    };



    toggle = nr => () => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });

    };





    render()
    {
        return (

            <MDBContainer className="mt-5">
                <MDBAnimation type="zoomIn" duration="500ms">
                    <MDBContainer>
                        <MDBRow>
                            <MDBCol md="8" className="mx-auto">
                                <SectionContainer header="Create Order">
                                    <form onSubmit={this.onSubmit}>

                                        <div className="form-group">
                                            <label htmlFor="stock_no">stock_no</label>
                                            <input disabled={true} type="text" className="form-control" name="stock_no"
                                                   placeholder="stock_no"   value={this.state.stock_no}
                                                   onChange={this.onChange} />
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="order_no">order_no</label>
                                            <input type="text" className="form-control" name="order_no"
                                                   placeholder="order_no"   value={this.state.order_no} onClick={this.onclick.bind(this, 'add')}
                                                   onChange={this.onChange}/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="po_number">po_number</label>
                                            <input type="text" className="form-control" name="po_number"
                                                   placeholder="po_number"   value={this.state.po_number}
                                                   onChange={this.onChange} required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="currency">currency</label>
                                            <select disabled={false} type="text" name="currency"
                                                    className="form-control"
                                                    placeholder="Enter currency"
                                                    value={this.state.currency}
                                                    onChange={this.onChange}  >
                                                <option value="rupeese">rupeese</option>
                                                <option value="usd">usd</option>
                                                <option value="yen">yen</option>
                                                <option value="dollar">dollar</option>
                                            </select>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="subtotal">subtotal</label>
                                            <input type="text" className="form-control" name="subtotal"
                                                   placeholder="subtotal"   value={this.state.subtotal}
                                                   onChange={this.onChange}/>
                                        </div>


                                        <div className="form-group">
                                            <label htmlFor="person_name">person_name</label>
                                            <input type="text" className="form-control" name="person_name"
                                                   placeholder="person_name"   value={this.state.person_name}
                                                   onChange={this.onChange} required/>
                                        </div>


                                        <div className="form-group ">
                                            <label htmlFor="business_name">business_name</label>
                                            <input type="text" className="form-control" name="business_name"
                                                   placeholder="business_name"   value={this.state.business_name}
                                                   onChange={this.onChange} required/>
                                        </div>

                                        <div className="form-group ">
                                            <label htmlFor="qty">quantity</label>
                                            <input type="text"  disabled={true}  className="form-control" name="qty"
                                                   placeholder="qty"   value={this.state.qty}
                                                   onChange={this.onChange}/>
                                        </div>

                                        <div className="form-group ">
                                            <label htmlFor="cusqty">Customer Requested quantity</label>
                                            <input type="text" className="form-control" name="cusqty"
                                                   placeholder="cusqty"   value={this.state.cusqty}
                                                   onChange={this.onChange} required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="payment">payment</label>
                                            <select disabled={false} type="text" name="payment"
                                                    className="form-control"
                                                    placeholder="Enter payment"
                                                    value={this.state.payment}
                                                    onChange={this.onChange}  >
                                                <option value="cash">cash</option>
                                                <option value="credit">credit</option>
                                                <option value="debit">debit</option>
                                            </select>
                                        </div>


                                        <div className="form-group ">
                                            <label htmlFor="bill_address">bill_address</label>
                                            <textarea type="text" className="form-control" name="bill_address"
                                                      placeholder="bill_address"   value={this.state.bill_address}
                                                      onChange={this.onChange} required/>
                                        </div>

                                        <div className="form-group ">
                                            <label htmlFor="ship_address">ship_address</label>
                                            <textarea type="text" className="form-control"  name="ship_address"
                                                      placeholder="ship_address"   value={this.state.ship_address}
                                                      onChange={this.onChange} required/>
                                        </div>


                                        <div className="form-group ">
                                            <label htmlFor="slot">slot</label>
                                            <input type="text" className="form-control"  name="slot"
                                                   placeholder="slot"   value={this.state.slot}
                                                   onChange={this.onChange} required/>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="status">status</label>
                                            <select disabled={false} type="text"  name="status"
                                                    className="form-control"
                                                    placeholder="Enter status"
                                                    value={this.state.status}
                                                    onChange={this.onChange}  >
                                                <option value="Approved">Approved</option>
                                                <option value="Reject">Reject</option>
                                            </select>
                                        </div>

                                        <input type="submit"
                                               value="Save Changes"
                                               className="btn btn-primary" onClick={this.toggle(2)}/>


                                        <MDBModal isOpen={this.state.modal2} toggle={this.toggle(2)}>
                                            <MDBModalHeader toggle={this.toggle(2)}></MDBModalHeader>
                                            <MDBModalBody>
                                             Do you really need to add this stock now
                                            </MDBModalBody>
                                            <MDBModalFooter>

                                                <MDBBtn color="primary"  onClick={this.ongenqty}>Yes</MDBBtn>
                                            </MDBModalFooter>
                                        </MDBModal>


                                    </form>
                                </SectionContainer>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </MDBAnimation>
            </MDBContainer>
        )
    }

}

