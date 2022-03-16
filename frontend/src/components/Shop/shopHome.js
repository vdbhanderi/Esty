import React, { Component } from 'react';
import NavBar from '../Navbar/navbar';
import Footer from '../Footer/footer';
import '../Cart/cart.css';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


const UpdateShopSchema = Yup.object().shape({
    price: Yup.string()
        .required("userName is required"),
    quantity: Yup.string()
        .required("quantity is required"),
    itemName: Yup.string()
        .required("Item Name is required")
        .min(4, "Item names must have 4–20 characters")
        .max(20, "Item names must have 4–20 characters"),
    description: Yup.string()
        .required("description is required")
        .min(5, "description must have 4–20 characters")
        .max(20, "description must have 4–20 characters"),

});

export default class ShopHome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopName: '',
            shopId: "",
            shopImage: "",
            itemList: [],
            shopEmail: "",
            shopPhone: "",
            isOwner: false,
            isAdd: true,
            price: '',
            description: '',
            category: '',
            itemName: '',
            quantity: '',
            itemImage: '',
            categoriesList: [],
            newcat: '',
            userId: 6 //localStorage.getItem('userId')
        }
        this.profileUpdate = this.profileUpdate.bind(this);
        this.changeOption = this.changeOption.bind(this);
        this.UpdateItem = this.UpdateItem.bind(this);
        this.AddItem = this.AddItem.bind(this);
    }
    //get the shop data from backend  
    async componentDidMount() {
        let data = {
            shopID: localStorage.getItem('shopId')
        }
        //var userId=this.props.id
        // var userId=1//localStorage.getItem("userId")
        console.log('inside item list mount')
        await axios.post('http://localhost:3000/api/getItemListbyShopID', data)
            .then((response) => {
                //update the state with the response data
                console.log('item List', response.data)
                this.setState({
                    itemList: this.state.itemList.concat(response.data)
                });
            });
        await axios.post('http://localhost:3000/api/getShopDetails', data)
            .then((response) => {
                //update the state with the response data
                console.log('Shop Deatils', response.data[0].shopEmail)
                this.setState({
                    shopEmail: response.data[0].shopEmail,
                    shopName: response.data[0].shopName
                });
                console.log("first", response.data[0].userId)
                if (response.data[0].userId === this.state.userId) {
                    this.setState({
                        isOwner: true
                    })
                    document.getElementById('editShop').style.visibility = "visible";
                }
            });
        await axios.post('http://localhost:3000/api/getCategories', data)
            .then((response) => {
                //update the state with the response data
                console.log('category Deatils', response.data)
                this.setState({
                    categoriesList: response.data
                });
                console.log("first", response.data)
                if (response.data[0].userId === this.state.userId) {
                    this.setState({
                        isOwner: true
                    })
                    document.getElementById('editShop').style.visibility = "visible";
                }
            });
    }
    profileUpdate = async (details) => {
        console.log("Inside check Avaliability submit", details);
        const data = {
            shopName: details.shopName,
        }
        await axios.post('http://localhost:3000/api/getShopName', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        isAvailiable: true,
                    })
                }
                else {
                    this.setState({
                        isAvailiable: false
                    })
                }
                this.setState({
                    shopName: data.shopName,
                    isUpdated: true
                })
                console.log("updated Code : ", this.state.isUpdated);
            });
    }
    UpdateItem = async (details) => {
        console.log("Inside Update Item", details);

        await axios.post('http://localhost:3000/api/updateItem', details)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        isAvailiable: true,
                    })
                }
                else {
                    this.setState({
                        isAvailiable: false
                    })
                }
                this.setState({
                    isUpdated: true
                })
                console.log("updated Code : ", this.state.isUpdated);
            });
    }
    AddItem = async (details) => {
        console.log("Inside Update Item", details);
        details['shopId']=localStorage.getItem('shopId')
        await axios.post('http://localhost:3000/api/insertItem', details)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    this.setState({
                        isAvailiable: true,
                    })
                }
                else {
                    this.setState({
                        isAvailiable: false
                    })
                }
                this.setState({
                    isUpdated: true
                })
                console.log("updated Code : ", this.state.isUpdated);
            });
    }
    changeOption = (e) => {
        console.log(e.target.value)
        console.log(document.getElementById('category').value)
        if (e.target.value === '6') {
            document.getElementById('newCategory').style.display = "";
        }

    }
    changeAddupdateValue = (e) => {
        if (e.target.name === 'Add') {
            this.setState({
                isAdd: true
            })
            return
        }
        this.setState({
             isAdd: false
        })

    }
    render() {
        let itemrows = this.state.itemList.map(item => {
            return (
                <tr>

                    <td className="border-0 align-middle"><strong>{item.itemName}</strong></td>
                    <td className="border-0 align-middle"><strong>{item.price}</strong></td>
                    <td className="border-0 align-middle"><strong>{item.totalSale}</strong></td>
                    {(this.state.isOwner && !item.itemName) ?
                        <td className="border-0 align-middle"><button className="btn btn-primary" id="" name='edit' data-bs-toggle="modal" data-bs-target="#editModal" type="submit" onClick={this.changeAddupdateValue}>Edit Item</button>
                        </td>
                        : null
                    }

                </tr>

            )
        })
        let categories = this.state.categoriesList.length > 0
            && this.state.categoriesList.map((item, i) => {
                return (
                    <option key={item.categoryId} value={item.categoryId}>{item.categoryName}</option>
                )
            }, this);
        return (
            <div className="">
                <NavBar />

                <div className="cart">

                    <section className="py-5">
                        <div className="container px-4 px-lg-5 ">
                            <div className="row justify-content-between mb-5">
                                <div className="col-lg-5 ">
                                    <div className='row'>
                                        <div className="card p-5">
                                            <div className='row'>
                                                <div className="text-start col-4">
                                                    <img className="img-account-profile rounded-circle mb-2 " src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" height={'120px'} width={'120px'} />
                                                </div>
                                                <div className="col-lg-7 justify-content-between" >
                                                    <p className="h2 fw-bold" style={{ float: 'left' }}>{this.state.shopName}</p><br /><br />
                                                    <button className="btn btn-primary" id="editShop" name='editShop' style={{ visibility: 'hidden', float: 'left' }} type="submit">Edit Shop</button>

                                                    {/* <button className="btn btn-primary" type="button">Edit Shop</button> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 ">
                                    <div className='row'>
                                        <div className="card p-2">
                                            <div className='card-body text-start'>

                                                <p className="h4 fw-bold">Contact</p>
                                                <p className=" "> Owner Name : {this.state.shopName}</p>
                                                <p className=""> Email : {this.state.shopEmail}</p>
                                                <p className=""> Phone : {this.state.Phone}</p>

                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                                    <p className="h2 fw-bold  p-3">Items list</p>
                                    <div className='text-end p-1'>

                                        <button className="btn btn-dark" id="" name='Add' data-bs-toggle="modal" onClick={this.changeAddupdateValue} data-bs-target="#editModal" type="submit">Add Item</button>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2  text-uppercase">Item Name</div>
                                                    </th>

                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Price</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Sales</div>
                                                    </th>
                                                    {(this.state.isOwner) ?
                                                        <th scope="col" className="border-0 bg-light">
                                                            <div className="py-2 text-uppercase">Actions</div>
                                                        </th> : null}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {itemrows}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>
                </div>
                <div className="modal fade " id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog ">
                        <div className="modal-content ">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Item</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <Formik
                                initialValues={{
                                    price: '',
                                    description: '',
                                    itemName: '',
                                    quantity: '',
                                    category: '',
                                    itemImage: '',
                                    newCat: '',
                                    color: ''
                                }
                                }

                                validationSchema={UpdateShopSchema}
                                onSubmit={(values, actions) => {
                                    this.state.isAdd?this.UpdateItem(values):this.UpdateItem(values)
                                    console.log({ values, actions });
                                    // alert(JSON.stringify(values, null, 2));
                                }}
                            >
                                {({ touched, errors }) => (
                                    <Form>
                                        <div className="modal-body">
                                            <div className="row">

                                                <div className=" mb-4 mb-xl-0">
                                                    <div className="card-body rounded mx-auto d-block">
                                                        <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                                        <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>

                                                        <input type='file' className="" onClick={this.profileUpdate} />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="itemName">Item Name</label>
                                                    <Field className={`form-control ${touched.itemName && errors.itemName ? "is-invalid" : ""}`} name="itemName" id="itemName" type="text" placeholder="Enter your username" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="itemName"
                                                        className="invalid-feedback"
                                                    />
                                                </div>



                                                <div className="mb-3 form-group">
                                                    <label className="small mb-1" htmlFor="description">Description</label>
                                                    <Field className={`form-control ${touched.description && errors.description ? "is-invalid" : ""}`} id="description" name="description" type="text" placeholder="Enter description" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="description"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="mb-3 form-group">
                                                    <label className="small mb-1" htmlFor="category">Description</label>
                                                    <Field as='select' className={`form-control ${touched.category && errors.category ? "is-invalid" : ""}`} id="description" name="category" placeholder="Enter description" >

                                                        {categories}
                                                    </Field>
                                                    <ErrorMessage
                                                        component="div"
                                                        name="category"
                                                        className="invalid-feedback"
                                                    />
                                                </div>

                                                {/* <div className="mb-3 form-group">
                                                    <label className="small mb-1" >Category</label>
                                                    <Field as='select' name="color" id='category' className='form-control' >
                                                        {categories}

                                                    </Field>
                                                </div> */}
                                                <div className="mb-3 form-group" id='newCategory' style={{ display: 'none' }}>
                                                    <label className="small mb-1" htmlFor="newCat">New Category Name</label>
                                                    <Field className={`form-control ${touched.newCat && errors.newCat ? "is-invalid" : ""}`} id="newCat" name="newCat" type="text" placeholder="Enter new category" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="newCat"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="quantity">Qunatity</label>
                                                    <Field className={`form-control ${touched.quantity && errors.quantity ? "is-invalid" : ""}`} id="quantity" name="quantity" type="number" placeholder="Quantity" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="quantity"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="small mb-1" htmlFor="price">Price</label>
                                                    <Field className={`form-control ${touched.price && errors.price ? "is-invalid" : ""}`} id="price" name="price" type="number" placeholder="price" />
                                                    <ErrorMessage
                                                        component="div"
                                                        name="price"
                                                        className="invalid-feedback"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-primary">Update</button>
                                        </div>

                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        )
    }
}
